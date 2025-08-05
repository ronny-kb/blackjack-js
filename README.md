# Blackjack.js

Blackjack built with Vanilla JavaScript, HTML, and CSS. This project focuses on solid game logic, a modern UI, and a maintainable codebase.

**Live Demo:** [blackjack-rb.netlify.app](https://blackjack-rb.netlify.app/)

---

## Features

* **Classic Blackjack Rules:** Play one-on-one against an automated dealer.
* **Interactive Betting:** Increase, decrease, and place bets before each round.
* **Hit & Stand:** Make strategic decisions to build your hand.
* **Correct Payouts:** Implements standard 1:1 payouts and a 3:2 payout for a natural Blackjack.
* **Dynamic UI:** Real-time updates for messages, card sums, and chip counts.
* **Responsive Design:** Clean layout that works on both desktop and mobile devices.

---

## Tech Stack

* **HTML5:** For the core structure and content.
* **CSS3:** For modern styling, including Flexbox for layout, custom properties, and a frosted-glass modal effect with `backdrop-filter`.
* **Vanilla JavaScript:** For all game logic, state management, DOM manipulation, and event handling. No frameworks or libraries were used for the core application logic.

---

## Core Concepts Demonstrated

This project was an exercise in building a complete application from the ground up, focusing on frontend development fundamentals and best practices.

* **DOM Manipulation**
* **State Management**
* **Modular & DRY Code**
* **Event Handling**
---

## Third-Party Libraries

### Cardmeister `<playing-card>`

This project uses the excellent **Cardmeister** library to render the playing cards.

* **What it is:** A single JavaScript file that defines a custom HTML element, `<playing-card>`. It contains all 52 card SVGs embedded within it, creating them on the fly without needing to load 52 separate image files.
* **Why it was chosen:** It is incredibly lightweight (<150kb)and has zero dependencies.
* **Repository:** [https://github.com/cardmeister/cardmeister.github.io](https://github.com/cardmeister/cardmeister.github.io)

---

## How to Run Locally

1.  Clone the repository:
    ```bash
    git clone [https://github.com/ronny-kb/blackjack-js.git](https://github.com/ronny-kb/blackjack-js.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd blackjack-js
    ```
3.  Host the `index.html` file locally.

---