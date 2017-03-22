Given /^"([^"]*)" is logged in$/ do |email|
  @current_user = Factory(:user, :email => email)
  log_in
end

private

def log_in
    cookie_jar = Capybara.current_session.driver.browser.current_session.instance_variable_get(:@rack_mock_session).cookie_jar
    cookie_jar[:stub_user_id] = @current_user.id
  end
