import uuid

from sqlalchemy_utils import UUIDType
from sqlalchemy.orm import relationship

from config import DATE_FORMAT
from helpers import db, ApiSheetHelper
from models.base_entity import BaseEntity


class Person(BaseEntity):
    __tablename__ = 'person'

    sheet_helper = ApiSheetHelper(__tablename__)
    start = 'date_in'
    end = 'date_out'

    name = db.Column(db.String)
    surname = db.Column(db.String)
    parental = db.Column(db.String)
    email = db.Column(db.String)
    telephone = db.Column(db.String)
    date_birth = db.Column(db.Date)
    status = db.Column(db.String)
    faculty = db.Column(db.String)
    specialty = db.Column(db.String)
    date_in = db.Column(db.Date)
    date_out = db.Column(db.Date)
    about = db.Column(db.String)
    avatar = db.Column(db.String)
    parent_id = db.Column(UUIDType(binary=False), db.ForeignKey('person.id'), nullable=True, default=uuid.uuid4())

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
        dataframe['date_birth'] = dataframe['date_birth'].apply(cls.transform_date)
        dataframe['date_in'] = dataframe['date_in'].apply(cls.transform_date)
        dataframe['date_out'] = dataframe['date_out'].apply(cls.transform_date)
        return dataframe

    @classmethod
    def filter_data(cls, dataframe):
        # TODO person required params
        return super(Person, cls).filter_data(dataframe)

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
