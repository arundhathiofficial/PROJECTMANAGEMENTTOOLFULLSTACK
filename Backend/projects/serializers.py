from rest_framework import serializers
from .models import Project, Task
from users.serializers import UserSerializer

class TaskSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'project', 'assigned_to', 'priority', 'status', 'due_date', 'estimated_hours', 'actual_hours']

class ProjectSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    tasks = TaskSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'owner', 'team_members', 'status', 'start_date', 'end_date', 'budget', 'progress', 'tasks']