from rest_framework import serializers
from .models import Timesheet
from projects.serializers import TaskSerializer
from users.serializers import UserSerializer

class TimesheetSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    task = TaskSerializer(read_only=True)
    
    class Meta:
        model = Timesheet
        fields = ['id', 'user', 'task', 'date', 'hours_worked', 'description']