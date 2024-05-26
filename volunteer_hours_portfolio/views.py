from django.shortcuts import render, redirect
from django.http import HttpResponse
# Create your views here.
from .models import *
from .forms import EntryForm
from .filters import VolunteerFilter

def portfolio(request):
    entries = Entry.objects.all()

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