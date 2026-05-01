from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from .models import ContactMessage
from .serializers import ContactMessageSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def list_contact_messages(request):
    messages = ContactMessage.objects.all()
    serializer = ContactMessageSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_contact_message(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_contact_detail(request, pk):
    try:
        message = ContactMessage.objects.get(pk=pk)
        serializer = ContactMessageSerializer(message)
        return Response(serializer.data)
    except ContactMessage.DoesNotExist:
        return Response({'error': 'Message not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH'])
@permission_classes([AllowAny])
def mark_message_read(request, pk):
    try:
        message = ContactMessage.objects.get(pk=pk)
        message.is_read = True
        message.save()
        return Response(ContactMessageSerializer(message).data)
    except ContactMessage.DoesNotExist:
        return Response({'error': 'Message not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_contact_message(request, pk):
    try:
        message = ContactMessage.objects.get(pk=pk)
        message.delete()
        return Response({'status': 'Message deleted'}, status=status.HTTP_204_NO_CONTENT)
    except ContactMessage.DoesNotExist:
        return Response({'error': 'Message not found'}, status=status.HTTP_404_NOT_FOUND)