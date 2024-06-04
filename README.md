# <img src="./images/squarelogo.png" width=30px> GoHelpMe <img src="./images/squarelogo.png" width=30px>

![GoHelpMe Logo](./images/GoHelpMe_Green.png)

_GoHelpMe_ is a full stack web application that connects users interested in volunteering with those who are trying to organize events.

**Note:** It is recommended you run GoHelpMe either on Chrome or Firefox. Running this web app on Safari is undefined behavior.

## Table of Contents
- [Features](https://github.com/fahimWad/GoHelpMe/#features)
- [Technologies](https://github.com/fahimWad/GoHelpMe/#technologies)
- [Setup](https://github.com/fahimWad/GoHelpMe/#setup)
- [Authors](https://github.com/fahimWad/GoHelpMe/#authors)

## Features

- waiting on confirmation from TAs...

## Technologies
- React.js <img src="./images/react.png" alt="react.js" width="30px">
- Django <img src="./images/django.png" alt="django" width="30px">
- PostgreSQL <img src="./images/Postgresql_elephant.png" alt="postgresql" width="30px">

## Setup
In order to run a local instance of GoHelpMe, follow the instructions below.

<details><summary><b>Show instructions</b></summary>

1. Create a new directory and startup a virtual environment

```shell
mkdir webapp
cd webapp
python3 -m venv venv
source venv/bin/activate
```

2. Clone this repository and change into its directory

```shell
git clone https://github.com/fahimWad/GoHelpMe.git
```

3. Install dependencies for the back end

```shell
pip install -r GoHelpMe/backend/requirements.txt
pip install --upgrade pip
```

4. Install more things manually (currently working on cleaning this up)
```shell
(venv) $ pip install django
# blah blah...successfully installed
(venv) $ pip install django_filter
#...successfully installed
(venv) $ python -m pip install Pillow
#...successfully installed
(venv) $ pip install djangorestframework
#...successfully installed
(venv) $ pip install django-cors-headers
#...successfully installed
```

5. Make migrations for back end
```shell
(venv) $ python GoHelpMe/backend/manage.py makemigrations
#...
(venv) $ python GoHelpMe/backend/manage.py migrate
... OK
... OK
... OK
(venv) $ 

```

6. Run the backend server
```shell
(venv) $ python GoHelpMe/backend/manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified 10 issues (0 silenced).
June 03, 2024 - 21:46:22
Django version 5.0.6, using settings 'GoHelpMe.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

7. In a separate terminal, install the frontend dependencies
```shell
$ cd webapp
$ source venv/bin/activate
(venv) $ cd GoHelpMe/frontend
(venv) $ npm -f install
```

8. Run the webapp!
```shell
(venv) $ npm start
```
</details>

## Authors
_RendeYou_ was made as a project for **CS 35L** taught by Professor Paul Eggert at UCLA in Winter 2022. 

**Made by**: Marc Luzuriaga, Claire Li, Avinash Swain, Evelyn Cho, Fahim Wadhwania, & Palak Parikh

