import logging
import os
import sys
from importlib import resources

from connexion import FlaskApp, App

from config import DATETIME_FORMAT, LOG_FILE_NAME, LOG_FORMAT, DATA_PACKAGE, RESOURCE_NAME, API_FILE
from exceptions import init_exception_handlers
from helpers import db
from helpers.db_helper import init_db


def init_app():
    connexion_app: FlaskApp = App(__name__, specification_dir="./")
    connexion_app.add_api(API_FILE)

    flask_app = connexion_app.app
    flask_app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)

    init_exception_handlers(flask_app)

    # TODO logging level change to reduce size .log?
    logging.basicConfig(filename=LOG_FILE_NAME,
                        level=logging.INFO,
                        datefmt=DATETIME_FORMAT,
                        format=LOG_FORMAT)

    with resources.path(DATA_PACKAGE, RESOURCE_NAME) as sqlite_filepath:
        flask_app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{sqlite_filepath}"
        flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(flask_app)
    with flask_app.app_context():
        db.drop_all()
        db.create_all()
        init_db()
    return flask_app


if __name__ == '__main__':
    try:
        app = init_app()
        app.run(ssl_context='adhoc', use_reloader=False, port=3002)
    except Exception as error:
        logging.critical(error)
        sys.exit(error)
