import os
import imgbbpy
from config import IMAGE_TEMP_FOLDER, IMAGE_API_KEY

client = imgbbpy.SyncClient(IMAGE_API_KEY)

def save_to_temp(file):
    filepath = os.path.join(IMAGE_TEMP_FOLDER, file.filename)
    file.save(filepath)
    return filepath

def drop_from_temp(path):
    os.remove(path)

def upload_file(path):
    response = client.upload(file=path, expiration = None)
    return response