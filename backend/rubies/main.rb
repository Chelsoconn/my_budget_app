require "sinatra"
require "tilt/erubis"
require "bcrypt"
require "yaml"
require_relative "database_persistence"
require 'sinatra/cross_origin'
#require 'json'

# set :public_folder, 'frontend' 
# 
before do
  response.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080'
  response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'
  @storage = DatabasePersistence.new(logger)
end

configure do
  enable :cross_origin
  enable :sessions
  set :session_secret, "abaaa48b9318326d4a3a40c7181bb26443fbc846956251077d9523a2a0c7a139c2051c03f286883334411aba2b64149e06470a3fb8d5a315d483444b87d29720"
end

configure(:development) do 
  require "sinatra/reloader"
  enable :cross_origin
  also_reload "database_persistence.rb"
end 




options "*" do
  response.headers["Allow"] = "GET, POST, PUT, DELETE, OPTIONS"
  response.headers["Access-Control-Allow-Origin"] = "http://localhost:8080"
  response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With"
  200
end


get '/' do
  content_type :json
  @storage.get_users().to_json
end

#I will access this in my FE JS to display messages in my html
get '/session_data' do
  content_type :json
  { message: session[:message], theme: session[:theme] }.to_json
end

post '/signup' do 
  username = params[:username]
  password = params[:password_digest]
  password_digest = BCrypt::Password.create(password)
  @storage.add_user(username, password_digest)
  redirect "http://localhost:8080"
end




# post "/add_member" do
#   logged_in?
#   #create new member object to have access to Member methods
#   member = Member.new(params[:name], params[:distinction])
#   #ensures that member added has a unique and valid name 
#   if @helper.not_unique_name(member.name)
#     session[:message] = @helper.message("unique_name_error")
#     redirect "/add_member"
#   elsif @helper.invalid_name?(member)
#     session[:message] = @helper.message("name_error")
#     redirect "/add_member"
#   end 
#   #adds new member
#   @storage.add_member(member)
#   session[:message] = @helper.message("member_added")
#   redirect "/main_page/page/1"
# end 