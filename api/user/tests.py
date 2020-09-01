from django.test import TestCase, Client
from django.contrib.auth import get_user_model

from .serializers import UserSerializer


class UserTestCase(TestCase):
    def setUp(self):
        get_user_model().objects.create(id='1', username='testboy', email='test@boy.com')
        get_user_model().objects.create(id='2', username='testgirl', email='test@girl.com')
        self.admin = get_user_model().objects.create(id='3', username='adminboy', email='admin@boy.com', is_staff=True)
        self.client = Client(enforce_csrf_checks=False)
        self.client.force_login(self.admin)

    def test_get_list(self):
        r = self.client.get('/users/')

        users = get_user_model().objects.all()
        s = UserSerializer(users, many=True)

        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json(), s.data)

    def test_get_item(self):
        r = self.client.get('/users/1/')

        user = get_user_model().objects.filter(id=1).first()
        s = UserSerializer(user)

        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json(), s.data)
