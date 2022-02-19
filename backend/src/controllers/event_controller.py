from flask import request

from services import event_service


def get_all(sort=None, params=None, search=None, page=1):
    if params:
        return event_service.get_all_param(params)
    (pages, page) = event_service.get_all(sort=sort, search=[('name', search)], page=page)
    return {'pages': pages, 'items': list(map(lambda x: x.to_dict(), page))}


def get_event(id):
    event = event_service.get_by_id(id)
    return event.to_full_dict()


def create_event():
    body = request.json
    created_event = event_service.create(body)
    return created_event.to_full_dict()


def update_event(id):
    body = request.json
    updated_event = event_service.update(id, body)
    return updated_event.to_full_dict()


def delete_event(id):
    event_service.delete(id)
    return 200
