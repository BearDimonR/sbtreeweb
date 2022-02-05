import logging

from models.activity import Activity
from models.activity_user import ActivityUser
from models.auth import Auth
from models.user import User


def init_db():
    try:
        logging.info('User data is importing...')

        User.import_from_sheet()

        logging.info('User data imported successfully!')
        logging.info('Activity data is importing...')

        Activity.import_from_sheet()

        logging.info('Activity data imported successfully!')
        logging.info('ActivityUser data is importing...')

        ActivityUser.import_from_sheet()

        logging.info('ActivityUser data imported successfully!')
        logging.info('Auth data is importing...')

        Auth.import_from_sheet()

        logging.info('Auth data imported successfully!')
    except Exception as error:
        logging.error(f'Importing error: {error}')
        raise error
