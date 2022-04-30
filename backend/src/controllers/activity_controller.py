from flask import request

from services import activity_service


def get_activity(id):
    activity = activity_service.get_by_id(id)
    return activity.to_full_dict()


def create_connection():
    body = request.json
    created_activity = activity_service.create(body)
    return created_activity.to_dict()


def update_connection(id):
    body = request.json
    updated_activity = activity_service.update(id, body)
    return updated_activity.to_dict()


def delete_connection(id):
    activity_service.delete(id)
    return 200
