from models.person import Person
from services.base_service import BaseService


class PersonService(BaseService):
    def __init__(self):
        super(PersonService, self).__init__(Person)

    def get_tree(self):
        nodes = self.get_all()
        links = [
            {"source": node.parent_id, "target": node.id}
            for node in nodes
            if node.parent_id
        ]
        return nodes, links
