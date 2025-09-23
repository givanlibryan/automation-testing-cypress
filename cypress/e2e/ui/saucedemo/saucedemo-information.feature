Feature: Checkout - Your Information

  Background:
    Given the user is logged into SauceDemo as "STANDARD"
    And the user has the following products in the cart:
      | Sauce Labs Backpack |
    And the user opens the Cart page
    And the user proceeds to Checkout

  Scenario: All fields are required
    When the user submits the Information form with:
      | first |  |
      | last  |  |
      | zip   |  |
    Then a validation error should contain "Error: First Name is required"

  Scenario: Complete the form successfully
    When the user submits the Information form with:
      | first | John  |
      | last  | Doe   |
      | zip   | 90210 |
    Then the Overview page should be displayed

  Scenario: Cancel returns to Cart
    When the user clicks Cancel on the Information page
    Then the Cart page should be displayed
