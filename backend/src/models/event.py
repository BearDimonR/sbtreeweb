from datetime import datetime

from sqlalchemy.orm import relationship

from config import DATE_FORMAT
from helpers import db, ApiSheetHelper
from models.base_entity import BaseEntity


class Event(BaseEntity):
    __tablename__ = 'event'

    sheet_helper = ApiSheetHelper(__tablename__)
    start = 'date_start'
    end = 'date_end'

    name = db.Column(db.String)
    date_start = db.Column(db.Date)
    date_end = db.Column(db.Date)
    category = db.Column(db.String)
    about = db.Column(db.String, nullable=True)
    description = db.Column(db.Text, nullable=True)
    photo = db.Column(db.String, nullable=True)

    activities = relationship('Activity', back_populates='event')

    @classmethod
    def transform_data(cls, dataframe):
        dataframe = super(Event, cls).transform_data(dataframe)
        dataframe['date_start'] = dataframe['date_start'].apply(
            lambda date: datetime.strptime(date, DATE_FORMAT) if date is not None else None)
        dataframe['date_end'] = dataframe['date_end'].apply(
            lambda date: datetime.strptime(date, DATE_FORMAT) if date is not None else None)
        return dataframe

    @classmethod
    def filter_data(cls, dataframe):
        # TODO activity required params
        return super(Event, cls).filter_data(dataframe)

    def to_dict(self):
        return {
            **super(Event, self).to_dict(),
            'name': self.name,
            'category': self.category,
            'dateStart': self.date_start.strftime(DATE_FORMAT),
            'dateEnd': self.date_end.strftime(DATE_FORMAT),
            'about': self.about,
            'description': self.description,
            'photo': self.photo
        }

    def to_full_dict(self):
        return {
            **self.to_dict(),
            'people': list(map(lambda x: x.to_dict_with_person(), self.activities))
        }
