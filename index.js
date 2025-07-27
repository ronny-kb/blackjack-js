// Game vars
let cards = [];
let sum;
// bool flags
let hasBlackJack = false;
let continueGame = true;
let message = "";

// Displayed elements
// Player elements
let messageEl = document.getElementById("message-el");
let sumEl = document.querySelector("#player-sum-el");
let cardsEl = document.getElementById("player-cards-el");
let playerEl = document.getElementById("player-el")
// Dealer elements
let dealerCardsEl = document.getElementById("dealer-cards-el");
let dealerSumEl = document.getElementById("dealer-sum-el");

// Betting elements
let betEl = document.getElementById("bet-el");

// Player object
let player = {
    name: "Ron",
    chips: 145
}

playerEl.textContent = player.name + ": $" + player.chips;

// Dealer vars
let dealerCards = [];
let dealerSum;
let dealerHiddenCard = null;
let dealerRevealed = false;

// Betting vars
let bet = 0;

// Update bet display
function updateBetDisplay() {
    betEl.textContent = "Bet: $" + bet;
}

// Increase bet by 5
function increaseBet() {
    if (player.chips > bet) {
        bet += 5;
        updateBetDisplay();
    }
}

// Decrease bet by 5
function decreaseBet() {
    if (bet >= 5) {
        bet -= 5;
        updateBetDisplay();
    }
}

// Game logic
function startGame() {
    // Only start if bet is placed
    if (bet === 0 || bet > player.chips) {
        messageEl.textContent = "Place a valid bet to start!";
        return;
    }
    // reset game state
    continueGame = true;
    hasBlackJack = false;
    cards = [];
    sum = 0;
    dealerCards = [];
    dealerSum = 0;
    dealerHiddenCard = null;
    dealerRevealed = false;

    // Subtract bet from chips
    player.chips -= bet;
    playerEl.textContent = player.name + ": $" + player.chips;

    // Initial deal: 2 cards each
    cards.push(genRandomCard());
    cards.push(genRandomCard());
    sum = getHandSum(cards);

    dealerCards.push(genRandomCard());
    dealerHiddenCard = genRandomCard();
    dealerCards.push(dealerHiddenCard);
    dealerSum = getHandSum([dealerCards[0]]); // Only show first card

    renderGame();
}

// Render game state to UI
function renderGame() {
    // Update text
    sumEl.textContent = "Sum: " + sum;
    cardsEl.textContent = "Cards: " + cards.join(", ");

    // Dealer display
    if (!dealerRevealed) {
        dealerCardsEl.textContent = "Cards: " + dealerCards[0] + ", [Hidden]";
        dealerSumEl.textContent = "Sum: " + dealerCards[0];
    } else {
        dealerCardsEl.textContent = "Cards: " + dealerCards.join(", ");
        dealerSumEl.textContent = "Sum: " + getHandSum(dealerCards);
    }

    // Game messages
    if (!dealerRevealed) {
        if (sum < 21) {
            message = "Do you want to draw a new card or stand?";
        } else if (sum === 21) {
            message = "You've got Blackjack! Stand to see dealer.";
            hasBlackJack = true;
        } else {
            message = "You're out of the game!";
            continueGame = false;
            stand(); // auto stand if bust
        }
    } else {
        // After dealer reveals
        let outcome = determineOutcome();
        message = outcome.message;
        if (outcome.payout !== 0) {
            player.chips += outcome.payout;
            playerEl.textContent = player.name + ": $" + player.chips;
        }
    }
    messageEl.textContent = message;
    updateBetDisplay();
}

// get a new card, push to cards, update sum
function newCard() {
    if (continueGame && !hasBlackJack && !dealerRevealed) {
        let card = genRandomCard();
        cards.push(card);
        sum = getHandSum(cards);
        renderGame();
        if (sum > 21) {
            continueGame = false;
            stand(); // auto stand if bust
        }
    }
}

// Stand function
function stand() {
    if (!dealerRevealed) {
        dealerRevealed = true;
        dealerSum = getHandSum(dealerCards);
        dealerPlay();
        renderGame();
    }
}

// Dealer logic
function dealerPlay() {
    // Dealer reveals hidden card, then hits until 17+
    dealerSum = getHandSum(dealerCards);
    while (dealerSum < 17) {
        let card = genRandomCard();
        dealerCards.push(card);
        dealerSum = getHandSum(dealerCards);
    }
}

// Outcome logic
function determineOutcome() {
    let playerSum = getHandSum(cards);
    let dealerFinalSum = getHandSum(dealerCards);
    let payout = 0;
    let msg = "";

    if (playerSum > 21) {
        msg = "You busted! Dealer wins.";
    } else if (dealerFinalSum > 21) {
        msg = "Dealer busted! You win!";
        payout = bet * 2;
    } else if (playerSum === 21 && cards.length === 2) {
        msg = "Blackjack! You win 3:2!";
        payout = Math.floor(bet * 2.5);
    } else if (playerSum > dealerFinalSum) {
        msg = "You win!";
        payout = bet * 2;
    } else if (playerSum < dealerFinalSum) {
        msg = "Dealer wins!";
    } else {
        msg = "Push! Bet returned.";
        payout = bet;
    }
    bet = 0; // Reset bet for next round
    return { message: msg, payout: payout };
}

// Utility: sum hand, handle aces
function getHandSum(hand) {
    let sum = 0;
    let aces = 0;
    for (let card of hand) {
        if (card === 11) aces++;
        sum += card;
    }
    while (sum > 21 && aces > 0) {
        sum -= 10;
        aces--;
    }
    return sum;
}

// Generate random card
function genRandomCard() {
    // get a card between 1-13 inclusive
    // 2-9 number cards, face cards 10, ace is 1 or 11
    const card = Math.floor(Math.random() * 13) + 1;
    if (card > 10) return 10;
    else if (card === 1) return 11;
    return card;
}