from werkzeug.exceptions import default_exceptions

from exceptions.api import render_http_error, render_unexpected_error


def init_exception_handlers(app):
    for exception in default_exceptions:
        app.errorhandler(exception)(render_http_error)
    app.errorhandler(Exception)(render_unexpected_error)
