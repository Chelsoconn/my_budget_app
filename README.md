

Overview

This project is a web application that includes a frontend and backend, each running on separate servers. The backend is powered by Sinatra, while the frontend is served by http-server. Additionally, a PostgreSQL database is used, and you can set it up locally using the provided ./backend/data/dbsetup.rb file.

Before setting up and running the project, ensure you have the following installed:

Ruby (version X.X.X)
PostgreSQL (version X.X)
Node.js (version X.X.X) and npm (for http-server)
http-server (can be installed via npm)
Bundler (for managing Ruby gems)
Any additional dependencies or frameworks that your project requires

Installation
Clone the Repository

git clone
cd 

Backend Setup
Navigate to the backend directory:

cd backend
run bundle install
Set up the database:

Ensure PostgreSQL is running locally.

Run the dbsetup.rb file to create and seed the database:

ruby dbsetup.rb

cd backend 
bundle exec ruby rubies/main.rb

Frontend Setup
Navigate to the frontend directory:


cd frontend
Install http-server globally if you don't already have it:


npm install -g http-server
http-server

Usage
The frontend and backend should now be running on separate servers.
To interact with the backend API, the frontend will send requests to http://localhost:4567.
You can open the frontend in your browser at http://localhost:8080.