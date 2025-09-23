@e2e @checkout
Feature: End-to-end checkout flow

  Scenario: STANDARD user buys two products successfully
    Given the user is logged into SauceDemo as "STANDARD"

    And the user has the following products in the cart:
      | Sauce Labs Backpack |
      | Sauce Labs Bike Light |

    And the user opens the Cart page
    Then the cart should list exactly:
      | Sauce Labs Backpack |
      | Sauce Labs Bike Light |
    And the cart badge should equal the number of cart items
    And the Checkout button should be enabled

    Given the user proceeds to Checkout
    When the user submits the Information form with:
      | first | John  |
      | last  | Doe   |
      | zip   | 90210 |

    Then the Overview page should be displayed
    When the user clicks Finish

    Then the Finish page should be displayed
    And the Thank You message should be visible
    When the user returns to Products
    Then Products page should be visible
