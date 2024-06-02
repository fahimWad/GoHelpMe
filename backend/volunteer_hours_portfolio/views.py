from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Entry
from .serializers import EntrySerializer
from .filters import VolunteerFilter
from .forms import EntryForm
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.db.models import F
from django.contrib.auth.decorators import login_required

class portfolio(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def get(self, request):
        entries = Entry.objects.filter(user=request.user)

        sort_by = request.GET.get('sort_by')
        sort_order = request.GET.get('sort_order', 'asc')

        if sort_by == 'date':
            entries = entries.order_by('date' if sort_order == 'asc' else '-date')
        elif sort_by == 'hours':
            entries = entries.order_by(F('hours').asc(nulls_last=True) if sort_order == 'asc' else F('hours').desc(nulls_last=True))

        searchFilter = VolunteerFilter(request.GET, queryset=entries)
        entries = searchFilter.qs
        serializer = EntrySerializer(entries, many=True)
        
        return Response(serializer.data)

class createEntry(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def get(self, request):
        form = EntryForm()
        return Response({'form': form.as_p()})

    def post(self, request):
        form = EntryForm(request.data)
        if form.is_valid():
            entry = form.save(commit=False)
            entry.user = request.user
            entry.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateEntry(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def get(self, request, pk):
        entry = get_object_or_404(Entry, pk=pk, user=request.user)
        form = EntryForm(instance=entry)
        return Response({'form': form.as_p()})

    def post(self, request, pk):
        entry = get_object_or_404(Entry, pk=pk, user=request.user)
        form = EntryForm(request.data, instance=entry)
        if form.is_valid():
            form.save()
            return Response(status=status.HTTP_200_OK)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteEntry(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def get(self, request, pk):
        entry = get_object_or_404(Entry, pk=pk, user=request.user)
        return Response({'entry': EntrySerializer(entry).data})

    def delete(self, request, pk):
        entry = get_object_or_404(Entry, pk=pk, user=request.user)
        entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)