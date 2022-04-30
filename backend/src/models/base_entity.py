import uuid
from datetime import datetime

from sqlalchemy_utils import UUIDType

from config import DATETIME_FORMAT, DATE_FORMAT
from helpers import db
from models.importable_entity import SheetEntity


def commit(obj):
    db.session.add(obj)
    db.session.commit()
    db.session.refresh(obj)
    return obj


class BaseEntity(db.Model, SheetEntity):
    __abstract__ = True

    id = db.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4())
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime,
                           default=db.func.current_timestamp(),
                           onupdate=db.func.current_timestamp())
    types = {
        'id': 'id',
        'created_at': 'datetime',
        'updated_at': 'datetime',
    }

    def to_dict(self):
        return {
            'id': self.transform_field('id', self.id),
            'createdAt': self.transform_field('datetime', self.created_at),
            'updatedAt': self.transform_field('datetime', self.updated_at)
        }

    @classmethod
    def transform_field(cls, key, val):
        try:
            field_type = cls.types[key]
        except KeyError:
            field_type = key

        if field_type == 'id':
            if isinstance(val, uuid.UUID):
                return str(val)
            return str(uuid.UUID(val))
        if field_type == 'datetime':
            return val.strftime(DATETIME_FORMAT)
        if field_type == 'date':
            return val.strftime(DATE_FORMAT)
        return val

    @classmethod
    def transform_date(cls, date):
        return datetime.strptime(date, DATE_FORMAT) if date is not None else None

    @classmethod
    def parse_request(cls, body):
        return {cls.get_key(key): val for key, val in body.items()}

    @classmethod
    def get_key(cls, key):
        return key

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
