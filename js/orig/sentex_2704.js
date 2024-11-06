
/**
 * @constructor
 */
function MyGnrator() {
  "use strict";

  this.QuestionBtn = document.createElement('input');
  this.PrinterDiv = document.createElement('input');
  this.StatusBar = document.createElement('input');
  this.ProgressBar = document.createElement('input');
  this.MasteryBarSuccess = document.createElement('input');
  this.MasteryBarDanger = document.createElement('input');
  this.MarkRuler = document.createElement('input');
  this.ModalAudioTeg = document.createElement('input');

  var self = this;

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
  var all_sentences_amount = 0;
  var hiddenLine;

  function getRandomNumber(amount) {
    //
    return Math.floor(Math.random() * amount);
  }

  function getRandomGoodMark() {
    //
    if (allAnswers > 1 && rightAnsersSuborder == 1) {
      return str_mark[getRandomNumber(str_mark.length)];
    } else {
      var newString;
      var curString = self.StatusBar.innerHTML;
      //
      do {
        newString = str_goodmark[getRandomNumber(str_goodmark.length)];
      } while (newString === curString);
      return newString;
    }
  }

  function getRandomBadMark() {
    //
    var newString;
    var curString = self.StatusBar.innerHTML;
    //
    do {
      newString = str_bedmark[getRandomNumber(str_bedmark.length)];
    } while (newString === curString);
    return newString;
  }

  function btnDown() {
    //
    allAnswers += 1;
    if (this.value === wordAnserArr[0]) {
      rightAnsersSuborder += 1;
      wordAnserArr.shift();
      btnBlock.removeChild(this);

      // ПОЛОСА СО СНІЖИНКАМИ
      self.PrinterDiv.innerHTML = hiddenLine.getHiddenString(wordAnserArr.length);

      showMsgStatusBar(getRandomGoodMark());
      self.StatusBar.style.color = "rgb(0, 150, 0)";

      //якщо кінець масиву кнопок
      if (wordAnserArr.length === 0) {
        setTimeout(initWriter, 1000, currentQuestion_n);
      }
    } else {
      rightAnsersSuborder = 0;
      wrongAnswers += 1;
      showMsgStatusBar(str_Need + "<button>" + wordAnserArr[0] + "</button> <br>" + getRandomBadMark());
      self.StatusBar.style.color = "rgb(150, 0, 0)";
      while (btnBlock.firstChild) {
        btnBlock.removeChild(btnBlock.firstChild);
      }
      setTimeout(outPutBtns, 1000);
    }
  }

  function outPutBtns() {
    var newBtn;
    var curBtn;
    var charBtnArr = [];
    for (var i = 0; i < wordAnserArr.length; i++) {
      newBtn = document.createElement('input');
      newBtn.className = "btnChar";
      newBtn.type = "button";
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

  function showMsgStatusBar(msg) {

    self.StatusBar.innerHTML = msg;

    if (allAnswers > 0) {
      var rightAnswer = allAnswers - wrongAnswers; // правильних відповідей
      var ProgresPersents = Math.round((workDicArray.length / all_sentences_amount) * 10000.0) / 100;
      var multiplierForMasteryBar = 1 - (ProgresPersents / 100.0);
      if (multiplierForMasteryBar == 0) { // додаткова умова для відображення результатів на першому слові
        ProgresPersents = Math.round(((all_sentences_amount - 1) / all_sentences_amount) * 10000.0) / 100;
        multiplierForMasteryBar = 1 - (ProgresPersents / 100.0);
      }
      var persents = Math.round((wrongAnswers / allAnswers) * 10000.0) / 100;
      self.MasteryBarDanger.style.width = persents * multiplierForMasteryBar + "%";
      self.MasteryBarSuccess.style.width = (100.0 - persents) * multiplierForMasteryBar + "%";
      self.ProgressBar.style.width = ProgresPersents + "%";
      // виводим написи:
      // writeIn(self.MasteryBarSuccess, 16, rightAnswer + str_true);
      // writeIn(self.MasteryBarDanger, 16, wrongAnswers + str_not_true);
      writeIn(self.ProgressBar, 8, workDicArray.length + str_lost);
    } else {
      self.MasteryBarSuccess.style.width = "0%";
      self.MasteryBarDanger.style.width = "0%";
      self.ProgressBar.style.width = "100%";
      // виводим написи:
      writeIn(self.MasteryBarSuccess, 16, "");
      writeIn(self.MasteryBarDanger, 16, "");
      writeIn(self.ProgressBar, 8, str_WordsAmount + workDicArray.length);
    }
  }

  function writeIn(outPutConteiner, minWidth, text) {
    //
    if (outPutConteiner.clientWidth > minWidth) { // Якщо ширина контейнера більша відзазначеної виводим текст
      outPutConteiner.innerHTML = text;
    } else {
      outPutConteiner.innerHTML = "";
    }
  }

  /*function soundClick() {
    //
    self.ModalAudioTeg.play();
  }*/

  function initWriter(oldWordIndex) {
    if (~oldWordIndex) {
      // delete this word from work array;
      workDicArray.splice(currentQuestion_n, 1);
    }
    showMsgStatusBar("&nbsp;");
    if (workDicArray.length == 0) {
      document.getElementById("topheader").innerHTML = str_Rest_and_try_late;
      self.QuestionBtn.innerHTML = str_Fine;
      self.QuestionBtn.disabled = true;
      self.PrinterDiv.innerHTML = "";
      self.StatusBar.innerHTML = str_All_tsks_done;
      self.ProgressBar.style.width = "100%";
      self.ProgressBar.innerHTML = "";
      if (self.MarkRuler) self.MarkRuler.style.display = "block";
    } else {

      if (window.sentencesByOrder) {
        currentQuestion_n = 0;
      } else {
        currentQuestion_n = getRandomNumber(workDicArray.length);
      }

      // QUESTION
      self.QuestionBtn.innerHTML = workDicArray[currentQuestion_n][trans];

      hiddenLine = new HiddenLine(workDicArray[currentQuestion_n]['eng']);
      //розбили речення по КНОПКАМ
      wordAnserArr = hiddenLine.getWordsArr();
      outPutBtns();
      // ПОЛОСА СО СНІЖИНКАМИ
      self.PrinterDiv.innerHTML = hiddenLine.getHiddenString(wordAnserArr.length);
      //ЗВУК
      self.ModalAudioTeg = new Audio(sdn_store + workDicArray[currentQuestion_n]['snd']);
    }
  }

  this.initDictionery = function(DicArray) {
    // make a copy of main array.
    workDicArray = DicArray.slice(0);
    all_sentences_amount = workDicArray.length;

    this.ProgressBar.innerHTML = str_Words_Amount + all_sentences_amount;
  };

  this.run = function() {
    initWriter(-1);
  };

  this.sound = function() {
    self.ModalAudioTeg.play();
  };
  
}
/**
 * @constructor
 */
function HiddenLine(string) {
  var originalWordsArr = string.split(" ");

  function toLowerCaseButNotNames(str) {
    if (str.includes("#")) {
      while (str.includes("#")) {
        str = str.replace('#', '');
      }
    } else {
      str = str.toLowerCase();
    }
    while (str.includes("_")) {
      str = str.replace('_', ' ');
    }
    while (str.includes(",")) {
      str = str.replace(',', '');
    }
    while (str.includes(".")) {
      str = str.replace('.', '');
    }
    while (str.includes("?")) {
      str = str.replace('?', '');
    }
    while (str.includes("!")) {
      str = str.replace('!', '');
    }
    while (str.includes(":")) {
      str = str.replace(':', '');
    }
    while (str.includes(";")) {
      str = str.replace(';', '');
    }
    return str;
  }

  this.getWordsArr = function() {
    return originalWordsArr.map(function(str) {
      return toLowerCaseButNotNames(str);
    });
  }

  this.getHiddenString = function(hiddedWords) {
    var tempArr = originalWordsArr.map(function(str) {
      while (str.includes("#")) {
        str = str.replace('#', '');
      }
      while (str.includes("_")) {
        str = str.replace('_', ' ');
      }
      return str;
    });

    for (var i = tempArr.length - 1; i >= (tempArr.length - hiddedWords); i--) {
      var s = "";
      for (var n = 0; n < tempArr[i].length; n++) {
        if (tempArr[i].charAt(n) == ' ') s += ' ';
        else s += "*";
      }
      tempArr[i] = s;
    }
    return tempArr.join(" ");
  }
}


window.onload = function() {
  "use strict";
  // have access to the buttons and top/bottom element
  window.gen = new MyGnrator();

  gen.QuestionBtn = document.getElementById("question");
  gen.PrinterDiv = document.getElementById("printer");
  gen.StatusBar = document.getElementById("statusbar");
  gen.ProgressBar = document.getElementById("progressBar");
  gen.MasteryBarSuccess = document.getElementById("masteryBarSuccess");
  gen.MasteryBarDanger = document.getElementById("masteryBarDanger");
  gen.MarkRuler = document.getElementById("markRuler");
  gen.ModalAudioTeg = document.getElementById("media");

  gen.initDictionery(window.DicArray);
  gen.run();
};