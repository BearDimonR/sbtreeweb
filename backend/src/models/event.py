from sqlalchemy.orm import relationship

from helpers import db, get_sheet_helper
from models.base_entity import BaseEntity


class Event(BaseEntity):
    __tablename__ = 'event'

    sheet_helper = get_sheet_helper(__tablename__)
    start = 'date_start'
    end = 'date_end'

    name = db.Column(db.String(50))
    date_start = db.Column(db.Date)
    date_end = db.Column(db.Date)
    category = db.Column(db.String(30))
    about = db.Column(db.String(200), nullable=True)
    description = db.Column(db.Text, nullable=True)
    photo = db.Column(db.String(100), nullable=True)

    activities = relationship('Activity', back_populates='event')

    types = {
        **BaseEntity.types,
        'date_start': 'date',
        'date_end': 'date'
    }

    @classmethod
    def get_key(cls, key):
        if key == 'dateStart':
            return 'date_start'
        elif key == 'dateEnd':
            return 'date_end'
        else:
            return key

    @classmethod
    def parse_request(cls, body):
        parsed_obj = super(Event, cls).parse_request(body)
        parsed_obj['date_start'] = cls.transform_date(parsed_obj['date_start'])
        parsed_obj['date_end'] = cls.transform_date(parsed_obj['date_end'])
        return parsed_obj

    @classmethod
    def transform_data(cls, dataframe):
        dataframe = super(Event, cls).transform_data(dataframe)
        dataframe['date_start'] = dataframe['date_start'].apply(cls.transform_date)
        dataframe['date_end'] = dataframe['date_end'].apply(cls.transform_date)
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
            'dateStart': self.transform_field('date', self.date_start),
            'dateEnd': self.transform_field('date', self.date_end),
            'about': self.about,
            'description': self.description,
            'photo': self.photo
        }

    def to_full_dict(self):
        return {
            **self.to_dict(),
            'people': list(map(lambda x: x.to_dict_with_person(), self.activities))
        }
