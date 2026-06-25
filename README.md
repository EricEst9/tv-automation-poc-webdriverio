# Smart TV Automation PoC (YouTube App) 📺

This repository contains a Proof of Concept (PoC) for automating Smart TV applications (like Samsung Tizen or LG WebOS) using **WebdriverIO** and the **Cucumber BDD** framework.

## 🚀 Objective
Testing Smart TV applications presents unique challenges, such as closed ecosystems, missing physical keyboards, and the necessity to navigate strictly using remote control directional arrows. 

This PoC demonstrates how to:
- Spoof User-Agents and viewports to emulate a Smart TV environment (`Tizen 5.0`).
- Sync actions with the DOM rather than relying on brittle implicit waits or timeouts.
- Navigate a closed UI using remote control simulation (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`).
- Interact with custom on-screen virtual keyboards by parsing the UI grid, effectively bypassing native input restrictions.

## 🛠️ Tech Stack
- **JavaScript (Node.js)**
- **WebdriverIO** (v8)
- **Cucumber (Gherkin)** - For Business-Driven Development (BDD) readable tests.

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/EricEst9/tv-automation-poc-webdriverio.git
   cd tv-automation-poc-webdriverio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## ▶️ Execution

To run the automated TV flow, execute:
```bash
npm run test:tv
```

## 📖 BDD Scenario Structure
The tests are written in plain English using Gherkin syntax, bridging the gap between technical QA implementation and product management:

```gherkin
Feature: Smart TV Navigation
  Scenario: Search and play a video using TV remote navigation
    Given I open the YouTube TV app
    And I skip the Privacy and Sign In screens
    When I open the search bar from the sidebar
    And I type "WINDOWSIGHT" using the on-screen virtual keyboard
    Then I can navigate to the results and play the first video for 10 seconds
```
