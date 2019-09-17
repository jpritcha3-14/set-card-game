var deck = [];
var on_table = []; // unique number (0 - 80) for each card
var selected = []; // indicies (0 - 11 or 14) of selected cards in on_table

var start_time = 0;
var final_time = null;
var timer = document.getElementById("timer");
const pad2 = num => num.toString().padStart(2, '0');
var update_timer = setInterval(function() {
    if (final_time === null)  {
        var now = new Date().getTime();
        var total_time = now - start_time;
        var seconds = Math.floor(total_time / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var time = pad2(hours) + ":" + pad2(minutes % 60) + ":" + pad2(seconds % 60);
        timer.innerHTML = time;
    } else {
        timer.style.color = "blue";
        timer.innerHTML = final_time;
    }
}, 1000);

function startGame() {
    initializeDeck();
    for (var i = 0; i < 81 - 15; i++) {
        deck.pop()
    }
    dealCards();
    updateDeckCount();
    final_time = null;
    start_time = new Date().getTime();
    timer.style.color = "black";
    timer.innerHTML = "00:00:00";
    
}

function dealCards() {
    var grid = document.getElementById("cardsOnTable");
    for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 3; c++) {
            var card_num = deck.pop();
            var image_tag = '<img src="cards/'.concat(card_num.toString(), '.png">');
            grid.rows[r].cells[c].style.visibility = "visible"; 
            grid.rows[r].cells[c].innerHTML = image_tag; 
            on_table.push(card_num);
        }
    }
}

function updateDeckCount() {
    document.getElementById("deckCount").innerHTML = 
        "Cards in Deck: ".concat(deck.length.toString());
}

function initializeDeck() {
    deck = [];
    on_table = [];
    selected = [];
    var notification = document.getElementById("notification");
    notification.setAttribute("onClick", "");
    notification.innerHTML = "SET";
    notification.style.color = "#bfbfbf";
    for (var i = 0; i < 81; i++) {
        deck.push(i);
    }
    document.getElementById("deck").style.visibility = "visible";
    shuffleDeck();
}

function shuffleDeck() {
    for (var idx = 0; idx < deck.length; idx++) {
        swapIdx = idx + Math.floor(Math.random() * (deck.length - idx));
        var tmp = deck[idx];
        deck[idx] = deck[swapIdx];
        deck[swapIdx] = tmp;
    }
}

function selectCard(elmnt, loc) {
    document.getElementById("notification").style.color = "#bfbfbf";
    
    // Check if loc already in selected array (-1 if not)
    var select = selected.indexOf(loc);

    // Deselect card
    if (select >= 0) {
        selected.splice(select, 1);
        elmnt.style.border = "5px solid #bfbfbf";
    // Select card
    } else if (select < 0 && selected.length < 3) {
        selected.push(loc); 
        elmnt.style.border = "5px solid black";
        if (selected.length == 3) {
            checkSelectedSet();
        } 
    }
}

function replaceCards(cardIdxs) {
    var deckLogo = document.getElementById("deck");
    if (deck.length > 0) {
        for (var i = 0; i < cardIdxs.length; i++) {
            var new_card = deck.pop();
            var image_tag = '<img src="cards/'.concat(new_card.toString(), '.png">');
            var cellid = "cell".concat(cardIdxs[i].toString); 
            var cell = document.getElementById("cell".concat(cardIdxs[i].toString()));
            on_table.splice(cardIdxs[i], 1, new_card) 
            cell.innerHTML = image_tag;
            cell.style.border = "5px solid #bfbfbf";
        }
        deckLogo.style.visibility = (deck.length == 0 ? "hidden" : "visible");
    } else {
        for (var i = 0; i < cardIdxs.length; i++) {
            var cellid = "cell".concat(cardIdxs[i].toString); 
            var cell = document.getElementById("cell".concat(cardIdxs[i].toString()));
            on_table.splice(cardIdxs[i], 1, -1) 
            cell.style.border = "5px solid #bfbfbf";
        }
        for (var i = on_table.length-1; i >= 0; i--) {
            if (on_table[i] == -1) {
                on_table.splice(i, 1);
            } 
        }
        for (var i = 0; i < 12; i++) {
            var cell = document.getElementById("cell".concat(i.toString()));
            if (i < on_table.length) {
                cell.innerHTML = '<img src="cards/'.concat(on_table[i].toString(), '.png">');
            } else {
                cell.style.visibility = "hidden";
            }
        }
    }
    updateDeckCount();
    selected = [];
    checkRemaining();
}

function getFeatures(possible_set) {
    var color = [];
    var number = [];
    var shape = [];
    var shading = [];
    for (var idx in possible_set) {
        color.push(getColor(possible_set[idx]));
        number.push(getNumber(possible_set[idx]));
        shape.push(getShape(possible_set[idx]));
        shading.push(getShading(possible_set[idx]));
    }
    return features = [ 
       arrSum(color) % 3,
       arrSum(number) % 3,
       arrSum(shape) % 3,
       arrSum(shading) % 3,
    ];
}

function isSet(features) {
    return arrSum(features) == 0;
}

function checkSelectedSet() {
    document.getElementById("prevColumn").style.visibility = "visible";
    var stat = document.getElementById("setStatus")

    // Selected contains indicies of the selected cards on the table,
    // possible_set maps these indicies to the actual card numbers
    var possible_set = selected.map(x => on_table[x]);
    for (var idx in possible_set) {
        var image_tag = '<img src="cards/'.concat(possible_set[idx].toString(), '.png">');
        document.getElementById("ps".concat(idx.toString())).innerHTML = image_tag;
    }
    const names = {0:"color", 1:"number", 2:"shape", 3:"shading"};
    reasons = document.getElementById("reasons");
    reasons.innerHTML = "";
    const features = getFeatures(possible_set);
    if (isSet(features)) {
        stat.innerHTML = "Is a SET";
        stat.style.color = "green";
        replaceCards(selected);
    } else {
        stat.innerHTML = "Is not a SET";
        stat.style.color = "red";
        for (var i = 0; i < 4; i++) {
            if (features[i] > 0) {
                console.log(i)
                reasons.innerHTML += "<li>2 have same ".concat(names[i], "</li>");
            }
        }
        checkRemaining();
    }
}

function countSets(cards) {
    var count = 0;
    for (var i = 0; i < cards.length; i++) {
        for (var j = i + 1; j < cards.length; j++) {
            for (var k = j + 1; k < cards.length; k++) {
                count = (isSet(getFeatures([cards[i], cards[j], cards[k]])) ? count + 1 : count);   
            }
        }
    }
    return count;
}

function dealNewBoard() {
    var notification = document.getElementById("notification");
    notification.style.visibility = "visible";
    if (countSets(on_table) == 0) {
        deck.push(...on_table);
        on_table = [];
        shuffleDeck();
        dealCards();        
        notification.innerHTML = "12 new cards dealt";
        notification.style.color = "black";
    } else {
        notification.innerHTML = "At least one set on board";
        notification.style.color = "red";
    }
    checkRemaining();
}

function checkRemaining() {
    if (deck.length + on_table.length < 21) {
        var remaining = [];
        remaining.push(...deck);
        remaining.push(...on_table);
        console.log(remaining);
        console.log("sets remaining: ".concat(countSets(remaining).toString()));
        if (countSets(remaining) == 0) {
            var notification = document.getElementById("notification");
            notification.style.visibility = "visible";
            notification.innerHTML = "No more SETs, click here to restart";
            notification.style.color = "blue";
            notification.setAttribute("onClick", "startGame()");
            final_time = timer.innerHTML;
            timer.style.color = "blue";
        }
    }
}

const arrSum = arr => arr.reduce((a,b) => a + b, 0);


function getColor(card) {
    return Math.floor(card / 27);
}

function getNumber(card) {
    return card % 3;
}

function getShape(card) {
    return Math.floor((card % 9) / 3);
}

function getShading(card) {
    return Math.floor((card % 27) / 9);
}
