from datetime import datetime

from sqlalchemy.orm import relationship

from config import DATE_FORMAT
from helpers import db, ApiSheetHelper
from models.base_entity import BaseEntity


class Activity(BaseEntity):
    __tablename__ = 'activity'

    sheet_helper = ApiSheetHelper(__tablename__)

    name = db.Column(db.String)
    date = db.Column(db.Date)
    about = db.Column(db.String, nullable=True)
    description = db.Column(db.Text, nullable=True)
    photo = db.Column(db.String, nullable=True)

    users = relationship('User', secondary='activity_user', back_populates='activities')

    @classmethod
    def transform_data(cls, dataframe):
        dataframe = super(Activity, cls).transform_data(dataframe)
        dataframe['date'] = dataframe['date'].apply(
            lambda date: datetime.strptime(date, DATE_FORMAT) if date is not None else None)
        return dataframe

    @classmethod
    def filter_data(cls, dataframe):
        # TODO activity required params
        return super(Activity, cls).filter_data(dataframe)

    def to_dict(self):
        return {
            **super(Activity, self).to_dict(),
            'name': self.name,
            'date': self.date.strftime(DATE_FORMAT),
            'about': self.about,
            'description': self.description,
            'photo': self.photo
        }
