from django.db import models

# Create your models here.
class Task(models.Model):

    PRIORITY_CHOICES  = [
        ('Urgent','Urgent'),
        ('High','High'),
        ('Medium','Medium'),
        ('Low','Low'),
    ]

    task_name = models.CharField(max_length=200)
    due_date = models.DateField()
    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default='Medium'
    )
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.task_name