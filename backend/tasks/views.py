from rest_framework import generics
from .models import Task, Activity
from .serializers import TaskSerializer, ActivitySerializer

class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        task = serializer.save()

        Activity.objects.create(
            task_name = task.task_name,
            event = "Created"
        )

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_update(self, serializer):
        was_completed = serializer.instance.is_completed
        updated_task = serializer.save()
        if not was_completed and updated_task.is_completed:
            event = "Completed"
        else:
            event = "Updated"
        Activity.objects.update(
            task_name = updated_task.task_name,
            event = event
        )

    def perform_destroy(self, instance):
        deleted_task_name = instance.task_name
        Activity.objects.create(
            task_name = deleted_task_name,
            event = "Deleted"
        )
        instance.delete()

class ActivityListView(generics.ListAPIView):
    queryset = Activity.objects.order_by("-time_stamp")[:10]
    serializer_class = ActivitySerializer