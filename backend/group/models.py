from django.db import models
from user.models import CustomUser
import uuid




class Group(models.Model):
    id = models.UUIDField(editable=False,primary_key=True,default=uuid.uuid4)
    name = models.CharField(max_length=255,null=False,blank=False)
    description = models.TextField()
    created_by = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='created_by')
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)



    def __str__(self):
        return self.name

    class Meta:
        unique_together = ("name","created_by") 
    


class GroupMembership(models.Model):
   id = models.UUIDField(editable=False,primary_key=True, default=uuid.uuid4)
   title = models.CharField(max_length=255)
   group =  models.ForeignKey(Group,on_delete=models.CASCADE,related_name='membership')
   user = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='group_membership')
   
   class Meta:
       
       unique_together = ("group","user")
   


   def __str__(self):
        return self.title
                       


 