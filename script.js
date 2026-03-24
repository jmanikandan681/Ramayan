const questions = [
    {
    question: "1. Who is the author of Ramayana?",
    options: ["Ved Vyasa", "Valmiki", "Tulsidas", "Kalidasa"],
    answer: 1
  },
  {
    question: "2. Who was Ravana’s brother who supported Rama?",
    options: ["Indrajit", "Kumbhakarna", "Vibhishana", "Ahiravana"],
    answer: 2
  },
  {
    question: "3. What was the name of Hanuman’s mother?",
    options: ["Anjana", "Kausalya", "Sumitra", "Kaikeyi"],
    answer: 0
  },
  {
    question: "4. Who killed Indrajit (Meghnad)?",
    options: ["Rama", "Lakshmana", "Hanuman", "Sugriva"],
    answer: 1
  },
  {
    question: "5. Who helped Rama find Sita?",
    options: ["Sugriva", "Hanuman", "Jambavan", "All of the above"],
    answer: 3
  },
  {
    question: "6. What is the name of Ravana’s kingdom?",
    options: ["Ayodhya", "Lanka", "Mithila", "Hastinapura"],
    answer: 1
  },
  {
    question: "7. Who was responsible for Rama’s exile?",
    options: ["Kaikeyi", "Kausalya", "Sumitra", "Sita"],
    answer: 0
  },
  {
    question: "8. Who accompanied Rama during exile?",
    options: ["Bharata", "Shatrughna", "Lakshmana", "None"],
    answer: 2
  },
  {
    question: "9. Who was Jatayu’s brother?",
    options: ["Sugriva", "Sampati", "Angada", "Bali"],
    answer: 1
  },
  {
    question: "10. What was the name of the forest where Rama lived in exile?",
    options: ["Dandakaranya Forest", "Naimisha Forest", "Kamyaka Forest", "Vrindavan"],
    answer: 0
  }
];
console.log(questions.length); 
let currentQ = 0;
let score = 0;
let answered = false;
let timeLeft = 10;
let timer;

const timerEl = document.getElementById("timer");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreDisplay = document.getElementById("scoreDisplay");
const nextBtn = document.getElementById("nextBtn");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const bgMusic = document.getElementById("bgMusic");

function startMusic() {
    bgMusic.volume = 0.3;

    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
        playPromise.catch(() => {
            console.log("Autoplay blocked");
        });
    }
}
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });

function startTimer() {
    console.log("Timer started");
    timeLeft = 10;
    timerEl.innerText = "Time: " + timeLeft;

    clearInterval(timer); // 🔥 important safety

    timer = setInterval(() => {
        timeLeft--;
        console.log("Tick", timeLeft);
        timerEl.innerText = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            autoNext();
        }
    }, 1000);
}

function loadQuestion() {
    answered = false;
nextBtn.disabled = false;
    const q = questions[currentQ];
    questionEl.innerText = `Q${currentQ + 1}. ${q.question}`;
    scoreDisplay.innerText = `Score: ${score}/${questions.length}`;
    optionsEl.innerHTML = "";

    q.options.forEach((opt, index) => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.innerText = opt;

        div.onclick = () => selectAnswer(div, index);
        optionsEl.appendChild(div);
    });
    startTimer();
}

function selectAnswer(selected, index) {
    clearInterval(timer);
    if (answered) return;
    answered = true;

    const correctIndex = questions[currentQ].answer;
    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach((opt, i) => {
        if (i === correctIndex) opt.classList.add("correct");
    });

    if (index === correctIndex) {
       correctSound.currentTime = 0;
        correctSound.play().catch(() => {});
        showFlowers(); // 🌸 animation
        score++;
        scoreDisplay.innerText = `Score: ${score}/${questions.length}`;
    } else {
        selected.classList.add("wrong");
        wrongSound.currentTime = 0; // reset
        wrongSound.play().catch(() => {});
    }
}

nextBtn.onclick = () => {
    if (!answered) {
        alert("Please select an answer first");
        return;
    }

    clearInterval(timer);

    currentQ++;

    if (currentQ < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    document.getElementById("question-box").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");

    const total = questions.length;
    document.getElementById("score").innerText = `${score} / ${total}`;

    let msg = "";
    if (score === total) msg = "Excellent! 🎉";
    else if (score >= total / 2) msg = "Good Job 👍";
    else msg = "Try Again 🙏";

    document.getElementById("message").innerText = msg;

    // OPTIONAL AUTO REDIRECT (uncomment if needed)
    /*
    setTimeout(() => {
        window.location.href = "https://your-link.com";
    }, 5000);
    */
    document.querySelector(".cta-box").scrollIntoView({ behavior: "smooth" });
}

function autoNext() {
    if (answered) return; // ✅ prevent double run

    answered = true;

    // disable Next button temporarily
    nextBtn.disabled = true;

    setTimeout(() => {
        currentQ++;

        if (currentQ < questions.length) {
            nextBtn.disabled = false; // enable again
            loadQuestion();
        } else {
            showResult();
        }
    }, 500);
}

function redirect() {
    bgMusic.pause();
    bgMusic.currentTime = 0;

    window.location.href = "https://forms.gle/VUWrNBBZWtuPRqj69";
}

document.getElementById("startBtn").onclick = () => {
    startMusic();

    document.getElementById("startBtn").style.display = "none";
    document.getElementById("question-box").classList.remove("hidden");

    loadQuestion();
};    ;
function showFlowers() {
    const container = document.getElementById("flower-container");

    for (let i = 0; i < 30; i++) {
        const flower = document.createElement("div");
        flower.classList.add("flower");

        flower.innerText = ["🌸","🌼","🌺","🌻"][Math.floor(Math.random()*4)];; // you can change emoji

        flower.style.left = Math.random() * 100 + "vw";
        flower.style.animationDuration = (1 + Math.random()) + "s";

        container.appendChild(flower);

        // remove after animation
        setTimeout(() => {
            flower.remove();
        }, 2000);
    }
}
