----------------------------------------------------------------Commands---------------------------------------------------------------------------------------

If you have a new clone of the project, then you must execute the following commands in your command prompt to start the application:

    (1) 'pip install -r requirements.txt'

    (2) 'python manage.py makemigrations'

    (3) 'python manage.py migrate'

    (4) 'python manage.py runserver'

If you would like to create a superuser, run the following command:

    'python manage.py createsuperuser'

If you would like to install all the packages (pip) associated with the project, run the following command:

    'pip install -r requirements.txt'

You can think of the requirement.txt file as all the packages that are needed to run the project. If you do not have it installed, when you run 'python manage.py runserver', your application will throw an error saying that you don't have a specified application installed.

IMPORTANT!: If you installed a new package, ensure that you update the requirements.txt. This is so that everyone doesn't have to go back and install the packages themselves. Here is how you do that. First, ensure that all the new packages you installed are in the 'INSTALLED_APPS' variable in /GoHelpMe/settings.py. Then, run the following command to update the requirements.txt:

    'pip freeze > requirements.txt'

---------------------------------------------------Which directory do I work under?----------------------------------------------------------------------------

Recall that an application is a program that performs a specified function in our project. In this case, there are three applications in our program, (1) Authentication System, (2) Volunteer Events, and (3) Volunteer Hours Portfolio. In terms of their corresponding directories, we have 'accounts', 'volunteer_events', and 'volunteer_hours_portfolio'. Therefore, the following lists the corresponding groups and the directory they will be working under:

(1) accounts (Authentication System)- Claire and Marc

(2) volunteer_events (Volunteer Events) - Palak and Fahim

(3) volunteer_hours_portfolio (Volunteer Hours Portfolio) - Evelyn and Avi

If you would like to make a change to another group's directory that is not your group, please ask them before doing so as to not avoid confusion between groups.

---------------------------------------------------------Mac Troubleshooting-----------------------------------------------------------------------------------

For Mac users, run the following commands to get the site working:

    'python -m venv venv' (python3)

    'source venv/bin/activate'

    'pip install -r requirements.txt'

    'pip freeze > requirements.txt'

    make migrations

    run server

Additionally, you will need to download the following packages. You can use the command "pip freeze" to check if they are downloaded.

    asgiref==3.8.1
    Django==5.0.6
    django-filter==24.2
    pillow==10.3.0
    psycopg2-binary==2.9.9
    sqlparse==0.5.0