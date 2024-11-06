// Code

var QuestionBtn;
var PrinterDiv;
var StatusBar;
var ProgressBar;
var MasteryBarSuccess;
var MasteryBarDanger;
var MarkRuler;
//(4)
var ModalAudioTeg;

var workDicArray = [];
var currentQuestion_n;
var firstTimeClick = true;
var allAnswers = 0;
var wrongAnswers = 0;
var rightAnsersSuborder = 0;
var strTrueAnswer;
var wordAnserArr = [];
// задаємо кількість слів для тестування
// 0 - означає повністю копіюєм масив.
var WORD_AMOUNT = 20;
var ALL_word_in_exersice;


function getRandomNumber(amount) {
    "use strict";
    //
    return Math.floor(Math.random() * amount);
}

function getRandomGoodMark() {
    "use strict";
    //
    if (allAnswers >1 && rightAnsersSuborder == 1){
        return str_mark[getRandomNumber(str_mark.length)]; }
        else {  
            var newString;
            var curString = (StatusBar).innerHTML;
            //
            do {
                newString = str_goodmark[getRandomNumber(str_goodmark.length)];
            } while (newString === curString);
            return newString;
            }
}

function getRandomBadMark() {
    "use strict";
    //
    var newString;
    var curString = (StatusBar).innerHTML;
    //
    do {
        newString = str_bedmark[getRandomNumber(str_bedmark.length)];
    } while (newString === curString);
    return newString;
}

function writeIn(outPutConteiner, minWidth, text) {
  "use strict"
  //
  if (outPutConteiner.clientWidth > minWidth) { // Якщо ширина контейнера більша відзазначеної виводим текст
    outPutConteiner.innerHTML = text;
  } else { outPutConteiner.innerHTML = ""; }
}

function showMsgStatusBar(msg) {
  "use strict";
  //
  StatusBar.innerHTML = msg;

  if (allAnswers > 0) {
    var rightAnswer = allAnswers - wrongAnswers; // правильних відповідей
    var ProgresPersents = Math.round((workDicArray.length / ALL_word_in_exersice) * 10000.0) / 100;
    var multiplierForMasteryBar = 1 - (ProgresPersents / 100.0);
    if(multiplierForMasteryBar == 0) { // додаткова умова для відображення результатів на першому слові
        ProgresPersents = Math.round(((ALL_word_in_exersice-1) / ALL_word_in_exersice) * 10000.0) / 100;
        multiplierForMasteryBar = 1 - (ProgresPersents / 100.0);
      }
    var persents = Math.round((wrongAnswers / allAnswers) * 10000.0) / 100;
    MasteryBarDanger.style.width = persents * multiplierForMasteryBar + "%";
    MasteryBarSuccess.style.width = (100.0 - persents) * multiplierForMasteryBar + "%";
    ProgressBar.style.width = ProgresPersents + "%"; 
    // виводим написи:
    writeIn(MasteryBarSuccess, 16, rightAnswer + str_true);
    writeIn(MasteryBarDanger, 16, wrongAnswers + str_not_true);
    writeIn(ProgressBar, 8, workDicArray.length + str_lost);
  } else {
    MasteryBarSuccess.style.width = "0%"; 
    MasteryBarDanger.style.width = "0%";
    ProgressBar.style.width = "100%"; 
    // виводим написи:
    writeIn(MasteryBarSuccess, 16, "");
    writeIn(MasteryBarDanger, 16, "");
    writeIn(ProgressBar, 8, str_WordsAmount + workDicArray.length);
  }
}

function btnDown() {
    "use strict";
    //
    allAnswers += 1;
    if (this.value === wordAnserArr[0]) {
        rightAnsersSuborder +=1;
        wordAnserArr.shift();
        btnBlock.removeChild(this);
        var knownCharsAmount = workDicArray[currentQuestion_n].eng.length - wordAnserArr.length;
        var prnString = workDicArray[currentQuestion_n].eng.substr(0, knownCharsAmount); 
        while (workDicArray[currentQuestion_n].eng.length - knownCharsAmount > 0) {
            prnString += "*";
            knownCharsAmount += 1;
        }
        (PrinterDiv).innerHTML = prnString;

        showMsgStatusBar(getRandomGoodMark());
        StatusBar.style.color = "rgb(0, 255, 0)";
        if (wordAnserArr.length === 0) {
            setTimeout(initWriter, 1000, currentQuestion_n);
        }
    } else {
        rightAnsersSuborder = 0;
        wrongAnswers += 1;
        // showMsgStatusBar ("Потрібно: " + "\"" + wordAnserArr[0] + "\" <br>" + getRandomBadMark());
        showMsgStatusBar (str_Need + "<button>" + wordAnserArr[0] + "</button> <br>" + getRandomBadMark());
        StatusBar.style.color = "rgb(255, 0, 0)";
        while (btnBlock.firstChild) {
           btnBlock.removeChild(btnBlock.firstChild);
        }
        setTimeout(outPutBtns, 1000);
    }
}

function outPutBtns(){
    "use strict";
    var newBtn;
    var curBtn;
    var charBtnArr = [];
    for (var i = 0; i < wordAnserArr.length; i++) {
        newBtn = document.createElement('input');
        newBtn.className = "btnChar";
        newBtn.type="button";
        newBtn.value = wordAnserArr[i];
        newBtn.onclick = btnDown;
        charBtnArr.push(newBtn);
    }
    while (charBtnArr.length > 0) {
        curBtn = getRandomNumber(charBtnArr.length);
        btnBlock.appendChild(charBtnArr[curBtn]);
        charBtnArr.splice(curBtn, 1);
    }
}

function initWriter(oldWordIndex) {
    "use strict";
    if(~oldWordIndex){
    // delete this word from work array;
    workDicArray.splice(currentQuestion_n, 1);
    }
    showMsgStatusBar("&nbsp;");

    if (workDicArray.length == 0) { 
        document.getElementById("topheader").innerHTML = str_Rest_and_try_late;
        (QuestionBtn).innerHTML = str_Fine;
        (QuestionBtn).disabled = true;
        (QuestionBtn).parentElement.disabled = true;

        (PrinterDiv).innerHTML = "";
        (StatusBar).innerHTML = str_All_tsks_done;
        ProgressBar.style.width = "100%"; 
        (ProgressBar).innerHTML = "";
        MarkRuler.style.display = "block";
    } else {
        currentQuestion_n = getRandomNumber(workDicArray.length);
        (QuestionBtn).innerHTML = workDicArray[currentQuestion_n][trans];
        var emptyString = ""; 
        var i = 0;
        if (workDicArray[currentQuestion_n].eng.indexOf("a ") == 0) {
            emptyString = "a ";
            i = 2;
        }
        if (workDicArray[currentQuestion_n].eng.indexOf("an ") == 0) {
            emptyString = "an ";
            i = 3;
        }
        while (i < workDicArray[currentQuestion_n].eng.length) {
            emptyString += "*";
            wordAnserArr.push(workDicArray[currentQuestion_n].eng.charAt(i));
            i += 1;
        }
        outPutBtns();
        (PrinterDiv).innerHTML = emptyString;
        // Fill modal window (3)
        ModalAudioTeg = new Audio(sdn_store + workDicArray[currentQuestion_n].snd);
    }
}

function soundClick() {
   "use strict";
   ModalAudioTeg.play();//(2)
}

window.onload = function() {
  "use strict";
  // have access to the buttons and top/bottom element
  QuestionBtn = document.getElementById("question"); //(QuestionDiv).innerHTML = DicArray[i].eng;
  PrinterDiv = document.getElementById("printer");
  StatusBar = document.getElementById("statusbar");
  ProgressBar = document.getElementById("progressBar");
  MasteryBarSuccess = document.getElementById("masteryBarSuccess");
  MasteryBarDanger = document.getElementById("masteryBarDanger");
  MarkRuler = document.getElementById("markRuler");
  //(1)
  ModalAudioTeg = document.getElementById("media");

  // make a copy of main array.
  // використаний оператор розпакування
  // workDicArray = [...DicArray]; and then
  // by slice():
  if (WORD_AMOUNT > 0){
    var n;
    for (var i = 0; i < WORD_AMOUNT; i++){
        n = getRandomNumber(DicArray.length);
        workDicArray.push(DicArray[n]);
        DicArray.splice(n, 1);
    }
  } else {
  workDicArray = DicArray.slice(0);
  }
  ALL_word_in_exersice = workDicArray.length;
  (ProgressBar).innerHTML = str_Words_Amount + ALL_word_in_exersice;
  // choose new question
  initWriter(-1);
};