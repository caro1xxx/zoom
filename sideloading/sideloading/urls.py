from django.urls import re_path, path
from convert.views.convert import Convert
from flow.views import FlowProperty,subscribeDispatchUrl,Ping,GFW,Traffic,createUser,userExpired

urlpatterns = [
    re_path(r'^api/v1/side/ZOOM机场$', Convert.as_view()),
    re_path(r'^api/v1/side/flowproperty$', FlowProperty.as_view()),
    re_path(r'^api/v1/side/dispatch$', subscribeDispatchUrl.as_view()),
    re_path(r'^api/v1/side/ping$', Ping.as_view()),
    re_path(r'^api/v1/side/gfwBan$', GFW.as_view()),
    re_path(r'^api/v1/side/traffic$', Traffic.as_view()),
    re_path(r'^api/v1/side/create$', createUser.as_view()),
    re_path(r'^api/v1/side/expired$', userExpired.as_view()),
]
