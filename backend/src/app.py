import os
import sys
from importlib import resources

import connexion
import logging

from connexion import FlaskApp

from config import DATETIME_FORMAT
from exceptions import init_exception_handlers
from helpers import db
from helpers.db_helper import init_db


def init_app():
    connexion_app: FlaskApp = connexion.App(__name__, specification_dir="./")
    connexion_app.add_api("openapi.yaml")

    flask_app = connexion_app.app
    flask_app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)

    init_exception_handlers(flask_app)

    #TODO logging level change to reduce size .log?
    logging.basicConfig(filename='log.log',
                        level=logging.INFO,
                        datefmt=DATETIME_FORMAT,
                        format='%(asctime)s [%(levelname)s] {%(name)s %(threadName)s} : %(message)s')

    with resources.path('data', "data.db") as sqlite_filepath:
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
