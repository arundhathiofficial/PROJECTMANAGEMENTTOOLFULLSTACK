from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_analytics, name='analytics_list'),
    path('<int:pk>/', views.get_project_analytics, name='project_analytics'),
    path('dashboard/', views.dashboard_analytics, name='dashboard_analytics'),
]