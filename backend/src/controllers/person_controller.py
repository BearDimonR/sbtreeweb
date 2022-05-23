from flask import request

from services import person_service


def get_all(sort=None, params=None, search=None, page=1):
    if params:
        return person_service.get_all_param(params)
    formatted_search = None
    # TODO rewrite it
    if search:
        formatted_search = search.split(' ')
        formatted_search = [('surname', formatted_search[0])]
        if len(formatted_search) > 1:
            formatted_search.append(('name', formatted_search[1]))

    (total, page) = person_service.get_all(sort=sort, search=formatted_search, page=page)
    return {'pages': total, 'items': list(map(lambda x: x.to_short_dict(), page))}


def get_all_filtered():
    body = request.json
    formatted_search = None
    # TODO rewrite it
    search = body['search']
    if search:
        formatted_search = search.split(' ')
        formatted_search = [('surname', formatted_search[0])]
        if len(formatted_search) > 1:
            formatted_search.append(('name', formatted_search[1]))
    (total, page) = person_service.get_all(sort=body['sort'], search=formatted_search, page=body['page'],
                                           filters=body['filters'])
    return {'pages': total, 'items': list(map(lambda x: x.to_short_dict(), page))}


# TODO implement tree
def get_tree():
    return person_service.get_tree()


def get_person_short(id):
    person = person_service.get_by_id(id)
    return person.to_short_dict()


def get_person(id):
    person = person_service.get_by_id(id)
    return person.to_full_dict()


def create_person():
    body = request.json
    created_person = person_service.create(body)
    return created_person.to_full_dict()


def update_person(id):
    body = request.json
    updated_person = person_service.update(id, body)
    return updated_person.to_full_dict()


def delete_person(id):
    person_service.delete(id)
    return 200
