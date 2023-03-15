var timeLimit = 75;
var intervalId;
function startQuiz() {
  var time = timeLimit;
  document.getElementById("time").innerHTML = time;
  intervalId = setInterval(function () {
    time--;
    document.getElementById("time").innerHTML = time;
    if (time === 0) {
      clearInterval(intervalId);
      endQuiz();
    }
  }, 1000);
}
function displayQuestion() {
  feedback.classList.add("hide");
  var question = questions[currQuest];
  document.getElementById("question-title").innerHTML = question.question;
  var choices = "";
  for (var i = 0; i < question.options.length; i++) {
    choices += `<button onclick="checkAnswer('${question.options[i]}')">${question.options[i]}</button>`;
  }
  document.getElementById("choices").innerHTML = choices;
}
function checkAnswer(answer) {
    feedback.innerHTML = "";
  feedback.classList.remove("hide");
  if (answer === questions[currQuest].answer) {
    feedback.innerHTML = "Correct!";
    currQuest++;
    setTimeout(function () {
      if (currQuest === questions.length) {
        endQuiz();
      } else {
        displayQuestion();
      }
    }, 500);
  } else {
    feedback.innerHTML = "Wrong!";
    timeLimit -= 10;
    clearInterval(intervalId);
    startQuiz();
  }
}
function endQuiz() {
  clearInterval(intervalId);
  document.getElementById("questions").classList.add("hide");
  document.getElementById("end-screen").classList.remove("hide");
  feedback.classList.add("hide");
  document.getElementById("final-score").innerHTML = timeLimit;
}
document.getElementById("submit").addEventListener("click", function () {
  var initials = document.getElementById("initials").value;
  var score = {
    name: initials,
    score: timeLimit,
  };
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push(score);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.href = "highscores.html";
});
document.getElementById("start").addEventListener("click", function () {
  document.getElementById("start-screen").classList.add("hide");
  document.getElementById("questions").classList.remove("hide");
  startQuiz();
  displayQuestion();
});