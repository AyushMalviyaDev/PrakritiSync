from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    TherapyViewSet,
    PatientTherapyViewSet,
)

router = DefaultRouter()

router.register(
    "patient-therapies",
    PatientTherapyViewSet,
    basename="patient-therapy"
)

router.register(
    "therapies",
    TherapyViewSet,
    basename="therapy-nested"
)

router.register(
    "",
    TherapyViewSet,
    basename="therapy"
)

urlpatterns = [
    path("", include(router.urls)),
]