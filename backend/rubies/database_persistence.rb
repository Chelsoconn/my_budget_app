require "pg"

class DatabasePersistence

  def initialize(logger)
    @logger = logger
    @db = if Sinatra::Base.production?
      PG.connect(ENV['DATABASE_URL'])
    else
      PG.connect(dbname: "budget")
    end
  end

  #get all users
  def get_users()
    result = query("SELECT * FROM login")
    result.map do |tuple| 
      tuple
    end
  end
  
  #get all usernames to check unique username during signup
  def get_usernames() 
    result = query("SELECT username FROM login")
    result.map do |tuple|
      tuple["username"]
    end
  end

  
  #add users
  def add_user(username, password)
    sql = <<~SQL
    INSERT INTO login
    (username, password_digest)
    VALUES ($1, $2);
    SQL
    query(sql, username, password)
  end 
  

  

  private

  def query(statement, *params) 
    @logger.info "#{statement}: #{params}"
    @db.exec_params(statement, params)
  end 
end