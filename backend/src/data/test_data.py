from src.services import person_service, activity_service, event_service, auth_service


def inject_test_data():
    # just copy paste to get additional entities
    # create event

    event_service.create(
        {
            "name": "Колодій 22",
            "category": "традиції",
            "dateStart": "01.12.2022",
            "dateEnd": "10.12.2022",
            "about": "Подія про блінчики",
            "description": "Колодій – це щорічне традиційне святкування-зустріч весни. У цей день Спудейське братство організовує фестиваль, де могилянці співають пісні, спілкуються, куштують млинці, вареники й інші смаколики. Кульмінація події – спалення солом’яної баби.",
            "photo": "https://i.imgur.com/nTRv2jC.jpg",
        }
    )

    event = event_service.create(
        {
            "name": "Вертеп 22",
            "category": "традиції",
            "dateStart": "15.12.2022",
            "dateEnd": "25.12.2022",
            "about": "Подія про політику і сатиру",
            "description": "Колядки, святковий гамір – все це єднає нас! Спудейське братство пам’ятає про ці традиції. Братчики щороку ламають голови над створенням сценарію актуального політичного Вертепу … і ось шумна група людей із зіркою готова підкорювати світ!",
            "photo": "https://i.imgur.com/PxnEvUL.jpg",
        }
    )

    # create person

    person = person_service.create(
        {
            "name": "Дмитро",
            "surname": "Череда",
            "parental": "Петрович",
            "status": "пошанований",
            "faculty": "ФІ",
            "specialty": "ІПЗ",
            "dateIn": "15.12.2019",
            "dateOut": "30.12.2022",
            "about": "Хлопець моторний і хоть куди козак",
            "avatar": "https://i.ibb.co/NZ1Ty5Y/image.jpg",
            "email": "justuser@gmail.com",
            "telephone": "+38 (098) 123-1234",
            "dateBirth": "20.05.2000",
        }
    )

    # create activity

    activity_service.create(
        {
            "eventId": event.id,
            "personId": person.id,
            "position": "Козак головний організатор",
            "contribution": "Повністю реалізував всю подію і зміг залучити 20к+грн",
        }
    )

    # create authx

    auth_service.create(
        {
            "personId": person.id,
            "access": 4,  # 4 - admin level
            "email": "pasteyour@email.com",
        }
    )
