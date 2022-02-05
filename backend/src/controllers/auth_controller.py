import json

import requests
from flask import request, redirect
from jose import JWTError
from werkzeug.exceptions import Unauthorized, Forbidden

from config import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PERSONAL, EDITOR, ADMIN
from helpers import auth_helper, app_client
from helpers.auth_helper import generate_token, decode_token, check_access
from services import auth_service


def get_current_user(user):
    return user.to_dict()


# TODO logout
def logout(user):
    return 200


def login():
    google_provider_cfg = auth_helper.get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg['authorization_endpoint']

    request_uri = app_client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + '/callback',
        scope=['openid', 'email', 'profile'],
    )

    return redirect(request_uri)


def callback():
    code = request.args.get('code')

    google_provider_cfg = auth_helper.get_google_provider_cfg()
    token_endpoint = google_provider_cfg['token_endpoint']

    token_url, headers, body = app_client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    app_client.parse_request_body_response(json.dumps(token_response.json()))

    userinfo_endpoint = google_provider_cfg['userinfo_endpoint']
    uri, headers, body = app_client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    if userinfo_response.json().get('email_verified'):
        users_email = userinfo_response.json()['email']
    else:
        return 'User email not available or not verified by Google.', 400

    user = auth_service.get_by_email(users_email)

    if user is None:
        raise Unauthorized('You don`t have access, please ask administrator to get it.')

    token = generate_token(user.uuid)

    return {'token': token, 'user': user.to_dict()}


def auth_personal(token):
    return validate_token(token, PERSONAL)


def auth_editor(token):
    return validate_token(token, EDITOR)


def auth_admin(token):
    return validate_token(token, ADMIN)


def validate_token(token, required_access):
    try:
        decode = decode_token(token)
        auth = auth_service.get_by_uuid(decode['sub'])
        if auth is None:
            raise Unauthorized('You don`t have access, please ask administrator to get it.')
        if check_access(auth.access, required_access):
            decode['sub'] = auth
            return decode
        raise Forbidden('Access level is not high enough.')
    except JWTError as e:
        raise Unauthorized from e
    except Unauthorized as e:
        raise e
    except Forbidden as e:
        raise e
