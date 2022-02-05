from flask import request

from services import user_service


def get_all():
    return list(map(lambda x: x.to_short_dict(), user_service.get_all()))


# TODO implement tree
def get_tree():
    return user_service.get_tree()


def get_user_short(uuid):
    user_data = user_service.get_by_uuid(uuid)
    user_activities = user_service.get_activities_by_user(user_data.uuid)
    return {'user': user_data.to_short_dict(), 'activities': list(map(lambda x: x.to_dict(), user_activities))}


def get_user(uuid):
    user_data = user_service.get_by_uuid(uuid)
    user_activities = user_service.get_activities_by_user(user_data.uuid)
    return {'user': user_data.to_dict(), 'activities': list(map(lambda x: x.to_dict(), user_activities))}


def create_user():
    body = request.json
    created_user = user_service.create(body)
    user_activities = user_service.get_activities_by_user(created_user.uuid)
    return {'user': created_user.to_dict(), 'activities': list(map(lambda x: x.to_dict(), user_activities))}


def update_user(uuid):
    body = request.json
    updated_user = user_service.update(uuid, body)
    user_activities = user_service.get_activities_by_user(updated_user.uuid)
    return {'user': updated_user.to_dict(), 'activities': list(map(lambda x: x.to_dict(), user_activities))}


def delete_user(uuid):
    user_service.delete(uuid)
    return 200