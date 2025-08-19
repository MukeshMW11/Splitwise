from django.db import models
from expense.models import Expense
from group.models import Group
import uuid
# Create your models here.
class Category(models.Model):
   id = models.UUIDField(editable=False,primary_key=True, default=uuid.uuid4)
   name = models.CharField(max_length=255,null=False,blank=False,unique=True)
   created_at = models.DateField(auto_now_add=True)
   updated_at = models.DateField(auto_now=True)
    
   def __str__(self):
        return self.name



class CategoryGroup(models.Model):
   id = models.UUIDField(editable=False,primary_key=True, default=uuid.uuid4)
   group= models.ForeignKey(Group,on_delete=models.CASCADE,related_name='group_categories')
   expense= models.ForeignKey(Expense,on_delete=models.CASCADE,related_name='expense_categories', null=True, blank=True)
   category = models.ForeignKey(Category,on_delete=models.CASCADE, related_name='categories')
   
#    class Meta:
#        unique_together = ("group","category")
   def __str__(self):
        return self.title

