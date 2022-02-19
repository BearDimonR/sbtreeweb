import logging

from models.activity import Activity
from models.auth import Auth
from models.event import Event
from models.person import Person


def init_db():
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
