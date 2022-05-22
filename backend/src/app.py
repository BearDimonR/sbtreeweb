# add src folder to PATH
import os
import sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.extend([root, os.path.join(root, 'src')])

from helpers.db_helper import import_data
from helpers import db
from exceptions import init_exception_handlers
from config import DATETIME_FORMAT, LOG_FOLDER, LOG_FORMAT, DATABASE_URI, DATA_FOLDER, API_FILE
from connexion import FlaskApp, App
import logging
from logging.handlers import RotatingFileHandler
import datetime


def init_logs():
    os.makedirs(LOG_FOLDER, exist_ok=True)
    logging_handler = RotatingFileHandler(
        filename=os.path.join(LOG_FOLDER, f'{datetime.datetime.today().strftime("%Y-%m-%d")}.log'),
        mode='a',
        maxBytes=1024 * 1024 * 10,
        backupCount=2,
        encoding=None,
        delay=0
    )
    logging.basicConfig(level=logging.INFO,
                        datefmt=DATETIME_FORMAT,
                        format=LOG_FORMAT,
                        handlers=[logging_handler])


def init_app():
    connexion_app: FlaskApp = App(__name__, specification_dir="./")
    connexion_app.add_api(API_FILE)

    flask_app = connexion_app.app
    flask_app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)

    # initialize additions
    init_exception_handlers(flask_app)
    init_logs()

    # create and initialize SQLite database
    os.makedirs(DATA_FOLDER, exist_ok=True)

    flask_app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(flask_app)

    # recreate database and import data from Google Sheets
    with flask_app.app_context():
        db.drop_all()
        db.create_all()
        import_data()

    return flask_app


if __name__ == '__main__':
    try:
        app = init_app()
        app.run(ssl_context='adhoc', use_reloader=False, port=3002)
    except Exception as error:
        logging.critical(error)
        sys.exit(error)
