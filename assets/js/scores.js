var highscoresList = document.getElementById("highscores");
var data = JSON.parse(localStorage.getItem("highScores"));
for (
    var index = 0; index < data.length; index++) {
    var HighscoreListItem = document.createElement("li");
    HighscoreListItem.innerText = data[index].name +": "+ data[index].score;
    highscoresList.append(HighscoreListItem);
    var clearBtn = document.getElementById("clear");
    clearBtn.addEventListener("click", function(){
    highscoresList.innerText = " ";
    HighscoreListItem.innerText = " ";
    localStorage.clear();
});
}