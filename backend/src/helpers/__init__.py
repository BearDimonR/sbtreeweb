from flask_sqlalchemy import SQLAlchemy
from oauthlib.oauth2 import WebApplicationClient

from config import GOOGLE_CLIENT_ID
from helpers.api_sheet_helper import ApiSheetHelper

app_client = WebApplicationClient(GOOGLE_CLIENT_ID)

db = SQLAlchemy()