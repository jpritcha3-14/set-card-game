var deck = [];
var on_table = []; // unique number (0 - 80) for each card
var selected = []; // indicies (0 - 11 or 14) of selected cards in on_table

function populateCards() {
    initializeDeck()
    var grid = document.getElementById("cardsOnTable");
    for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 3; c++) {
            var card_num = deck.pop();
            var image_tag = '<img src="cards/'.concat(card_num.toString(), '.png">');
            grid.rows[r].cells[c].innerHTML = image_tag; 
            on_table.push(card_num);
        }
    }
    console.log(on_table)
}

function initializeDeck() {
    for (var i = 0; i < 81; i++) {
        deck.push(i);
    }
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

    // Check if loc already in selected array (-1 if not)
    var select = selected.indexOf(loc);

    // Deselect card
    if (select >= 0) {
        selected.splice(select, 1);
        elmnt.style.border = "5px solid grey";
    // Select card
    } else if (select < 0 && selected.length < 3) {
        selected.push(loc); 
        elmnt.style.border = "5px solid black";
        if (selected.length == 3) {
            checkSet();
        } 
    }
}

function replaceCards(cardIdxs) {
    for (var i = 0; i < cardIdxs.length; i++) {
        var new_card = deck.pop();
        var image_tag = '<img src="cards/'.concat(new_card.toString(), '.png">');
        var cellid = "cell".concat(cardIdxs[i].toString); 
        var cell = document.getElementById("cell".concat(cardIdxs[i].toString()));
        on_table.splice(cardIdxs[i], 1, new_card)         
        cell.innerHTML = image_tag;
        cell.style.border = "5px solid grey";
    }
    selected = [];
}

function checkSet() {
    document.getElementById("prevColumn").style.visibility = "visible";
    var stat = document.getElementById("setStatus")
    var color = [];
    var number = [];
    var shape = [];
    var shading = [];

    // Selected contains indicies of the selected cards on the table,
    // possible_set maps these indicies to the actual card numbers
    var possible_set = selected.map(x => on_table[x]);
    for (var idx in possible_set) {
        color.push(getColor(possible_set[idx]));
        number.push(getNumber(possible_set[idx]));
        shape.push(getShape(possible_set[idx]));
        shading.push(getShading(possible_set[idx]));
        var image_tag = '<img src="cards/'.concat(possible_set[idx].toString(), '.png">');
        document.getElementById("ps".concat(idx.toString())).innerHTML = image_tag;
    }
    const features = [ 
        arrSum(color) % 3,
        arrSum(number) % 3,
        arrSum(shape) % 3,
        arrSum(shading) % 3,
    ];
    const names = {0:"color", 1:"number", 2:"shape", 3:"shading"};
    reasons = document.getElementById("reasons");
    reasons.innerHTML = "";
    if (arrSum(features) == 0) {
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


/* Code for shwoing 4th row
        var row4 = document.getElementById("r4");
        row4.style.visibility = "visible";
        row4.cells[0].style.background = "white";
 */
