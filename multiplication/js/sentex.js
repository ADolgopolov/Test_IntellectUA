var QuestionBtn, StatusBar, ProgressBar, MasteryBarSuccess, MasteryBarDanger, MarkRuler, ModalAudioTeg, workDicArray = [],
  currentQuestion_n, firstTimeClick = !0,
  allAnswers = 0,
  wrongAnswers = 0,
  rightAnsersSuborder = 0,
  strTrueAnswer, wordAnserArr = [],
  WORD_AMOUNT = 0,
  ALL_word_in_exersice;

function getRandomNumber(a) {
  return Math.floor(Math.random() * a)
}

function getRandomGoodMark() {
  if (1 < allAnswers && 1 == rightAnsersSuborder) return str_mark[getRandomNumber(str_mark.length)];
  var a = StatusBar.innerHTML;
  do var b = str_goodmark[getRandomNumber(str_goodmark.length)]; while (b === a);
  return b
}

function getRandomBadMark() {
  var a = StatusBar.innerHTML;
  do var b = str_bedmark[getRandomNumber(str_bedmark.length)]; while (b === a);
  return b
}

function writeIn(a, b, c) {
  a.innerHTML = a.clientWidth > b ? c : ""
}

function showMsgStatusBar(a) {
  StatusBar.innerHTML = a;
  if (0 < allAnswers) {
    a = allAnswers - wrongAnswers;
    var b = Math.round(workDicArray.length / ALL_word_in_exersice * 1E4) / 100,
      c = 1 - b / 100,
      d = Math.round(wrongAnswers / allAnswers * 1E4) / 100;
    MasteryBarDanger.style.width = d * c + "%";
    MasteryBarSuccess.style.width = (100 - d) * c + "%";
    ProgressBar.style.width = b + "%";
    writeIn(MasteryBarSuccess, 16, a + str_true);
    writeIn(MasteryBarDanger, 16, wrongAnswers + str_not_true);
    writeIn(ProgressBar, 8, workDicArray.length + str_lost)
  } else MasteryBarSuccess.style.width =
    "0%", MasteryBarDanger.style.width = "0%", ProgressBar.style.width = "100%", writeIn(MasteryBarSuccess, 16, ""), writeIn(MasteryBarDanger, 16, ""), writeIn(ProgressBar, 8, str_WordsAmount + workDicArray.length)
}

function btnDown() {
  for (allAnswers += 1; btnBlock.firstChild;) btnBlock.removeChild(btnBlock.firstChild);
  this.value === wordAnserArr[0] ? (rightAnsersSuborder += 1, wordAnserArr.length = 0, showMsgStatusBar(getRandomGoodMark()), setTimeout(initWriter, 500, currentQuestion_n)) : (rightAnsersSuborder = 0, wrongAnswers += 1, showMsgStatusBar(str_Need + "<button>" + wordAnserArr[0] + "</button> <br>" + getRandomBadMark()), StatusBar.style.color = "rgb(255, 0, 0)", setTimeout(outPutBtns, 1E3))
}

function outPutBtns() {
  for (var a, b = [], c = 0; c < wordAnserArr.length; c++) a = document.createElement("input"), a.className = "btnChar", a.type = "button", a.value = wordAnserArr[c], a.onclick = btnDown, b.push(a);
  for (; 0 < b.length;) a = getRandomNumber(b.length), btnBlock.appendChild(b[a]), b.splice(a, 1)
}

function initWriter(a) {
  ~a && workDicArray.splice(currentQuestion_n, 1);
  showMsgStatusBar("&nbsp;");
  if (0 == workDicArray.length) document.getElementById("topheader").innerHTML = str_Rest_and_try_late, QuestionBtn.innerHTML = str_Fine, StatusBar.innerHTML = str_All_tsks_done, ProgressBar.style.width = "100%", ProgressBar.innerHTML = "", MarkRuler.style.display = "block";
  else {
    currentQuestion_n = getRandomNumber(workDicArray.length);
    QuestionBtn.innerHTML = workDicArray[currentQuestion_n][trans];
    for (wordAnserArr.push(workDicArray[currentQuestion_n].eng); 6 >
      wordAnserArr.length;) a = ((1 + getRandomNumber(9)) * (1 + getRandomNumber(9))).toString(), ~wordAnserArr.indexOf(a) || wordAnserArr.push(a);
    outPutBtns()
  }
}

function soundClick() {
  ModalAudioTeg.play();
  QuestionBtn.innerHTML == str_Fine && alert("\u0411\u0443\u043b\u043e \u043f\u043e\u043c\u0438\u043b\u043e\u043a: " + wrongAnswers)
}
window.onload = function() {
  QuestionBtn = document.getElementById("question");
  StatusBar = document.getElementById("statusbar");
  ProgressBar = document.getElementById("progressBar");
  MasteryBarSuccess = document.getElementById("masteryBarSuccess");
  MasteryBarDanger = document.getElementById("masteryBarDanger");
  MarkRuler = document.getElementById("markRuler");
  ModalAudioTeg = document.getElementById("media");
  ModalAudioTeg = new Audio("../mp3/thinking.mp3");
  var a = mt.dicArrey;
  if (0 < WORD_AMOUNT)
    for (var b, c = 0; c < WORD_AMOUNT; c++) b =
      getRandomNumber(a.length), workDicArray.push(a[b]), a.splice(b, 1);
  else workDicArray = a.slice(0);
  ALL_word_in_exersice = workDicArray.length;
  ProgressBar.innerHTML = str_Words_Amount + ALL_word_in_exersice;
  initWriter(-1)
};