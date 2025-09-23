Feature: SauceDemo Login

  Scenario: Successfully logged in with Standard User
    Given user accesses SauceDemo on desktop
    When user logs in as "STANDARD"
    Then Products page should be visible

  Scenario: Unsuccessfully logged in with Locked Out User
    Given user accesses SauceDemo on desktop
    When user logs in as "LOCKED"
    Then error banner should contain "locked out"

  Scenario: Successfully logged in with Problem User
    Given user accesses SauceDemo on desktop
    When user logs in as "PROBLEM"
    Then Products page should be visible

  Scenario: Successfully logged in with Performance Glitch User
    Given user accesses SauceDemo on desktop
    When user logs in as "PERF"
    Then Products page should be visible

  Scenario: Successfully logged in with Error User
    Given user accesses SauceDemo on desktop
    When user logs in as "ERROR"
    Then Products page should be visible

  Scenario: Successfully logged in with Visual User
    Given user accesses SauceDemo on desktop
    When user logs in as "VISUAL"
    Then Products page should be visible
