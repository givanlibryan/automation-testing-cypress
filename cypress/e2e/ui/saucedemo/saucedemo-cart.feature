Feature: Cart page

  Background:
    Given the user is logged into SauceDemo as "STANDARD"
    And the user has the following products in the cart:
      | Sauce Labs Backpack |
      | Sauce Labs Bike Light |
    And the user opens the Cart page

  Scenario: Badge equals number of cart items
    Then the cart badge should equal the number of cart items

  Scenario: Remove an item updates list and badge
    When the user removes "Sauce Labs Bike Light" from the cart
    Then the cart should list exactly:
      | Sauce Labs Backpack |
    And the cart badge should show "1"

  Scenario: Continue shopping returns to Products
    When the user clicks Continue Shopping
    Then the Products page should be displayed

  Scenario: Checkout is enabled when cart is not empty
    Then the Checkout button should be enabled
