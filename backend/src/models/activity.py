from sqlalchemy_utils import UUIDType
from sqlalchemy.orm import relationship

from helpers import db, ApiSheetHelper
from models.base_entity import BaseEntity


class Activity(BaseEntity):
    __tablename__ = 'activity'

    sheet_helper = ApiSheetHelper(__tablename__)

    person_id = db.Column(UUIDType(binary=False), db.ForeignKey('person.id'))
    event_id = db.Column(UUIDType(binary=False), db.ForeignKey('event.id'))
    position = db.Column(db.String, nullable=False)
    contribution = db.Column(db.Text)

    event = relationship("Event", back_populates="activities")
    person = relationship("Person", back_populates="activities")

    types = {
        **BaseEntity.types,
        'person_id': 'id',
        'event_id': 'id'
    }

    @classmethod
    def get_key(cls, key):
        if key == 'personId':
            return 'person_id'
        elif key == 'eventId':
            return 'event_id'
        else:
            return key

    @classmethod
    def filter_data(cls, dataframe):
        dataframe = super(Activity, cls).filter_data(dataframe)
        return dataframe[(dataframe['person_id'].notna()) & (dataframe['event_id'].notna())]

    def to_dict(self):
        return {
            **super(Activity, self).to_dict(),
            'personId': self.transform_field('id', self.person_id),
            'eventId': self.transform_field('id', self.event_id),
            'position': self.position,
            'contribution': self.contribution
        }

    def to_dict_with_event(self):
        return {
            **self.to_dict(),
            'event': self.event.to_dict()
        }

    def to_dict_with_person(self):
        return {
            **self.to_dict(),
            'person': self.person.to_short_dict()
        }

    def to_full_dict(self):
        return {
            **self.to_dict(),
            'person': self.person.to_short_dict(),
            'event': self.event.to_dict()
        }
