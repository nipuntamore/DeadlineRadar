from django.urls import path
from .views import TaskListCreateView, TaskDetailView, ActivityListView, UserRegistrationView   

urlpatterns = [
    path('tasks/',TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/',TaskDetailView.as_view(), name='task-detail'),
    path('activities/',ActivityListView.as_view(),name='activity-list'),
    path('register/', UserRegistrationView.as_view(), name='user-register'),
]

