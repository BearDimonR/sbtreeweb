from datetime import datetime

from sqlalchemy.orm import relationship

from config import DATE_FORMAT
from helpers import db, ApiSheetHelper
from models.base_entity import BaseEntity


class Activity(BaseEntity):
    __tablename__ = 'activity'

    sheet_helper = ApiSheetHelper(__tablename__)

    name = db.Column(db.String)
    date_start = db.Column(db.Date)
    date_end = db.Column(db.Date)
    category = db.Column(db.String)
    about = db.Column(db.String, nullable=True)
    description = db.Column(db.Text, nullable=True)
    photo = db.Column(db.String, nullable=True)

    users = relationship('User', secondary='activity_user', back_populates='activities')

    @classmethod
    def transform_data(cls, dataframe):
        dataframe = super(Activity, cls).transform_data(dataframe)
        dataframe['date_start'] = dataframe['date_start'].apply(
            lambda date: datetime.strptime(date, DATE_FORMAT) if date is not None else None)
        dataframe['date_end'] = dataframe['date_end'].apply(
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
            'category': self.category,
            'date_start': self.date_start.strftime(DATE_FORMAT),
            'date_end': self.date_end.strftime(DATE_FORMAT),
            'about': self.about,
            'description': self.description,
            'photo': self.photo
        }
