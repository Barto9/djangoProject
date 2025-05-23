from django.shortcuts import render, redirect
def counter_view(request):
    if 'count' not in request.session:
        request.session['count'] = 0
    if request.method == 'POST':
        request.session['count'] += 1

    return render(request, 'counter.html', {'count': request.session['count']})