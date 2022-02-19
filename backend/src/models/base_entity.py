import uuid
from datetime import datetime
from sqlalchemy_utils import UUIDType

from config import DATETIME_FORMAT
from helpers import db
from models.importable_entity import SheetEntity


def commit(obj):
    db.session.add(obj)
    db.session.commit()
    db.session.refresh(obj)
    return obj


class BaseEntity(db.Model, SheetEntity):
    __abstract__ = True

    id = db.Column(UUIDType, primary_key=True, default=uuid.uuid4())
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime,
                           default=db.func.current_timestamp(),
                           onupdate=db.func.current_timestamp())

    def to_dict(self):
        return {
            'id': str(self.id),
            'created_at': self.created_at.strftime(DATETIME_FORMAT),
            'updated_at': self.updated_at.strftime(DATETIME_FORMAT)
        }

    @classmethod
    def create(cls, **kwargs):
        obj = cls(**kwargs)
        return commit(obj)

    @classmethod
    def update(cls, row_id, **kwargs):
        db.session.query(cls).filter(cls.id == row_id).update(kwargs)
        db.session.flush()
        db.session.commit()
        return db.session.query(cls).get(row_id)

    @classmethod
    def delete(cls, row_id):
        obj = db.session.query(cls).filter(cls.id == row_id).delete()
        db.session.commit()
        return obj

    @classmethod
    def add_relation(cls, row_id, rel_obj):
        pass

    @classmethod
    def remove_relation(cls, row_id, rel_obj):
        pass

    @classmethod
    def clear_relations(cls, row_id):
        pass

    @classmethod
    def transform_data(cls, dataframe):
        dataframe['updated_at'] = dataframe['updated_at'].apply(
            lambda date: datetime.strptime(date, DATETIME_FORMAT) if date is not None else None)
        dataframe['created_at'] = dataframe['created_at'].apply(
            lambda date: datetime.strptime(date, DATETIME_FORMAT) if date is not None else None)
        return dataframe

    @classmethod
    def filter_data(cls, dataframe):
        return dataframe[dataframe['id'].notna()]
