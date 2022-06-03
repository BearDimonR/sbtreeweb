import uuid

from sqlalchemy.orm import relationship, backref

from helpers import db, ApiSheetHelper, BinaryUUID
from models.base_entity import BaseEntity


class Activity(BaseEntity):
    __tablename__ = 'activity'

    sheet_helper = ApiSheetHelper(__tablename__)

    person_id = db.Column(BinaryUUID, db.ForeignKey('person.id', ondelete='CASCADE'))
    event_id = db.Column(BinaryUUID, db.ForeignKey('event.id', ondelete='CASCADE'))
    position = db.Column(db.String(50), nullable=False)
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

    @classmethod
    def transform_data(cls, dataframe):
        dataframe = super(Activity, cls).transform_data(dataframe)
        dataframe['person_id'] = dataframe['person_id'].apply(
            lambda _id: uuid.UUID(_id) if _id is not None else None)
        dataframe['event_id'] = dataframe['event_id'].apply(
            lambda _id: uuid.UUID(_id) if _id is not None else None)
        return dataframe

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
