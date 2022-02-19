from sqlalchemy import column

from models.base_entity import BaseEntity


class BaseService:
    def __init__(self, model: BaseEntity):
        self.model = model

    def get_all(self, sort=None, params=None, search=None, page=None):
        query = self.model.query
        if params:
            query = query.with_entities(*[column(param) for param in params]).select_from(self.model).distinct()
        if search:
            query = query.filter(*[column(s[0]).startswith(s[1]) for s in search])
        if sort:
            query = query.order_by(*sort)
        if page:
            pagination = query.paginate(page=page, max_per_page=12, error_out=False)
            return pagination.total, pagination.items
        return query.all()

    def get_all_param(self, params):
        return list(
            map(lambda x: {param: x[i] for i, param in enumerate(params)}, self.get_all(sort=params, params=params)))

    def get_by_id(self, _id):
        return self.model.query.get(_id)

    def create(self, entity):
        return self.model.create(**entity)

    def update(self, row_id, entity):
        return self.model.update(row_id, **entity)

    def delete(self, row_id):
        return self.model.delete(row_id)
