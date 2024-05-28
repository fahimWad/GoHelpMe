from django.shortcuts import render, redirect
from django.http import HttpResponse
# Create your views here.
from .models import *
from .forms import EntryForm
from .filters import VolunteerFilter
from django.db.models import F

def portfolio(request):

    entries = Entry.objects.all()

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

    searchFilter = VolunteerFilter(request.GET,queryset=entries)
    entries = searchFilter.qs
    context = {'entries': entries, 'searchFilter': searchFilter}

    return render(request, 'volunteer_hours_portfolio/portfolio.html', context)

def createEntry(request):
    form = EntryForm()
    if request.method == 'POST':
        form = EntryForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('portfolio')


    context = {'form':form}
    return render(request, 'volunteer_hours_portfolio/entry_form.html', context)

def updateEntry(request, pk):
    entry = Entry.objects.get(id=pk)
    
    form = EntryForm(instance=entry)
    if request.method == 'POST':
        form = EntryForm(request.POST, instance=entry)
        if form.is_valid():
            form.save()
            return redirect('portfolio')
    

    context = {'form':form}
    return render(request, 'volunteer_hours_portfolio/entry_form.html', context)

def deleteEntry(request,pk):
    entry = Entry.objects.get(id=pk)
    if request.method == "POST":
        entry.delete()
        return redirect('portfolio')

    context = {'entry': entry}
    return render(request, 'volunteer_hours_portfolio/delete.html', context)
