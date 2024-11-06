


// Code
var button1, button2, button3, button4, button5;
var QuestionDiv, StatusBar, ProgressBar, MasteryBarSuccess, MasteryBarDanger, MarkRuler;
//(4)
var ModalWord, ModalTrans, ModalAudioTeg;

var workDicArray = [];
var currentQuestion_n;
var isFirstTimeClick = true;
var isFillDataDone = false;
var wrongAnsers = 0;
var strTrueAnswer;

function getRandomNumber(amount) {
    "use strict";
    //
    return Math.floor(Math.random() * amount);
}

function getRandomUkrWord(exceptWord) {
    "use strict";
    //
    var ukrWord = exceptWord;
    //
    while (ukrWord === exceptWord) {
        ukrWord = DicArray[getRandomNumber(DicArray.length)][trans];
    }
    return ukrWord;
}

function getWrongAnswersArrUkr(rightAnswer) {
    "use strict";
    var word, validate, i, wordsArr = [];
    while (wordsArr.length < 4) {
        word = getRandomUkrWord(rightAnswer);
        validate = true;
        for (i = wordsArr.length - 1; i >= 0; i -= 1) {
            if (wordsArr[i] === word) { validate = false; }
        }
        if (validate) { wordsArr.push(word); }
    }
    return wordsArr;
}


function getRandomGoodMark() {
    "use strict";
    //
    var newString;
    var curString = (StatusBar).innerHTML;
    //
    do {
        newString = str_goodmark[getRandomNumber(str_goodmark.length)];
    } while (newString === curString);
    return newString;
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
  if ((outPutConteiner).clientWidth > minWidth) { // Якщо ширина контейнера більша відзазначеної виводим текст
    (outPutConteiner).innerHTML = text;
  } else { (outPutConteiner).innerHTML = ""; }
}

function showMsgStatusBar(msg) {
  "use strict";
  //
  (StatusBar).innerHTML = msg;

  var rightAnswer = DicArray.length - workDicArray.length; // правильних відповідей
  var allAnswers = rightAnswer + wrongAnsers; // всього було поставлено питань

  if (allAnswers > 0) {
    var ProgresPersents = Math.round((workDicArray.length / DicArray.length) * 10000.0) / 100;
    var multiplierForMasteryBar = 1 - (ProgresPersents / 100.0);
    var persents = Math.round((wrongAnsers / allAnswers) * 10000.0) / 100;
    MasteryBarDanger.style.width = persents * multiplierForMasteryBar + "%";
    MasteryBarSuccess.style.width = (100.0 - persents) * multiplierForMasteryBar + "%";
    ProgressBar.style.width = ProgresPersents + "%"; 
    // виводим написи:
    writeIn(MasteryBarSuccess, 16, rightAnswer + str_true);
    writeIn(MasteryBarDanger, 16, wrongAnsers + str_not_true);
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

function setClassDefault(){
    return "col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 anseWordDefoult";
}
function setClassRightMark(){
    return "col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 anseWordRight";
}
function setClassWrongMark(){
    return "col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 anseWordWrong";
}
function fillData() {
    "use strict";
    var WrongAnswersArrUkr;
    // clear all mark
    button1.className = setClassDefault();
    button2.className = setClassDefault();
    button3.className = setClassDefault();
    button4.className = setClassDefault();
    button5.className = setClassDefault();
    if (StatusBar.style.color != "rgb(0, 255, 0)") {
        showMsgStatusBar("&nbsp;"); //якщо попередня відповідь була не правильною - зачищаєм.
    }
    if (workDicArray.length < 1) {
        document.getElementById("topheader").innerHTML = str_Rest_and_try_late;
        (QuestionDiv).innerHTML = str_Fine;
        (QuestionDiv).disabled = true;
        (QuestionDiv).parentElement.disabled = true;
        
        (button1).innerHTML = str_Mistakes + wrongAnsers;
        (button2).innerHTML = "&nbsp;";
        (button3).innerHTML = "&nbsp;";
        (button4).innerHTML = "&nbsp;";
        (button5).innerHTML = "&nbsp;";
        (StatusBar).innerHTML = str_All_tsks_done;
        ProgressBar.style.width = "100%"; 
        (ProgressBar).innerHTML = "";
        MarkRuler.style.display = "block";
        // disconnected events
        btn1.onclick = null;
        btn2.onclick = null;
        btn3.onclick = null;
        btn4.onclick = null;
        btn5.onclick = null;
    } else {
        currentQuestion_n = getRandomNumber(workDicArray.length);
        (QuestionDiv).innerHTML = workDicArray[currentQuestion_n].eng;
        WrongAnswersArrUkr = getWrongAnswersArrUkr(workDicArray[currentQuestion_n][trans]);
        switch (getRandomNumber(5)) {
        case 0: 
        button1.value = workDicArray[currentQuestion_n][trans];
        button2.value = WrongAnswersArrUkr[0];
        button3.value = WrongAnswersArrUkr[1];
        button4.value = WrongAnswersArrUkr[2];
        button5.value = WrongAnswersArrUkr[3];
        break;
        case 1: 
        button1.value = WrongAnswersArrUkr[0];
        button2.value = workDicArray[currentQuestion_n][trans];
        button3.value = WrongAnswersArrUkr[1];
        button4.value = WrongAnswersArrUkr[2];
        button5.value = WrongAnswersArrUkr[3];
        break;  
        case 2: 
        button1.value = WrongAnswersArrUkr[0];
        button2.value = WrongAnswersArrUkr[1];
        button3.value = workDicArray[currentQuestion_n][trans];
        button4.value = WrongAnswersArrUkr[2];
        button5.value = WrongAnswersArrUkr[3];
        break;
        case 3: 
        button1.value = WrongAnswersArrUkr[0];
        button2.value = WrongAnswersArrUkr[1];
        button3.value = WrongAnswersArrUkr[2];
        button4.value = workDicArray[currentQuestion_n][trans];
        button5.value = WrongAnswersArrUkr[3];
        break;
        default: 
        button1.value = WrongAnswersArrUkr[0];
        button2.value = WrongAnswersArrUkr[1];
        button3.value = WrongAnswersArrUkr[2];
        button4.value = WrongAnswersArrUkr[3];
        button5.value = workDicArray[currentQuestion_n][trans];
        }
        (button1).innerHTML = button1.value;
        (button2).innerHTML = button2.value;
        (button3).innerHTML = button3.value;
        (button4).innerHTML = button4.value;
        (button5).innerHTML = button5.value;
    // Fill modal window (3)
    (ModalWord).innerHTML = workDicArray[currentQuestion_n].eng;
    (ModalTrans).innerHTML = workDicArray[currentQuestion_n].trk;
    ModalAudioTeg = new Audio(sdn_store + workDicArray[currentQuestion_n].snd);
    }
    
    isFillDataDone = true;
}

function btnDown() {
    "use strict";
    if(isFillDataDone) { // ігноруєм подвійні кліки, які не дають відпрацювати оновленню керуючих елементів на формі.
        if (isFirstTimeClick)
        {
            isFirstTimeClick = false;
            strTrueAnswer = workDicArray[currentQuestion_n][trans];
            if (this.value ===  strTrueAnswer) {
                // right answer:
                // delete this word from work array;
                workDicArray.splice(currentQuestion_n, 1);

                // mark right answer button;
                this.className = setClassRightMark();
                showMsgStatusBar(getRandomGoodMark());
                StatusBar.style.color = "rgb(0, 255, 0)";
                // вибираєм слідуюче слово
                isFirstTimeClick = true;
                isFillDataDone = false; setTimeout(fillData, 300);
            } else {
                // wrong answer:
                wrongAnsers += 1;                   
                // mark right answer button;
                switch(strTrueAnswer) {
                    case button1.value:
                    button1.className = setClassRightMark();
                    break;
                    case button2.value:
                    button2.className = setClassRightMark();
                    break;
                    case button3.value:
                    button3.className = setClassRightMark();
                    break;
                    case button4.value:
                    button4.className = setClassRightMark();
                    break;    
                    case button5.value:
                    button5.className = setClassRightMark();
                    break;            
                }
                // mark wrong answer;
                this.className = setClassWrongMark();
                showMsgStatusBar(getRandomBadMark());
                StatusBar.style.color = "rgb(255, 0, 0)";
                }
        } else {
                if (this.value === strTrueAnswer) {
                  isFirstTimeClick = true;
                  isFillDataDone = false; fillData();
                  }
               }
      } // else alert("Double click!");
}

function soundClick() {
   "use strict";
   ModalAudioTeg.play();//(2)
}

window.onbeforeunload = function() {
    "use strict";
    // Якщо користувач прошов хоча б 10 слів, а потім випадково ткнув на кнопку назад
    // чи якимось іншим способом вирішив покинути сторінку його потрібно попередити,
    // що цей результат не буде збережено.
    if((DicArray.length - workDicArray.length > 10) && (workDicArray.length > 0)){ // 
        return str_WordsLost + workDicArray.length + ".";
    }
}

window.onload = function() {
  "use strict";
  // have access to the buttons and top/bottom element
  QuestionDiv = document.getElementById("question"); //(QuestionDiv).innerHTML = DicArray[i].eng;
  button1 = document.getElementById("btn1"); //button1.value = DicArray[i][trans];
  button2 = document.getElementById("btn2");
  button3 = document.getElementById("btn3");
  button4 = document.getElementById("btn4");
  button5 = document.getElementById("btn5");
  StatusBar = document.getElementById("statusbar");
  ProgressBar = document.getElementById("progressBar");
  MasteryBarSuccess = document.getElementById("masteryBarSuccess");
  MasteryBarDanger = document.getElementById("masteryBarDanger");
  MarkRuler = document.getElementById("markRuler");
  //(1)
  ModalWord = document.getElementById("modalWord");
  ModalTrans = document.getElementById("modalTrans");
  ModalAudioTeg = document.getElementById("media");
  // connected events
  btn1.onclick = btnDown;
  btn2.onclick = btnDown;
  btn3.onclick = btnDown;
  btn4.onclick = btnDown;
  btn5.onclick = btnDown;

  // make a copy of main array.
  // використаний оператор розпакування
  // workDicArray = [...DicArray]; and then
  // by slice():
  workDicArray = DicArray.slice(0);
  //workDicArray.length = 3;
  // choose new question
  fillData();
  showMsgStatusBar (str_Words_in_tema + workDicArray.length);
};