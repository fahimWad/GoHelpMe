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
$ mkdir GoHelpMe
$ cd GoHelpMe
$ python3 -m venv venv
$ source venv/bin/activate
(venv) $ 
```

2. Clone this repository and change into its directory

```shell
(venv) $ git clone https://github.com/fahimWad/GoHelpMe.git
Cloning into 'GoHelpMe'...
remote: Enumerating objects: 347, done.
remote: Counting objects: 100% (347/347), done.
remote: Compressing objects: 100% (229/229), done.
remote: Total 347 (delta 180), reused 263 (delta 110), pack-reused 0
Receiving objects: 100% (347/347), 257.41 KiB | 2.45 MiB/s, done.
Resolving deltas: 100% (180/180), done.
(venv) $ 
```
3. Install the requirements

```shell
(venv) $ pip install -r GoHelpMe/backend/requirements.txt
# Installing build dependencies ... blah blah
# hopefully this works
# lots more blah
# maybe some scary messages like error: subprocess-exited-with-error (instructors said to ignore this)
# if a new release of pip is available then do the prompt below, otherwise just continue to step 4
(venv) $ pip install --upgrade pip
# more blah
(venv) $
```

4. Install more things manually (currently working on cleaning this up)
```shell
(venv) $ pip install django
# blah blah...Successfully installed asgiref-# django-# sqlparse-#
(venv) $ pip install django_filter
#...successfully installed django_filter-24.2
(venv) $ python -m pip install Pillow
#...successfully installed Pillow-10.3.0
(venv) $
```

5. Make migrations for django web app
```shell
(venv) $ python manage.py makemigrations
#...
(venv) $ python manage.py migrate
... OK
... OK
... OK
(venv) $
```

6. Run the server!
```shell
(venv) $ python manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified some issues:

WARNINGS:
?: (staticfiles.W004) The directory '/.../gohelpme/test/GoHelpMe/static' in the STATICFILES_DIRS setting does not exist.

System check identified 1 issue (0 silenced).
May 29, 2024 - 05:49:46
Django version 5.0.6, using settings 'GoHelpMe.settings'
Starting development server at http://127.0.0.1:8000/ # <--- PASTE THIS LINK INTO YOUR BROWSER
Quit the server with CONTROL-C.
```
</details>

## Authors
_RendeYou_ was made as a project for **CS 35L** taught by Professor Paul Eggert at UCLA in Winter 2022. 

**Made by**: Marc Luzuriaga, Claire Li, Avinash Swain, Evelyn Cho, Fahim Wadhwania, & Palak Parikh

