from flask import request
from helpers.image_helper import upload_file, save_to_temp, drop_from_temp


def upload_image():
    file = request.files["image"]
    path = save_to_temp(file)
    submission = upload_file(path)
    drop_from_temp(path)
    return submission
