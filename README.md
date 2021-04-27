# fullstack-restraurant-app

A simple app to solve the task on https://gist.github.com/seahyc/d013a8f8f1c1be52513cf7b77cce6e81

A simple user-facing webapp that allows the user to filter for restaurants open by date time as well as restaurant name.
On top of that, users can save restaurants into their own named collections (eg. Vegetarian favourites, Meat-lovers etc.). 

Working Application URL https://glintsui.herokuapp.com/  (It may be slow to load on first attempt, as it is running in free dynos on heroku servers)

## Frontend
glintsui

## Backend
glintsapp

Both applications are running&starting with npm install & npm start

You need to set some env variables to run the frontend application:

REACT_APP_GLINTS_ADDTOLIST_URL - points to addtolist url of your backend

REACT_APP_GLINTS_GETLISTS_URL  - points to getlists url of your backend

REACT_APP_GLINTS_SEARCH_URL - points to search/list url of your backend

REACT_APP_GOOGLE_CLIENT_ID (You would need to create this on https://console.cloud.google.com/apis/credentials for your url or your local machine.)

