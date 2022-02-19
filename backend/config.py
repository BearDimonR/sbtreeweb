import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_DISCOVERY_URL = 'https://accounts.google.com/.well-known/openid-configuration'
GOOGLE_SHEET_SCOPE = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")
GOOGLE_CREDS_FILE_PATH = os.environ.get("GOOGLE_CREDS_FILE_PATH")

JWT_ISSUER = os.environ.get('JWT_ISSUER')
JWT_SECRET = os.environ.get('JWT_SECRET')
JWT_LIFETIME_SECONDS = int(os.environ.get('JWT_LIFETIME_SECONDS'))
JWT_ALGORITHM = os.environ.get('JWT_ALGORITHM')

DATA_PACKAGE = 'data'
RESOURCE_NAME = 'data.db'

API_FILE = 'openapi.yaml'

ADMIN = 3
EDITOR = 2
PERSONAL = 1
ALL = 0

DRIVE_FILE_NAME = 'sbtree_database'

DATETIME_FORMAT = '%d.%m.%Y %H:%M:%S'
DATE_FORMAT = '%d.%m.%Y'

MAX_IMPORT_SIZE = 10000

LOG_FOLDER = '../logs'
LOG_FORMAT = '%(asctime)s [%(levelname)s] {%(name)s %(threadName)s} : %(message)s'
