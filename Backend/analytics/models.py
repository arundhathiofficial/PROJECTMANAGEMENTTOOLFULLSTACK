from django.db import models
from django.contrib.auth.models import User
from projects.models import Project

class ProjectAnalytics(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE, related_name='analytics')
    total_tasks = models.IntegerField(default=0)
    completed_tasks = models.IntegerField(default=0)
    total_hours = models.FloatField(default=0)
    team_size = models.IntegerField(default=0)
    budget_spent = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Analytics for {self.project.title}"
