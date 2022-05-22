import logging

from models.activity import Activity
from models.auth import Auth
from models.event import Event
from models.person import Person

from sqlalchemy.engine import Engine
from sqlalchemy import event

# SQLite feature for working with foreign keys
@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()


def import_data():
    try:
        logging.info('Person data is importing...')

        Person.import_from_sheet()

        logging.info('Person data imported successfully!')
        logging.info('Activity data is importing...')

        Event.import_from_sheet()

        logging.info('Activity data imported successfully!')
        logging.info('Activity data is importing...')

        Activity.import_from_sheet()

        logging.info('Activity data imported successfully!')
        logging.info('Auth data is importing...')

        Auth.import_from_sheet()

        logging.info('Auth data imported successfully!')
    except Exception as error:
        logging.error(f'Importing error: {error}')
        raise error
