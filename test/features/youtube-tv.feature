Feature: Smart TV Navigation
  As a Smart TV user
  I want to navigate using the TV remote
  So I can search and play videos without a physical keyboard

  Scenario: Search and play a video using TV remote navigation
    Given I open the YouTube TV app
    And I skip the Privacy and Sign In screens
    When I open the search bar from the sidebar
    And I type "WINDOWSIGHT" using the on-screen virtual keyboard
    Then I can navigate to the results and play the first video for 10 seconds
