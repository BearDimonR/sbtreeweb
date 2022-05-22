import os
from dotenv import load_dotenv


# loading variables to environment from .env file
load_dotenv()

# loading Google API variables from environment
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")

# loading JWT variables from environment
JWT_ISSUER = os.environ.get('JWT_ISSUER')
JWT_SECRET = os.environ.get('JWT_SECRET')
JWT_LIFETIME_SECONDS = int(os.environ.get('JWT_LIFETIME_SECONDS'))
JWT_ALGORITHM = os.environ.get('JWT_ALGORITHM')

# --- Application constants ---

# Google API constants
GOOGLE_DISCOVERY_URL = 'https://accounts.google.com/.well-known/openid-configuration'
GOOGLE_SHEET_SCOPE = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']

# Google creds location
GOOGLE_CREDS_FILE_PATH = '../google_creds.json'

# Database URI
DATA_FOLDER = '../data'
RESOURCE_NAME = 'data.db'
DATABASE_URI = f"sqlite:///{os.path.join(DATA_FOLDER, RESOURCE_NAME)}"


# openapi file path
API_FILE = 'openapi.yaml'

# access level enum
ADMIN = 3
EDITOR = 2
PERSONAL = 1
ALL = 0

# Google Drive table name
DRIVE_FILE_NAME = 'sbtree_database'

# Date formats
DATETIME_FORMAT = '%d.%m.%Y %H:%M:%S'
DATE_FORMAT = '%d.%m.%Y'
DATE_COMPARISON_FORMAT = "%Y-%m-%d"

# Import size for importing data from Google sheet
MAX_IMPORT_SIZE = 10000

# Logs configs
LOG_FOLDER = '../logs'
LOG_FORMAT = '%(asctime)s [%(levelname)s] {%(name)s %(threadName)s} : %(message)s'
