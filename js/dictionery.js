var button1, button2, button3, button4, button5, QuestionDiv, StatusBar, ProgressBar, MasteryBarSuccess, MasteryBarDanger, MarkRuler, ModalWord, ModalTrans, ModalAudioTeg, workDicArray = [],
	currentQuestion_n, isFirstTimeClick = !0,
	isFillDataDone = !1,
	wrongAnsers = 0,
	strTrueAnswer;

function getRandomNumber(a) {
	return Math.floor(Math.random() * a)
}

function getRandomUkrWord(a) {
	for (var b = a; b === a;) b = DicArray[getRandomNumber(DicArray.length)][trans];
	return b
}

function getWrongAnswersArrUkr(a) {
	for (var b, c, d, e = []; 4 > e.length;) {
		b = getRandomUkrWord(a);
		c = !0;
		for (d = e.length - 1; 0 <= d; --d) e[d] === b && (c = !1);
		c && e.push(b)
	}
	return e
}

function getRandomGoodMark() {
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
	a = DicArray.length - workDicArray.length;
	var b = a + wrongAnsers;
	if (0 < b) {
		var c = Math.round(workDicArray.length / DicArray.length * 1E4) / 100,
			d = 1 - c / 100;
		b = Math.round(wrongAnsers / b * 1E4) / 100;
		MasteryBarDanger.style.width = b * d + "%";
		MasteryBarSuccess.style.width = (100 - b) * d + "%";
		ProgressBar.style.width = c + "%";
		writeIn(MasteryBarSuccess, 16, a + str_true);
		writeIn(MasteryBarDanger, 16, wrongAnsers + str_not_true);
		writeIn(ProgressBar, 8, workDicArray.length + str_lost)
	} else MasteryBarSuccess.style.width =
		"0%", MasteryBarDanger.style.width = "0%", ProgressBar.style.width = "100%", writeIn(MasteryBarSuccess, 16, ""), writeIn(MasteryBarDanger, 16, ""), writeIn(ProgressBar, 8, str_WordsAmount + workDicArray.length)
}

function setClassDefault() {
	return "col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 anseWordDefoult"
}

function setClassRightMark() {
	return "col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 anseWordRight"
}

function setClassWrongMark() {
	return "col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 anseWordWrong"
}

function fillData() {
	button1.className = setClassDefault();
	button2.className = setClassDefault();
	button3.className = setClassDefault();
	button4.className = setClassDefault();
	button5.className = setClassDefault();
	"rgb(0, 184, 0)" != StatusBar.style.color && showMsgStatusBar("&nbsp;");
	if (1 > workDicArray.length) document.getElementById("topheader").innerHTML = str_Rest_and_try_late, QuestionDiv.innerHTML = str_Fine, QuestionDiv.disabled = !0, QuestionDiv.parentElement.disabled = !0, button1.innerHTML = str_Mistakes + wrongAnsers, button2.innerHTML = "&nbsp;", button3.innerHTML =
		"&nbsp;", button4.innerHTML = "&nbsp;", button5.innerHTML = "&nbsp;", StatusBar.innerHTML = str_All_tsks_done, ProgressBar.style.width = "100%", ProgressBar.innerHTML = "", MarkRuler.style.display = "block", btn1.onclick = null, btn2.onclick = null, btn3.onclick = null, btn4.onclick = null, btn5.onclick = null;
	else {
		currentQuestion_n = getRandomNumber(workDicArray.length);
		QuestionDiv.innerHTML = workDicArray[currentQuestion_n].eng;
		var a = getWrongAnswersArrUkr(workDicArray[currentQuestion_n][trans]);
		switch (getRandomNumber(5)) {
			case 0:
				button1.value =
					workDicArray[currentQuestion_n][trans];
				button2.value = a[0];
				button3.value = a[1];
				button4.value = a[2];
				button5.value = a[3];
				break;
			case 1:
				button1.value = a[0];
				button2.value = workDicArray[currentQuestion_n][trans];
				button3.value = a[1];
				button4.value = a[2];
				button5.value = a[3];
				break;
			case 2:
				button1.value = a[0];
				button2.value = a[1];
				button3.value = workDicArray[currentQuestion_n][trans];
				button4.value = a[2];
				button5.value = a[3];
				break;
			case 3:
				button1.value = a[0];
				button2.value = a[1];
				button3.value = a[2];
				button4.value = workDicArray[currentQuestion_n][trans];
				button5.value = a[3];
				break;
			default:
				button1.value = a[0], button2.value = a[1], button3.value = a[2], button4.value = a[3], button5.value = workDicArray[currentQuestion_n][trans]
		}
		button1.innerHTML = button1.value;
		button2.innerHTML = button2.value;
		button3.innerHTML = button3.value;
		button4.innerHTML = button4.value;
		button5.innerHTML = button5.value;
		ModalWord.innerHTML = workDicArray[currentQuestion_n].eng;
		ModalTrans.innerHTML = workDicArray[currentQuestion_n].trk;
		ModalAudioTeg = new Audio(sdn_store + workDicArray[currentQuestion_n].snd)
	}
	isFillDataDone = !0
}

function btnDown() {
	if (isFillDataDone)
		if (isFirstTimeClick)
			if (isFirstTimeClick = !1, strTrueAnswer = workDicArray[currentQuestion_n][trans], this.value === strTrueAnswer) workDicArray.splice(currentQuestion_n, 1), this.className = setClassRightMark(), showMsgStatusBar(getRandomGoodMark()), StatusBar.style.color = "rgb(0, 184, 0)", isFirstTimeClick = !0, isFillDataDone = !1, setTimeout(fillData, 300);
			else {
				wrongAnsers += 1;
				switch (strTrueAnswer) {
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
						button5.className = setClassRightMark()
				}
				this.className = setClassWrongMark();
				showMsgStatusBar(getRandomBadMark());
				StatusBar.style.color = "rgb(255, 0, 0)"
			}
	else this.value === strTrueAnswer && (isFirstTimeClick = !0, isFillDataDone = !1, fillData())
}

function soundClick() {
	ModalAudioTeg.play()
}
window.onbeforeunload = function() {
	if (10 < DicArray.length - workDicArray.length && 0 < workDicArray.length) return str_WordsLost + workDicArray.length + "."
};
window.onload = function() {
	QuestionDiv = document.getElementById("question");
	button1 = document.getElementById("btn1");
	button2 = document.getElementById("btn2");
	button3 = document.getElementById("btn3");
	button4 = document.getElementById("btn4");
	button5 = document.getElementById("btn5");
	StatusBar = document.getElementById("statusbar");
	ProgressBar = document.getElementById("progressBar");
	MasteryBarSuccess = document.getElementById("masteryBarSuccess");
	MasteryBarDanger = document.getElementById("masteryBarDanger");
	MarkRuler =
		document.getElementById("markRuler");
	ModalWord = document.getElementById("modalWord");
	ModalTrans = document.getElementById("modalTrans");
	ModalAudioTeg = document.getElementById("media");
	btn1.onclick = btnDown;
	btn2.onclick = btnDown;
	btn3.onclick = btnDown;
	btn4.onclick = btnDown;
	btn5.onclick = btnDown;
	workDicArray = DicArray.slice(0);
	fillData();
	showMsgStatusBar(str_Words_in_tema + workDicArray.length)
};