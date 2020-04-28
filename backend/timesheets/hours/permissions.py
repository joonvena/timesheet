from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    def is_owner_of_object(self, request, view, obj):
        return obj.owner == request.user