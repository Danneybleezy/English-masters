let current = 0;
let score = 0;
let userAnswers = [];
let userName = "";

const root = document.getElementById("root");

function startPage() {
  root.innerHTML = `
    <h1>English Masters CBT</h1>
    <div style="text-align:center">
      <input id="nameInput" placeholder="Enter your name" style="padding:10px; width:60%; margin-bottom:10px" />
      <br/>
      <button onclick="startTest()" style="background:#2563eb; color:white">Start Test</button>
    </div>
  `;
}

function startTest() {
  const nameInput = document.getElementById("nameInput");
  if (!nameInput.value.trim()) { alert("Please enter your name"); return; }
  userName = nameInput.value.trim();
  current = 0; score = 0; userAnswers = [];
  showQuestion();
}

function showQuestion() {
  if (current >= questions.length) { showResults(); return; }
  const q = questions[current];
  root.innerHTML = `
    <h2>Question ${current+1} of ${questions.length}</h2>
    <p>${q.question}</p>
    <div id="options"></div>
    <div style="margin-top:20px; text-align:center">
      <button onclick="endTest()" style="background:#f56565; color:white">End Test</button>
    </div>
  `;
  const optionsDiv = document.getElementById("options");
  q.options.forEach((opt, i) => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(i);
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(choice) {
  const q = questions[current];
  const options = document.querySelectorAll(".option");
  options.forEach((opt,i)=>{
    opt.onclick = null;
    if (i === q.answer) opt.classList.add("correct");
    if (i === choice && choice !== q.answer) opt.classList.add("wrong");
  });
  userAnswers.push({qnum: current+1, your: choice, correct: q.answer});
  if (choice === q.answer) score++;
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.style.background = "#2563eb";
  nextBtn.style.color = "white";
  nextBtn.onclick = () => { current++; showQuestion(); };
  root.appendChild(nextBtn);
}

function endTest() { showResults(); }

function showResults() {
  let attempted = userAnswers.length;
  root.innerHTML = `
    <h1>Results</h1>
    <h3>Name: ${userName}</h3>
    <p>Score: ${score} / ${questions.length} (${((score/questions.length)*100).toFixed(1)}%)</p>
    <p>Attempted: ${attempted} / ${questions.length}</p>
    <div style="text-align:center">
      <button onclick="startPage()" style="background:#2563eb; color:white">Home</button>
      <button onclick="startTest()" style="background:#16a34a; color:white">Retake</button>
    </div>
    <h2>Review</h2>
    <table>
      <tr><th>Q#</th><th>Your Answer</th><th>Correct Answer</th></tr>
      ${userAnswers.map(a=>{
        const yourAns = a.your===undefined? "-" : questions[a.qnum-1].options[a.your];
        const corrAns = questions[a.qnum-1].options[a.correct];
        const mark = a.your===a.correct? "✅":"❌";
        return `<tr><td>${a.qnum}</td><td>${yourAns||"-"} ${mark}</td><td>${corrAns}</td></tr>`;
      }).join("")}
    </table>
  `;
}

startPage();