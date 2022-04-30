from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType

from helpers import db, ApiSheetHelper
from models.base_entity import BaseEntity


class Auth(BaseEntity):
    __tablename__ = 'auth'

    sheet_helper = ApiSheetHelper(__tablename__)

    person_id = db.Column(UUIDType(binary=False), db.ForeignKey('person.id', ondelete='CASCADE'))
    access = db.Column(db.Integer, default=0)
    email = db.Column(db.String)

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

    def to_dict(self):
        return {**super(Auth, self).to_dict(), 'personId': self.transform_field('id', self.person_id),
                'access': self.access,
                'email': self.email, 'avatar': self.person.avatar}
