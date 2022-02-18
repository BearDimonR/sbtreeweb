from datetime import datetime

from fastapi_utils.guid_type import GUID, GUID_DEFAULT_SQLITE
from sqlalchemy.orm import relationship

from config import DATE_FORMAT
from helpers import db, ApiSheetHelper
from models.base_entity import BaseEntity


class User(BaseEntity):
    __tablename__ = 'user'

    sheet_helper = ApiSheetHelper(__tablename__)

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
    parent_uuid = db.Column(GUID, db.ForeignKey('user.uuid'), nullable=True, default=GUID_DEFAULT_SQLITE)

    activities = relationship('Activity', secondary='activity_user', back_populates='users')
    auths = relationship('Auth', back_populates='user', uselist=True)

    @classmethod
    def transform_data(cls, dataframe):
        dataframe = super(User, cls).transform_data(dataframe)
        dataframe['date_birth'] = dataframe['date_birth'].apply(
            lambda date: datetime.strptime(date, DATE_FORMAT) if date is not None else None)
        dataframe['date_in'] = dataframe['date_in'].apply(
            lambda date: datetime.strptime(date, DATE_FORMAT) if date is not None else None)
        dataframe['date_out'] = dataframe['date_out'].apply(
            lambda date: datetime.strptime(date, DATE_FORMAT) if date is not None else None)
        return dataframe

    @classmethod
    def filter_data(cls, dataframe):
        # TODO user required params
        return super(User, cls).filter_data(dataframe)

    def to_short_dict(self):
        return {
            **super(User, self).to_dict(),
            'name': self.name,
            'surname': self.surname,
            'parental': self.parental,
            'status': self.status,
            'faculty': self.faculty,
            'speciality': self.speciality,
            'date_in': self.date_in.strftime(DATE_FORMAT),
            'date_out': self.date_in.strftime(DATE_FORMAT),
            'about': self.about,
            'avatar': self.avatar,
            'parent_id': str(self.parent_uuid),
        }

    def to_dict(self):
        return {
            **self.to_short_dict(),
            'email': self.email,
            'telephone': self.telephone,
            'date_birth': self.date_birth.strftime(DATE_FORMAT),
        }
