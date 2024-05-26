import django_filters
from django_filters import DateFilter
from .models import *

class VolunteerFilter(django_filters.FilterSet):
    start_date = DateFilter(field_name="date", lookup_expr='gte', label='Start Date')
    end_date = DateFilter(field_name="date", lookup_expr='lte', label='End Date')
    
    class Meta:
        model = Entry
        fields = '__all__'
        exclude = ['role','date','description']
