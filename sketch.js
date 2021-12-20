let compoundNouns
let answer;
let nouns;
let guess = "";

let index = 0;

function preload() {

    compoundNouns = loadStrings("./compound-nouns.txt");
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    rectMode(CENTER);

    compoundNouns = shuffle(compoundNouns);
    getNouns();

    select("#skip-button").mousePressed(() => {guess = answer; draw()});

    noLoop();
}

function draw() {

    push();
    translate(width/2, height/2)

    background("#86626E");

    textFont("Raleway Dots");
    textSize(140);
    noStroke();
    fill(255, 255, 255, 30);
    rect(0, 90, 1000, 110, 5);
    fill("#fff");
    text(nouns, 0, -120);
    textSize(70);

    if (guess.length > 0) {
        fill("#fff");
        text(guess, 0, 90);
    } else if (index == 0) {
        fill(255, 255, 255, 100);
        text("Press enter to submit answer", 0, 90);
    }

    pop();
}

function keyPressed() {

    if (keyCode >= 65 && keyCode <= 90 && guess.length < 15) {
        guess += key
        guess = guess.toLowerCase();
    }

    if (keyCode == 8) {
        guess = guess.slice(0, -1);
    }

    if (keyCode == 13) {
        if (guess == answer) {
            index++;
            getNouns();
            guess = "";
        }
    }

    draw();
}

function getNouns() {

    let phrase = compoundNouns[index];
    phrase = phrase.split("=");

    answer = phrase[0];
    nouns = phrase[1];
}
