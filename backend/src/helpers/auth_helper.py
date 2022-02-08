import time

import requests
from jose import jwt

from config import GOOGLE_DISCOVERY_URL, JWT_ISSUER, JWT_LIFETIME_SECONDS, JWT_SECRET, JWT_ALGORITHM


def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()


def generate_token(user_id):
    timestamp = _current_timestamp()
    payload = {
        "iss": JWT_ISSUER,
        "iat": int(timestamp),
        "exp": int(timestamp + JWT_LIFETIME_SECONDS),
        "sub": str(user_id),
    }

    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(token):
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])


def _current_timestamp() -> int:
    return int(time.time())


def check_access(access, access_level):
    return access > 0 and access >= access_level
