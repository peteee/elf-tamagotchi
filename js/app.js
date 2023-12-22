console.log("Cup of coffee ☕");

const elf = document.getElementById("elf");

const leftLeg = document.getElementById("left-leg");
const rightLeg = document.getElementById("right-leg");

const speechBubble = document.getElementById("speech-bubble");
const roundMouth = document.getElementById("round-mouth");
const flatMouth = document.getElementById("flat-mouth");

const walkingElf = () => {
    elf.classList.toggle("move-me");
    leftLeg.classList.toggle("walk");
    rightLeg.classList.toggle("walk");
}
walkingElf();


/**
 * Speech Recognition
 */

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
var recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = (event) => {
    const receivedText = event.results[0][0].transcript;
    recognition.stop();
    console.log(receivedText);
    // if (receivedText === "hello") {
    //     speakThis("Hello to you too!");
    // }
    parseMsg(receivedText);
};

/**
 * Speech Synth
 */
const speakThis = (msg) => {
    const utterance = new SpeechSynthesisUtterance(msg);
    utterance.pitch = .7; // high or low
    utterance.rate = 1.1; // speed
    speechSynthesis.speak(utterance);
    

    // rise mood level
    mood = 1.2;

    //mouth animation
    roundMouth.classList.add("speak");
    let wordCount = msg.split(" ").length;
    let speakTimer = wordCount * 500;

    setTimeout(function() { 
        roundMouth.classList.remove("speak");
        
        //speechBubble.innerHTML = "";
        setTimeout(() => { speechBubble.style.opacity = "0"; }, 1500);

    }, speakTimer) //dynamic timer using our wordCount * 500 
    console.log("Elf says: " + msg);
}


/**
 * Input field (alternative)
 */

const msgInput = document.getElementById("msg-input");

function patternTest(regex, msg) {
    let result = regex.test(msg);
    return result;
}

//let myJsonStuff;
async function callJSONData(msg) {
    const response = await fetch("data/data.json");
    const jsonData = await response.json();
    console.log(jsonData);
    //myJsonStuff = jsonData;
    if(jsonData.length !== 0) {
        jsonData.forEach((item, index) => {
 
            // regex 
            //let pattern = /favorite song|show/gi;
            let regex = new RegExp(item.question, "gi");
            if(patternTest(regex, msg)) {
                
                let randomize = Math.floor(Math.random() * item.answer.length)
                console.log("match: " + item.answer[randomize] );
                speakThis(item.answer[randomize]);
                speechBubble.innerHTML = item.answer[randomize];
                speechBubble.style.opacity = "1";

            };

        });
        //.queries[2].answer[2]

    }
}

const parseMsg = (msg) => {
    msgInput.value = null;
    //msgInput.value = "";
    console.log(msg);
    //msg = msg.toLowerCase();
    
    callJSONData(msg);
    
    
    // if(pattern.test(msg)) {
    //     speakThis("Ok let's turn on the radio");
    // }


    
};


let mood = 1; //neutral
let isHungry = false;
let isBored = false;
let hungryRando = 0;
let boredRando = 0;

const boredDisplay = document.getElementById("bored");
const hungryDisplay = document.getElementById("hungry");

/**
 * Update-Loop
 */
setInterval(() => {
    //console.log(elf.getBoundingClientRect().x);
    console.log("mood: " + mood);

    mood /= 1.005;
    //mood = mood / 1.005;

    // Hunger
    console.log(hungryRando + " : " + isHungry);
    if(hungryRando == 9) {
        isHungry = true;
        hungryDisplay.style.display = "block";
    } else {
        hungryRando = Math.floor(Math.random() * 20);
    }

    // Boredom
    console.log(boredRando + " : " + isBored);
    if(boredRando == 17) {
        isBored = true;
        boredDisplay.style.display = "block";
    } else {
        boredRando = Math.floor(Math.random() * 50);
    }

    if(mood < 0.7) {
        roundMouth.style.opacity = "0";
        flatMouth.style.display = "block";
    }

    if(mood < 0.45) {
        roundMouth.classList.add("sad");
        roundMouth.style.opacity = "1";
        flatMouth.style.display = "none";
    }
    if(mood >= 1) {
        roundMouth.style.opacity = "1";
        flatMouth.style.display = "none";
        roundMouth.classList.remove("sad");
    } 


}, 500);



/**
 * Homework: add your own data to data.json (questions & answers)
 */

/**
 * TODO :
 * - update loop / setInterval(() => { // do stuff }, 1000);
 * - mood factor - happy or sad | (plus random events);
 * - storage: record & repeat information (Learn Button)
 * - Play & Food button + Actions
 */

/**
 * DONE : 
 * - walking / moving left & right (animation CSS & JS trigger)
 */
