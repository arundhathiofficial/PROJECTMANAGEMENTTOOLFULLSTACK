from django.db import models
from django.contrib.auth.models import User
from projects.models import Task

class Timesheet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='timesheets')
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='timesheets')
    date = models.DateField()
    hours_worked = models.FloatField()
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'task', 'date')

    def __str__(self):
        return f"{self.user.username} - {self.task.title} - {self.date}"
