from django.urls import path
from rest_framework.authtoken import views as authviews
from rest_framework.urlpatterns import format_suffix_patterns
from hours import views

urlpatterns = [
    path('hours/', views.HourList.as_view()),
    path('hours/<int:pk>/', views.HourDetail.as_view()),
    path('auth/', authviews.obtain_auth_token),
]

urlpatters = format_suffix_patterns(urlpatterns)
