from rest_framework import serializers
from .models import Task, Activity
from django.contrib.auth.models import User

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = ["owner"]

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"
        read_only_fields = ["owner"]

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id','username','email','password']
    def create(self, validated_data):
        user = User.objects.create_superuser(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user