import uuid

from sqlalchemy.orm import relationship

from helpers import db, get_sheet_helper, BinaryUUID
from models.base_entity import BaseEntity


class Auth(BaseEntity):
    __tablename__ = 'auth'

    sheet_helper = get_sheet_helper(__tablename__)

    person_id = db.Column(BinaryUUID, db.ForeignKey('person.id', ondelete='CASCADE'))
    access = db.Column(db.Integer, default=0)
    email = db.Column(db.String(30))

    person = relationship('Person', back_populates='auths')

    types = {
        **BaseEntity.types,
        'person_id': 'id',
    }

    @classmethod
    def get_key(cls, key):
        if key == 'personId':
            return 'person_id'
        else:
            return key

    @classmethod
    def filter_data(cls, dataframe):
        dataframe = super(Auth, cls).filter_data(dataframe)
        return dataframe[(dataframe['person_id'].notna()) & (dataframe['email'].notna())]

    @classmethod
    def transform_data(cls, dataframe):
        dataframe = super(Auth, cls).transform_data(dataframe)
        dataframe['person_id'] = dataframe['person_id'].apply(
            lambda _id: uuid.UUID(_id) if _id is not None else None)
        return dataframe

    def to_dict(self):
        return {**super(Auth, self).to_dict(), 'personId': self.transform_field('id', self.person_id),
                'access': self.access,
                'email': self.email, 'avatar': self.person.avatar}
