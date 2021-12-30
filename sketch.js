let compoundNouns
let answer;
let nouns;
let guess = "";

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
    select("#skip-button").mousePressed(() => {guess = answer; cheated = true;draw()});

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

    push();
    translate(width/2, height/2)

    background("#86626E");

    textFont("Raleway Dots");

    if (finished) {
        textSize(100);
        fill("#fff");
        text("Your score is " + score + "/" + index, 0, 0);
        select("#submit-button").hide();
        select("#skip-button").hide();
        pop();
        return;
    }

    if (index > 0) {
        fill("#fff");
        textSize(50);
        text(score + "/" + index, 0, -250);
    }

    noStroke();
    fill(255, 255, 255, 30);
    rect(0, 90, 1000 + shakeOffsetX, 110 + shakeOffsetY, 5);

    textSize(140);
    fill("#fff");
    text(nouns, 0, -120);

    textSize(50);
    text("means", 0, -10);
    textSize(70);

    if (guess.length > 0) {
        fill("#fff");
        text(guess, 0 + shakeOffsetX, 90 + shakeOffsetY);
    } else if (index == 0) {
        fill(255, 255, 255, 100);
        text("Type your answer", 0 + shakeOffsetX, 90 + shakeOffsetY);
    }

    pop();
}

function keyPressed() {

    if (keyCode >= 65 && keyCode <= 90 && guess.length < 15) {
        guess += key
        guess = guess.toLowerCase();
    }

    if (keyCode == 8) { // keycode equals delete
        guess = guess.slice(0, -1);
    }

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

    if (guess == answer) {
        if (!cheated) {
            score++;
        } else {
            cheated = false;
        }
        index++;
        getNouns();
        guess = "";
    } else {
        shake = true;
        loop();
    }

    draw();
}
