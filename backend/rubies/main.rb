require "sinatra"
require "tilt/erubis"
require "bcrypt"
require "yaml"
require_relative "database_persistence"
require_relative "helpers"
require 'sinatra/cross_origin'
 
before do
  response.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080'
  response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'
  response.headers['Access-Control-Allow-Credentials'] = 'true'
  @storage = DatabasePersistence.new(logger)
  @helpers = Helper.new(logger)
end

configure do
  enable :cross_origin
  enable :sessions
  set :session_secret, "abaaa48b9318326d4a3a40c7181bb26443fbc846956251077d9523a2a0c7a139c2051c03f286883334411aba2b64149e06470a3fb8d5a315d483444b87d29720"
end

configure(:development) do 
  require "sinatra/reloader"
  enable :cross_origin
  also_reload "database_persistence.rb", "helpers.rb"
end 

options "*" do
  response.headers["Allow"] = "GET, POST, PUT, DELETE, OPTIONS"
  response.headers["Access-Control-Allow-Origin"] = "http://localhost:8080"
  response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With"
  response.headers["Access-Control-Allow-Credentials"] = "true" 
  200
end

get '/' do
  content_type :json
  @storage.get_users().to_json
end

post '/' do
  content_type :json
  username = params[:username]
  password = params[:password_digest]

  @storage.get_users().select do |user| 
    if user['username'] === username
      if BCrypt::Password.new(user['password_digest']) == password
        #return this session message in the dashboard html
        session[:message] = "Welcome back #{username}!"
        session[:user_id] = user['id']
        return {message: 'successful login'}.to_json()
      else 
        session[:message] = "Incorrect password"
        return {message: 'Incorrect password'}.to_json()
      end
    end
  end
  session[:message] = "Incorrect username/ password"
  {message: 'Incorrect Username/ password'}.to_json
end

get '/users' do 
  content_type :json
  @storage.get_usernames().to_json
end

#I will access this in my FE JS to display messages in my html
get '/session_data' do
  content_type :json
  session_data = nil
  if session[:message]
    session_data = session[:message]
    session.delete(:message)  # Deletes the session message
  end
  { message: session_data || '' }.to_json
end

post '/signup' do 
  username = params[:username]
  password = params[:password_digest]

  if @helpers.correct_format_username(username) && @helpers.correct_format_password(password) && @helpers.unique_username(username) 
    password_digest = BCrypt::Password.create(password)
    @storage.add_user(username, password_digest)
    session[:message] = "Welcome #{username}! You're ready to start budgeting!";
    p session[:message]
    {"message": "Welcome #{username}! You're ready to start budgeting!"}.to_json
  else
    {"message": "The Username or Password was not in the correct format"}.to_json
  end
end

