from flask import request

from services import activity_service


def get_all(sort=None, params=None, search=None, page=1):
    if params:
        return activity_service.get_all_param(params)
    (total, page) = activity_service.get_all(sort=sort, search=[('name', search)], page=page)
    return {'total': total, 'page': list(map(lambda x: x.to_dict(), page))}


def get_activity(uuid):
    activity = activity_service.get_by_uuid(uuid)
    users_by_activity = activity_service.get_users_by_activity(uuid)
    return {'activity': activity.to_dict(), 'users': list(map(lambda x: x.to_dict(), users_by_activity))}


def create_activity():
    body = request.json
    created_activity = activity_service.create(body)
    users_by_activity = activity_service.get_users_by_activity(created_activity.uuid)
    return {'activity': created_activity.to_dict(), 'users': list(map(lambda x: x.to_dict(), users_by_activity))}


def update_activity(uuid):
    body = request.json
    updated_activity = activity_service.update(uuid, body)
    users_by_activity = activity_service.get_users_by_activity(updated_activity.uuid)
    return {'activity': updated_activity.to_dict(), 'users': list(map(lambda x: x.to_dict(), users_by_activity))}


def delete_activity(uuid):
    activity_service.delete(uuid)
    return 200
