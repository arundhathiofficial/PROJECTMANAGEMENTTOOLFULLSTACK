from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_projects, name='project_list'),
    path('create/', views.create_project, name='create_project'),
    path('<int:pk>/', views.get_project_detail, name='project_detail'),
    path('<int:pk>/update/', views.update_project, name='update_project'),
    path('<int:pk>/delete/', views.delete_project, name='delete_project'),
    path('<int:pk>/add-member/', views.add_team_member, name='add_team_member'),
    path('<int:pk>/statistics/', views.project_statistics, name='project_statistics'),
    path('tasks/', views.list_tasks, name='task_list'),
    path('tasks/create/', views.create_task, name='create_task'),
    path('tasks/<int:pk>/', views.get_task_detail, name='task_detail'),
    path('tasks/<int:pk>/update/', views.update_task, name='update_task'),
    path('tasks/<int:pk>/delete/', views.delete_task, name='delete_task'),
    path('tasks/<int:pk>/update-status/', views.update_task_status, name='update_task_status'),
]