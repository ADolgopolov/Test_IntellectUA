var Question;
var TopHeader;
var StatusBarGood;
var StatusBarBed;
var ProgressBar;
var MasteryBarSuccess;
var MasteryBarDanger;
var MarkRuler;

var QueryList = [];
var curQuery;
var NuberInList;
var int_ErrorAmount = 0;

var QUESTION_AMOUNT = 20;

var str_goodmark = [];

str_goodmark.push("Молодець!");
str_goodmark.push("Молодчинка!");
str_goodmark.push("Умнічка!");
str_goodmark.push("Просто геній!");
str_goodmark.push("Відмінно!");
str_goodmark.push("Дуже добре!");
str_goodmark.push("Талант!");
str_goodmark.push("Чудово!");
str_goodmark.push("Геніально!");
str_goodmark.push("Правильно!");
str_goodmark.push("Супер!");
str_goodmark.push("Добре!");

var str_bedmark = [];

str_bedmark.push("Головне увага.");
str_bedmark.push("Неправильно.");
str_bedmark.push("Не поспішай.");
str_bedmark.push("Зконцентруйся.");
str_bedmark.push("Подумай.");
str_bedmark.push("Помилка.");
str_bedmark.push("Ні, не так.");
str_bedmark.push("Ні! Ні! Ні!");
str_bedmark.push("Не вірно.");
str_bedmark.push("Думай.");
str_bedmark.push("Погано.");
str_bedmark.push("Пригадай.");
str_bedmark.push("Запамятай.");
str_bedmark.push("Ти можеш краще.");
str_bedmark.push("Мені сумно.");
str_bedmark.push("Не спи!");

function getRandomNumber(amount) {
    "use strict";
    //
    return Math.floor(Math.random() * amount);
}

function getRandomGoodMark() {
    "use strict";
    //
    var newString;
    var curString = (StatusBarGood).innerHTML;
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
    var curString = (StatusBarBed).innerHTML;
    //
    do {
        newString = str_bedmark[getRandomNumber(str_bedmark.length)];
    } while (newString === curString);
    return newString;
}

function outPutQuery(isError){
  "use strict";
  //
  var isAllRight = true;
  if (QueryList.length > 0) {
    (TopHeader).innerHTML = "Обери правильну відповідь";
    // вибираєм слідуючий приклад
    NuberInList = getRandomNumber(QueryList.length);
    curQuery = QueryList[NuberInList];
    (Question).innerHTML = curQuery.query;
  }else {
    isAllRight = false;
  }
  if (isError){
      (StatusBarGood).innerHTML = "Все буде добре.";
      (StatusBarBed).innerHTML = "";
  }
  return isAllRight;
}
function writeIn(outPutConteiner, minWidth, text) {
  "use strict"
  //
  if (outPutConteiner.clientWidth > minWidth) { // Якщо ширина контейнера більша відзазначеної виводим текст
    outPutConteiner.innerHTML = text;
  } else { outPutConteiner.innerHTML = ""; }
}

function showMsgProgresbar(){
  "use strict";
  //
  var rightAnswer = QUESTION_AMOUNT - QueryList.length; // правильних відповідей
  var allAnswers = rightAnswer + int_ErrorAmount; // всього було поставлено питань

  if (allAnswers > 0) {
    var ProgresPersents = Math.round((QueryList.length / QUESTION_AMOUNT) * 10000.0) / 100;
    var multiplierForMasteryBar = 1 - (ProgresPersents / 100.0);
    var persents = Math.round((int_ErrorAmount / allAnswers) * 10000.0) / 100;
    MasteryBarDanger.style.width = persents * multiplierForMasteryBar + "%";
    MasteryBarSuccess.style.width = (100.0 - persents) * multiplierForMasteryBar + "%";
    ProgressBar.style.width = ProgresPersents + "%"; 
    // виводим написи:
    writeIn(MasteryBarSuccess, 16, rightAnswer + " вірно");
    writeIn(MasteryBarDanger, 16, int_ErrorAmount + " неправильно");
    writeIn(ProgressBar, 8, QueryList.length + " залишилось");
  } else {
    MasteryBarSuccess.style.width = "0%"; 
    MasteryBarDanger.style.width = "0%";
    ProgressBar.style.width = "100%"; 
    // виводим написи:
    writeIn(MasteryBarSuccess, 16, "");
    writeIn(MasteryBarDanger, 16, "");
    writeIn(ProgressBar, 8, "Всього прикладів: " + QueryList.length);
  }
}

function InitQueryList(){
    "use strict";
    //
    QueryList.length = 0;

    NuberInList = 0;
    int_ErrorAmount = 0;

    // заповнюємо прикладами на додавання
    for (var dodanok1 = 1; dodanok1 < 21; dodanok1++)
    {
        for (var dodanok2 = 0; (dodanok1 + dodanok2) <= 20; dodanok2++)
        {
          QueryList.push({query: dodanok1.toString() + "+" + dodanok2.toString() + "=", ans: (dodanok1 + dodanok2).toString()});
        }
    }

    for (var zmenshuvane = 20; zmenshuvane > 0; zmenshuvane--)
        {
            for (var vidjemnyk = 0; (zmenshuvane - vidjemnyk) >= 1; vidjemnyk++)
            {
                QueryList.push({query: zmenshuvane.toString() + "-" + vidjemnyk.toString() + "=", ans: (zmenshuvane - vidjemnyk).toString()});
            }
        }
    // залишаємо у випадковому порядку QUESTION_AMOUNT запитань
    var truncQueryList = [];
    for (var i = 0; i < QUESTION_AMOUNT; i++)
    {
        NuberInList = getRandomNumber(QueryList.length);
        truncQueryList.push(QueryList[NuberInList]);
    }

    QueryList = truncQueryList;
    
    showMsgProgresbar();

    if(!outPutQuery(false)){
      (Question).innerHTML = "Помилка ініціалізації";
    }
    (TopHeader).innerHTML = "Обери правильну відповідь";
    (StatusBarGood).innerHTML = "Тисни кнопку.";
    (StatusBarBed).innerHTML = "";
}    

function btnDown() {
  "use strict";
  if (curQuery.ans === this.value)
  {
      (Question).innerHTML = curQuery.query + curQuery.ans;
      // видаляєм із списку приклад, на який дали правильну відповідь
      QueryList.splice(NuberInList, 1);
      (TopHeader).innerHTML = "Вірно";
      (StatusBarGood).innerHTML = getRandomGoodMark();
      (StatusBarBed).innerHTML = "";
      
      // зміни значень прогрес-бара
      showMsgProgresbar();
      
      if (QueryList.length > 0)
      {
          // вибираєм слідуючий приклад
          setTimeout(outPutQuery, 500, false);
          
      }
      else { // кінець списка - виводим результати:
        if(int_ErrorAmount > 0){
          (TopHeader).innerHTML = "Всього було помилок: " + int_ErrorAmount.toString();
          (Question).innerHTML = "Можеш краще.";
          (StatusBarGood).innerHTML = "";
        }
        else {
          (TopHeader).innerHTML = "Жодної помилки!!!";
          (Question).innerHTML = "Молодець!!!";
        }
        showMsgProgresbar();
        (ProgressBar).innerHTML = "";
        MarkRuler.style.display = "block";
        // на події кнопки ставим перезапуск сторніки :)
        btn1.onclick = window.onload;
        btn2.onclick = window.onload;
        btn3.onclick = window.onload;
        btn4.onclick = window.onload;
        btn5.onclick = window.onload;
        btn6.onclick = window.onload;
        btn7.onclick = window.onload;
        btn8.onclick = window.onload;
        btn9.onclick = window.onload;
        btn10.onclick = window.onload;
        btn11.onclick = window.onload;
        btn12.onclick = window.onload;
        btn13.onclick = window.onload;
        btn14.onclick = window.onload;
        btn15.onclick = window.onload;
        btn16.onclick = window.onload;
        btn17.onclick = window.onload;
        btn18.onclick = window.onload;
        btn19.onclick = window.onload;
        btn20.onclick = window.onload;
      }
  }
  else {
      int_ErrorAmount +=1;
      (TopHeader).innerHTML = "Правильно так:";
      (Question).innerHTML = curQuery.query + curQuery.ans;
      (StatusBarBed).innerHTML = getRandomBadMark();
      (StatusBarGood).innerHTML = "";
      // зміни значень прогрес-бара
      showMsgProgresbar();
      // вибираєм слідуючий приклад
      setTimeout(outPutQuery, 2000, true);
      
  }
}  

window.onload = function() {
  "use strict";
  // // have access to the buttons and top/bottom element
  Question = document.getElementById("question"); 
  TopHeader = document.getElementById("topHeader"); 
  StatusBarGood  = document.getElementById("statusBarGood"); 
  StatusBarBed  = document.getElementById("statusBarBed"); 
  MasteryBarSuccess = document.getElementById("masteryBarSuccess");
  MasteryBarDanger = document.getElementById("masteryBarDanger");
  MarkRuler = document.getElementById("markRuler");
  MarkRuler.style.display = "none"; // ховаєм при перезапуску сторінки
  ProgressBar = document.getElementById("progressBar");

  // connected events
  btn1.onclick = btnDown;
  btn2.onclick = btnDown;
  btn3.onclick = btnDown;
  btn4.onclick = btnDown;
  btn5.onclick = btnDown;
  btn6.onclick = btnDown;
  btn7.onclick = btnDown;
  btn8.onclick = btnDown;
  btn9.onclick = btnDown;
  btn10.onclick = btnDown;
  btn11.onclick = btnDown;
  btn12.onclick = btnDown;
  btn13.onclick = btnDown;
  btn14.onclick = btnDown;
  btn15.onclick = btnDown;
  btn16.onclick = btnDown;
  btn17.onclick = btnDown;
  btn18.onclick = btnDown;
  btn19.onclick = btnDown;
  btn20.onclick = btnDown;

  InitQueryList();
};