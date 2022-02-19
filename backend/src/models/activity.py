from sqlalchemy_utils import UUIDType

from helpers import db, ApiSheetHelper
from models.base_entity import BaseEntity


class Activity(BaseEntity):
    __tablename__ = 'activity'

    sheet_helper = ApiSheetHelper(__tablename__)

    person_id = db.Column(UUIDType, db.ForeignKey('person.id'))
    event_id = db.Column(UUIDType, db.ForeignKey('event.id'))
    position = db.Column(db.String, nullable=False)
    contribution = db.Column(db.Text)

    @classmethod
    def filter_data(cls, dataframe):
        dataframe = super(Activity, cls).filter_data(dataframe)
        return dataframe[(dataframe['person_id'].notna()) & (dataframe['event_id'].notna())]

    def to_dict(self):
        return {
            **super(Activity, self).to_dict(),
            'personId': str(self.person_id),
            'eventId': str(self.event_id),
            'position': self.position,
            'contribution': self.contribution
        }
