import django_filters
from django_filters import DateFilter
from django.forms import DateInput

from .models import *

class VolunteerFilter(django_filters.FilterSet):
    start_date = DateFilter(field_name="date", lookup_expr='gte', label='Start Date', widget=DateInput(attrs={'type':'date'}))
    end_date = DateFilter(field_name="date", lookup_expr='lte', label='End Date', widget=DateInput(attrs={'type':'date'}))

    class Meta:
        model = Entry
        fields = '__all__'
        exclude = ['role','date','description']
