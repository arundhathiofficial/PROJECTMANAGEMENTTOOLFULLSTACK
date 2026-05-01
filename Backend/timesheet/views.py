from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from datetime import datetime, timedelta
from .models import Timesheet
from .serializers import TimesheetSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_timesheets(request):
    timesheets = Timesheet.objects.filter(user=request.user)
    serializer = TimesheetSerializer(timesheets, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_timesheet(request):
    data = request.data
    data['user'] = request.user.id
    serializer = TimesheetSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_timesheet_detail(request, pk):
    try:
        timesheet = Timesheet.objects.get(pk=pk, user=request.user)
        serializer = TimesheetSerializer(timesheet)
        return Response(serializer.data)
    except Timesheet.DoesNotExist:
        return Response({'error': 'Timesheet not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_timesheet(request, pk):
    try:
        timesheet = Timesheet.objects.get(pk=pk, user=request.user)
        serializer = TimesheetSerializer(timesheet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Timesheet.DoesNotExist:
        return Response({'error': 'Timesheet not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_timesheet(request, pk):
    try:
        timesheet = Timesheet.objects.get(pk=pk, user=request.user)
        timesheet.delete()
        return Response({'status': 'Timesheet deleted'}, status=status.HTTP_204_NO_CONTENT)
    except Timesheet.DoesNotExist:
        return Response({'error': 'Timesheet not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def weekly_summary(request):
    today = datetime.now().date()
    week_start = today - timedelta(days=today.weekday())
    timesheets = Timesheet.objects.filter(user=request.user, date__gte=week_start)
    total_hours = sum(ts.hours_worked for ts in timesheets)
    return Response({
        'total_hours': total_hours,
        'week_start': week_start,
        'entries': TimesheetSerializer(timesheets, many=True).data
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def monthly_summary(request):
    today = datetime.now().date()
    month_start = today.replace(day=1)
    timesheets = Timesheet.objects.filter(user=request.user, date__gte=month_start)
    total_hours = sum(ts.hours_worked for ts in timesheets)
    return Response({
        'total_hours': total_hours,
        'month_start': month_start,
        'entries': TimesheetSerializer(timesheets, many=True).data
    })