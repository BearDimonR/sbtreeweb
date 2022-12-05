import json
import logging

from flask import Response
from werkzeug.exceptions import HTTPException, InternalServerError


def render_unexpected_error(exception: Exception):
    logging.critical(f"{exception.args[0]}", exc_info=True)
    error = InternalServerError(original_exception=exception)
    return Response(
        response=json.dumps(
            {
                "title": error.name,
                "details": exception.args[0],
                "status": error.code,
                "type": "about:blank",
            }
        ),
        status=error.code,
        mimetype="application/json",
    )


def render_http_error(exception: HTTPException):
    logging.error(f"{exception.name} : {exception.description}")
    return Response(
        response=json.dumps(
            {
                "title": exception.name,
                "details": exception.description,
                "status": exception.code,
                "type": "about:blank",
            }
        ),
        status=exception.code,
        mimetype="application/json",
    )
