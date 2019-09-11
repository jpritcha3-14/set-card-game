var deck = [];

function populateCards() {
    randomizeDeck()
    var grid = document.getElementById("cardsOnTable");
    for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 3; c++) {
            var image_tag = '<img src="cards/'.concat(deck.pop().toString(), '.png">');
            grid.rows[r].cells[c].innerHTML = image_tag; 
        }
    }
}

function randomizeDeck() {
    for (var i = 0; i < 81; i++) {
        deck.push(i) 
    }
    
    for (var idx = 0; idx < deck.length; idx++) {
        swapIdx = idx + Math.floor(Math.random() * (deck.length - idx));

        var tmp = deck[idx];
        deck[idx] = deck[swapIdx];
        deck[swapIdx] = tmp;
    }
}


function selectCard(elmnt) {
    elmnt.style.border = "5px solid black"
}


