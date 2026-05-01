from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_feedback, name='feedback_list'),
    path('create/', views.create_feedback, name='create_feedback'),
    path('<int:pk>/', views.get_feedback_detail, name='feedback_detail'),
    path('<int:pk>/update/', views.update_feedback, name='update_feedback'),
    path('<int:pk>/delete/', views.delete_feedback, name='delete_feedback'),
]