from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('profile/', views.get_user_profile, name='profile'),
    path('profile/update/', views.update_user_profile, name='update_profile'),
    path('settings/', views.get_user_settings, name='settings'),
    path('settings/update/', views.update_user_settings, name='update_settings'),
    path('all/', views.get_all_users, name='all_users'),
    path('<int:pk>/', views.get_user_detail, name='user_detail'),
]