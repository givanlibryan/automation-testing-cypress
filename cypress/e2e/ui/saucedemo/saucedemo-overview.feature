Feature: Checkout - Overview

  Background:
    Given the user is on the Overview page with items:
      | Sauce Labs Backpack |
      | Sauce Labs Bike Light |
    # (Logged in, items added, information form completed)

  Scenario: Listed items, subtotal, tax and total are visible
    Then the Overview should list:
      | Sauce Labs Backpack |
      | Sauce Labs Bike Light |
    And the Subtotal, Tax and Total amounts should be visible

  Scenario: Finish completes the order
    When the user clicks Finish
    Then the Finish page should be displayed

  Scenario: Cancel returns to Products
    When the user clicks Cancel on the Overview page
    Then the Products page should be displayed
