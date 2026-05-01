from rest_framework import serializers
from .models import ProjectAnalytics

class ProjectAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectAnalytics
        fields = ['id', 'project', 'total_tasks', 'completed_tasks', 'total_hours', 'team_size', 'budget_spent']