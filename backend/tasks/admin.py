from django.contrib import admin
from .models import Task, Activity

admin.site.register(Task)

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ("task_name", "event", "time_stamp")
    readonly_fields = ("time_stamp",)