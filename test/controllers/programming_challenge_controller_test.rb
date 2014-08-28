require 'test_helper'

class ProgrammingChallengeControllerTest < ActionController::TestCase
  test "should get add" do
    get :add
    assert_response :success
  end

  test "should get autocomplete" do
    get :autocomplete
    assert_response :success
  end

  test "should get send" do
    get :send
    assert_response :success
  end

end
