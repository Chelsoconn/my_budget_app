require_relative "database_persistence"


class Helper 

  def initialize(logger)
    @storage = DatabasePersistence.new(logger)
  end 
   
  def correct_format_username(username) 
    regex = /^(?=.*[A-Z])(?!.*\s)(?!.*[\W])[A-Za-z0-9_]{6,50}$/
    regex.match?(username)
  end 
   
  def correct_format_password(password)
    regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s)[A-Za-z\d\W_]{6,50}$/
    regex.match?(password)
  end

  def unique_username(username) 
    !@storage.get_usernames().any?{|name| name === username}
  end

end