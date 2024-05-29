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
        return Response({'form': form})

    def post(self, request):
        form = EntryForm(request.data)
        if form.is_valid():
            entry = form.save(commit=False)
            entry.user = request.user
            entry.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)





'''
from .models import *
from .serializers import *
from .forms import EntryForm
from .filters import VolunteerFilter
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.authentication import SessionAuthentication

class portfolio(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    def get(self, request):    
        entries = Entry.objects.all()
        searchFilter = VolunteerFilter(request.GET, queryset=entries)
        entries = searchFilter.qs
        serializer = EntrySerializer(entries, many=True)
        return Response(serializer.data)


class createEntry(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    def post(self, request):
        form = EntryForm(request.data)
        if form.is_valid():
            form.save()
            return Response({'message': 'Entry created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
'''

    
# from django.shortcuts import render, redirect
# from django.http import HttpResponse
# # Create your views here.
# from .models import *
# from .forms import EntryForm
# from .filters import VolunteerFilter

# def portfolio(request):
#     entries = Entry.objects.all()

#     searchFilter = VolunteerFilter(request.GET,queryset=entries)
#     entries = searchFilter.qs
#     context = {'entries': entries, 'searchFilter': searchFilter}

#     return render(request, 'volunteer_hours_portfolio/portfolio.html', context)

# def createEntry(request):
#     form = EntryForm()
#     if request.method == 'POST':
#         form = EntryForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('portfolio')


#     context = {'form':form}
#     return render(request, 'volunteer_hours_portfolio/entry_form.html', context)

# def updateEntry(request, pk):
#     entry = Entry.objects.get(id=pk)
    
#     form = EntryForm(instance=entry)
#     if request.method == 'POST':
#         form = EntryForm(request.POST, instance=entry)
#         if form.is_valid():
#             form.save()
#             return redirect('portfolio')
    

#     context = {'form':form}
#     return render(request, 'volunteer_hours_portfolio/entry_form.html', context)

# def deleteEntry(request,pk):
#     entry = Entry.objects.get(id=pk)
#     if request.method == "POST":
#         entry.delete()
#         return redirect('portfolio')

#     context = {'entry': entry}
#     return render(request, 'volunteer_hours_portfolio/delete.html', context)

'''
@login_required
def portfolio(request):
    entries = Entry.objects.filter(user=request.user)

    sort_by = request.GET.get('sort_by')
    sort_order = request.GET.get('sort_order', 'asc')

    if sort_by == 'date':
        if sort_order == 'asc':
            entries = entries.order_by('date')
        else:
            entries = entries.order_by('-date')
    elif sort_by == 'hours':
        if sort_order == 'asc':
            entries = entries.order_by(F('hours').asc(nulls_last=True))
        else:
            entries = entries.order_by(F('hours').desc(nulls_last=True))

    searchFilter = VolunteerFilter(request.GET, queryset=entries)
    entries = searchFilter.qs
    context = {'entries': entries, 'searchFilter': searchFilter}

    return render(request, 'volunteer_hours_portfolio/portfolio.html', context)

@login_required
def createEntry(request):
    form = EntryForm()
    if request.method == 'POST':
        form = EntryForm(request.POST)
        if form.is_valid():
            entry = form.save(commit=False)
            entry.user = request.user
            entry.save()
            return redirect('portfolio')

    context = {'form': form}
    return render(request, 'volunteer_hours_portfolio/entry_form.html', context)

@login_required
def updateEntry(request, pk):
    entry = Entry.objects.get(id=pk, user=request.user)
    
    form = EntryForm(instance=entry)
    if request.method == 'POST':
        form = EntryForm(request.POST, instance=entry)
        if form.is_valid():
            form.save()
            return redirect('portfolio')
    
    context = {'form': form}
    return render(request, 'volunteer_hours_portfolio/entry_form.html', context)

@login_required
def deleteEntry(request, pk):
    entry = Entry.objects.get(id=pk, user=request.user)
    if request.method == "POST":
        entry.delete()
        return redirect('portfolio')

    context = {'entry': entry}
    return render(request, 'volunteer_hours_portfolio/delete.html', context)
'''
