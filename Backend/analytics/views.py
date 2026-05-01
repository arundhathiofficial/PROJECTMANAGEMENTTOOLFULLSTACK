from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import ProjectAnalytics
from .serializers import ProjectAnalyticsSerializer
from projects.models import Project

class ProjectAnalyticsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProjectAnalyticsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ProjectAnalytics.objects.filter(project__owner=self.request.user)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_analytics(request):
    analytics = ProjectAnalytics.objects.filter(project__owner=request.user)
    serializer = ProjectAnalyticsSerializer(analytics, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_project_analytics(request, pk):
    try:
        analytics = ProjectAnalytics.objects.get(project__pk=pk, project__owner=request.user)
        serializer = ProjectAnalyticsSerializer(analytics)
        return Response(serializer.data)
    except ProjectAnalytics.DoesNotExist:
        return Response({'error': 'Analytics not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_analytics(request):
    projects = Project.objects.filter(owner=request.user)
    total_projects = projects.count()
    total_tasks = sum(p.tasks.count() for p in projects)
    completed_tasks = sum(p.tasks.filter(status='completed').count() for p in projects)
    
    return Response({
        'total_projects': total_projects,
        'total_tasks': total_tasks,
        'completed_tasks': completed_tasks,
        'completion_percentage': (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
    })
