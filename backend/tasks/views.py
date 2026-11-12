from rest_framework import generics
from .models import Task, Activity
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import TaskSerializer, ActivitySerializer, UserRegistrationSerializer
from django.contrib.auth.models import User
from .serializers import UserProfileSerializer

class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(owner = self.request.user)

    def perform_create(self, serializer):
        task = serializer.save(owner = self.request.user)

        Activity.objects.create(    
            owner = self.request.user,
            task_name = task.task_name,
            event = "Created"
        )

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)

    def perform_update(self, serializer):
        was_completed = serializer.instance.is_completed
        updated_task = serializer.save()
        if not was_completed and updated_task.is_completed:
            event = "Completed"
        else:
            event = "Updated"
        Activity.objects.create(
            owner=self.request.user,
            task_name = updated_task.task_name,
            event = event
        )

    def perform_destroy(self, instance):
        deleted_task_name = instance.task_name
        Activity.objects.create(
            owner=self.request.user,
            task_name = deleted_task_name,
            event = "Deleted"
        )
        instance.delete()

class ActivityListView(generics.ListAPIView):
    
    queryset = Activity.objects.order_by("-time_stamp")[:10]
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Activity.objects.filter(
            owner=self.request.user
    ).order_by("-time_stamp")[:10]
    

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user