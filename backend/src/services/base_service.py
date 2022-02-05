from models.base_entity import BaseEntity


class BaseService:
    def __init__(self, model: BaseEntity):
        self.model = model

    def get_all(self):
        return self.model.query.all()

    def get_by_uuid(self, uuid):
        return self.model.query.get(uuid)

    def create(self, entity):
        return self.model.create(**entity)

    def update(self, row_id, entity):
        return self.model.update(row_id, **entity)

    def delete(self, row_id):
        return self.model.delete(row_id)
