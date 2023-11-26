let compoundNouns
let answer;
let nouns;

let index = 0;

let score = 0;
let cheated = false;
let finished = false;

let shakeOffsetX = 0;
let shakeOffsetY = 0;
let shakeTimer = 0;
let shake;

function preload() {

    compoundNouns = loadStrings("./compound-nouns.txt");
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    rectMode(CENTER);

    compoundNouns.pop();
    compoundNouns = shuffle(compoundNouns);
    getNouns();

    select("#submit-button").mousePressed(() => {makeGuess()});
    select("#skip-button").mousePressed(() => {cheat()});

    document.addEventListener("input", function(e) {
      var input = this.querySelector("input[name=input-field]");
      var not = input.value.match(/[^a-z]+/g);
      if (not) {
        not.forEach(function(text) {
          input.value = input.value.replace(text, "")
        })
      }
    })

    document.getElementById("input-field").focus();

    // select("#discord-button").hide();

    noLoop();
}

function draw() {

    if (shakeTimer > 12) {
        shake = false;
        shakeTimer = 0;
        shakeOffsetX = 0;
        shakeOffsetY = 0;
        noLoop();
    }

    if (shake) {
        shakeTimer++;
        shakeOffsetX = random(-2, 2);
        shakeOffsetY = random(-2, 2);
    }

    select("#input-field").position(width/2 + shakeOffsetX, height/2 + shakeOffsetY);

    push();
    translate(width/2, height/2)

    background("#86626E");

    textFont("Raleway Dots");

    if (finished) {
        textSize(100);
        fill("#fff");
        text("Your score is " + score + "/" + index, 0, 0);
        textSize(25);
        // text("(P.S. Got any suggestions? Join our discord!)\n", 0, 50);
        select("#submit-button").hide();
        select("#skip-button").hide();
        select("#input-field").hide();
        // select("#discord-button").show();
        pop();
        return;
    }

    if (index > 0) {
        fill("#fff");
        textSize(50);
        text(score + "/" + index, 0, -250);
    }

    // noStroke();
    // fill(255, 255, 255, 30);
    // rect(0 + shakeOffsetX, 90 + shakeOffsetY, 1000, 110, 5);

    textSize(140);
    fill("#fff");
    text(nouns, 0, -120);

    textSize(50);
    text("means", 0, -10);
    textSize(70);

    // if (guess.length > 0) {
    //     fill("#fff");
    //     text(guess, 0 + shakeOffsetX, 90 + shakeOffsetY);
    // } else if (index == 0) {
    //     fill("#300010");
    //     text("Type your answer", 0 + shakeOffsetX, 90 + shakeOffsetY);
    // }

    pop();
}

function mouseReleased() {

    document.getElementById("input-field").focus();
}

function keyPressed() {

    // if (keyCode >= 65 && keyCode <= 90 && guess.length < 15) {
    //     guess += key
    //     guess = guess.toLowerCase();
    // }

    // if (keyCode == 8) { // keycode equals delete
    //     guess = guess.slice(0, -1);
    // }

    if (keyCode == 13) {
        makeGuess();
    }

    draw();
}

function getNouns() {

    if (index == compoundNouns.length) {
        finished = true;
        return;
    }

    let phrase = compoundNouns[index];
    phrase = phrase.split("=");

    answer = phrase[0];
    nouns = phrase[1];
}

function makeGuess() {

    if (select("#input-field").value() == answer) {
        if (!cheated) {
            score++;
        } else {
            cheated = false;
        }
        index++;
        getNouns();
        select("#input-field").value("");
        document.getElementsByName("input-field")[0].placeholder="";
    } else {
        shake = true;
        loop();
    }

    draw();
}

function cheat() {

    select("#input-field").value(answer);
    cheated = true;
    draw();
}
