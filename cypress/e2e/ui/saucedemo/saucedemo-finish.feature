Feature: Checkout - Finish

  Background:
    Given the user completed checkout to the Finish page

  Scenario: Thank-you message and Back Home
    Then a thank you message should be shown
    And a Back Home button should be visible

  Scenario: Back Home returns to Products
    When the user clicks Back Home
    Then the Products page should be displayed
