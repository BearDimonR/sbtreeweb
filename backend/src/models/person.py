import uuid

from sqlalchemy.orm import relationship

from helpers import db, get_sheet_helper, BinaryUUID
from models.base_entity import BaseEntity


class Person(BaseEntity):
    __tablename__ = 'person'

    sheet_helper = get_sheet_helper(__tablename__)
    start = 'date_in'
    end = 'date_out'

    name = db.Column(db.String(20))
    surname = db.Column(db.String(20))
    parental = db.Column(db.String(20))
    email = db.Column(db.String(50))
    telephone = db.Column(db.String(20))
    date_birth = db.Column(db.Date)
    status = db.Column(db.String(50))
    faculty = db.Column(db.String(10))
    specialty = db.Column(db.String(50))
    date_in = db.Column(db.Date)
    date_out = db.Column(db.Date)
    about = db.Column(db.String(200))
    avatar = db.Column(db.String(100))
    parent_id = db.Column(BinaryUUID, db.ForeignKey(
        'person.id', ondelete='SET NULL'), nullable=True)

    activities = relationship('Activity', back_populates='person')
    auths = relationship('Auth', back_populates='person', uselist=True)
    types = {
        **BaseEntity.types,
        'date_in': 'date',
        'date_out': 'date'
    }

    @classmethod
    def get_key(cls, key):
        if key == 'dateIn':
            return 'date_in'
        elif key == 'dateOut':
            return 'date_out'
        elif key == 'dateBirth':
            return 'date_birth'
        elif key == 'parentId':
            return 'parent_id'
        else:
            return key

    @classmethod
    def parse_request(cls, body):
        parsed_obj = super(Person, cls).parse_request(body)
        parsed_obj['date_in'] = cls.transform_date(parsed_obj['date_in'])
        parsed_obj['date_birth'] = cls.transform_date(parsed_obj['date_birth'])
        parsed_obj['date_out'] = cls.transform_date(parsed_obj['date_out'])
        return parsed_obj

    @classmethod
    def transform_data(cls, dataframe):
        dataframe = super(Person, cls).transform_data(dataframe)
        dataframe['parent_id'] = dataframe['parent_id'].apply(
            lambda _id: uuid.UUID(_id) if _id is not None else None)
        dataframe['date_birth'] = dataframe['date_birth'].apply(cls.transform_date)
        dataframe['date_in'] = dataframe['date_in'].apply(cls.transform_date)
        dataframe['date_out'] = dataframe['date_out'].apply(cls.transform_date)
        return dataframe

    @classmethod
    def filter_data(cls, dataframe):
        # TODO person required params
        return super(Person, cls).filter_data(dataframe)

    def to_tree_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'surname': self.surname,
            'parental': self.parental,
            'status': self.status,
            'avatar': self.avatar,
        }

    def to_short_dict(self):
        return {
            **super(Person, self).to_dict(),
            'name': self.name,
            'surname': self.surname,
            'parental': self.parental,
            'status': self.status,
            'faculty': self.faculty,
            'specialty': self.specialty,
            'dateIn': self.transform_field('date', self.date_in),
            'dateOut': self.transform_field('date', self.date_out),
            'about': self.about,
            'avatar': self.avatar,
            'parentId': self.transform_field('id', self.parent_id),
        }

    def to_short_full_dict(self):
        return {
            **self.to_short_dict(),
            'events': list(map(lambda x: x.to_dict_with_event(), self.activities))
        }

    def to_dict(self):
        return {
            **self.to_short_dict(),
            'email': self.email,
            'telephone': self.telephone,
            'dateBirth': self.transform_field('date', self.date_birth),
        }

    def to_full_dict(self):
        return {
            **self.to_dict(),
            'events': list(map(lambda x: x.to_dict_with_event(), self.activities))
        }
