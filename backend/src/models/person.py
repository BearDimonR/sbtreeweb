import uuid
from datetime import datetime

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
    speciality = db.Column(db.String)
    date_in = db.Column(db.Date)
    date_out = db.Column(db.Date)
    about = db.Column(db.String)
    avatar = db.Column(db.String)
    parent_id = db.Column(UUIDType, db.ForeignKey('person.id'), nullable=True, default=uuid.uuid4())

    activities = relationship('Activity', back_populates='person')
    auths = relationship('Auth', back_populates='person', uselist=True)

    @classmethod
    def transform_data(cls, dataframe):
        dataframe = super(Person, cls).transform_data(dataframe)
        dataframe['date_birth'] = dataframe['date_birth'].apply(
            lambda date: datetime.strptime(date, DATE_FORMAT) if date is not None else None)
        dataframe['date_in'] = dataframe['date_in'].apply(
            lambda date: datetime.strptime(date, DATE_FORMAT) if date is not None else None)
        dataframe['date_out'] = dataframe['date_out'].apply(
            lambda date: datetime.strptime(date, DATE_FORMAT) if date is not None else None)
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
            'speciality': self.speciality,
            'dateIn': self.date_in.strftime(DATE_FORMAT),
            'dateOut': self.date_in.strftime(DATE_FORMAT),
            'about': self.about,
            'avatar': self.avatar,
            'parentId': str(self.parent_id),
        }

    def to_dict(self):
        return {
            **self.to_short_dict(),
            'email': self.email,
            'telephone': self.telephone,
            'dateBirth': self.date_birth.strftime(DATE_FORMAT),
        }

    def to_full_dict(self):
        return {
            **self.to_dict(),
            'events': list(map(lambda x: x.to_dict_with_event(), self.activities))
        }
