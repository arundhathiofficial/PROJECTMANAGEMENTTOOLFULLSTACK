from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_timesheets, name='timesheet_list'),
    path('create/', views.create_timesheet, name='create_timesheet'),
    path('<int:pk>/', views.get_timesheet_detail, name='timesheet_detail'),
    path('<int:pk>/update/', views.update_timesheet, name='update_timesheet'),
    path('<int:pk>/delete/', views.delete_timesheet, name='delete_timesheet'),
    path('weekly-summary/', views.weekly_summary, name='weekly_summary'),
    path('monthly-summary/', views.monthly_summary, name='monthly_summary'),
]