# add src folder to PATH
import os
import sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.extend([root, os.path.join(root, 'src')])

from helpers.db_helper import import_data
from helpers import db
from exceptions import init_exception_handlers
from config import DATETIME_FORMAT, LOG_FOLDER, LOG_FORMAT, DATABASE_URI, API_FILE, FLASK_ENV, DEV_PORT, \
    KEY, CRT, IMAGE_TEMP_FOLDER, GOOGLE_CREDS_FILE_EXIST
from connexion import FlaskApp, App
import logging
from logging.handlers import RotatingFileHandler
import datetime

# Flask instance
connexion_app: FlaskApp = App(__name__, specification_dir="./")
connexion_app.add_api(API_FILE)
app = connexion_app.app


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
    app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)

    # initialize additions
    init_exception_handlers(app)
    init_logs()

    os.makedirs(IMAGE_TEMP_FOLDER, exist_ok=True)

    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # recreate database and import data from Google Sheets
    with app.app_context():
        db.drop_all()
        db.create_all()

        if GOOGLE_CREDS_FILE_EXIST:
            import_data()

init_app()

if __name__ == '__main__':
    try:
        if FLASK_ENV == 'docker':
            app.run(ssl_context=(CRT, KEY), host="0.0.0.0", port=443)
        elif FLASK_ENV == 'production':
            app.run(ssl_context='adhoc', host="0.0.0.0", port=3002)
        else:
            app.run(ssl_context='adhoc', use_reloader=False, port=DEV_PORT)
    except Exception as error:
        logging.critical(error)
        sys.exit(error)
