from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_contact_messages, name='contact_list'),
    path('create/', views.create_contact_message, name='create_contact'),
    path('<int:pk>/', views.get_contact_detail, name='contact_detail'),
    path('<int:pk>/mark-read/', views.mark_message_read, name='mark_read'),
    path('<int:pk>/delete/', views.delete_contact_message, name='delete_contact'),
]