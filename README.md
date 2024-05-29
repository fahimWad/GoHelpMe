----------------------------------------------------------------Commands---------------------------------------------------------------------------------------

If you have a new clone of the project, then you must execute the commands in the 'backend' and 'frontend' directory.
Under the backend directory, execute the following commands in your terminal:

    (1) 'pip install -r requirements.txt'

    (2) 'python manage.py makemigrations'

    (3) 'python manage.py migrate'

    (4) 'python manage.py runserver'

In a SEPERATE terminal, execute the following commands under the 'frontend' directory in your terminal:
    (1) "npm install"

    (2) "npm install axios --save"

    (3) "npm install react-bootstrap-validation --save"

    (4) "npm i web-vitals --save-dev"

    (5) "npm install --save react-bootstrap bootstrap@3"

    (5) "npm start"

If you would like to create a superuser, run the following command under the backend directory:

    'python manage.py createsuperuser'

If you would like to install all the packages (pip) associated with the project, run the following command:

    'pip install -r requirements.txt'

You can think of the requirement.txt file as all the packages that are needed to run the project. If you do not have it installed, when you run 'python manage.py runserver', your application will throw an error saying that you don't have a specified application installed.

IMPORTANT!: If you installed a new package in the backend, ensure that you update the requirements.txt. This is so that everyone doesn't have to go back and install the packages themselves. Here is how you do that. First, ensure that all the new packages you installed are in the 'INSTALLED_APPS' variable in /GoHelpMe/settings.py. Then, run the following command to update the requirements.txt:

    'pip freeze > requirements.txt'

---------------------------------------------------Which directory do I work under?----------------------------------------------------------------------------

Recall that an application is a program that performs a specified function in our project. In this case, there are three applications in our program, (1) Authentication System, (2) Volunteer Events, and (3) Volunteer Hours Portfolio. In terms of their corresponding directories, we have 'accounts', 'volunteer_events', and 'volunteer_hours_portfolio'. Therefore, the following lists the corresponding groups and the directory they will be working under:

(1) accounts (Authentication System)- Claire and Marc

(2) volunteer_events (Volunteer Events) - Palak and Fahim

(3) volunteer_hours_portfolio (Volunteer Hours Portfolio) - Evelyn and Avi

If you would like to make a change to another group's directory that is not your group, please ask them before doing so as to not avoid confusion between groups.

---------------------------------------------------REACT DEPENDENCIES----------------------------------------------------------------------------
Install the following under the frontened directory:

npm install axios --save
npm install react-bootstrap-validation --save
npm i web-vitals --save-dev
npm install --save react-bootstrap bootstrap@3


npm i webpack webpack-cli --save-dev
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
npm i react react-dom --save-dev
npm install -f @material-ui/core
npm install @babel/plugin-proposal-class-properties
npm install react-router-dom
npm install @material-ui/icons
npm install -f react-router-dom