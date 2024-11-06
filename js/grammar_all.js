var QuestionBtn, PrinterDiv, StatusBar, ProgressBar, MasteryBarSuccess, MasteryBarDanger, MarkRuler, ModalAudioTeg, workDicArray = [],
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
		a = Math.round(workDicArray.length / ALL_word_in_exersice * 1E4) / 100;
		var b = 1 - a / 100;
		0 == b && (a = Math.round((ALL_word_in_exersice - 1) / ALL_word_in_exersice * 1E4) / 100, b = 1 - a / 100);
		var c = Math.round(wrongAnswers / allAnswers * 1E4) / 100;
		MasteryBarDanger.style.width = c * b + "%";
		MasteryBarSuccess.style.width = (100 - c) * b + "%";
		ProgressBar.style.width = a + "%";
		writeIn(ProgressBar, 8, workDicArray.length + str_lost)
	} else MasteryBarSuccess.style.width = "0%", MasteryBarDanger.style.width =
		"0%", ProgressBar.style.width = "100%", writeIn(MasteryBarSuccess, 16, ""), writeIn(MasteryBarDanger, 16, ""), writeIn(ProgressBar, 8, str_WordsAmount + workDicArray.length)
}

function btnDown() {
	allAnswers += 1;
	if (this.value === wordAnserArr[0]) {
		rightAnsersSuborder += 1;
		wordAnserArr.shift();
		btnBlock.removeChild(this);
		for (var a = workDicArray[currentQuestion_n].eng.length - wordAnserArr.length, b = workDicArray[currentQuestion_n].eng.substr(0, a); 0 < workDicArray[currentQuestion_n].eng.length - a;) b += "*", a += 1;
		PrinterDiv.innerHTML = b;
		showMsgStatusBar(getRandomGoodMark());
		StatusBar.style.color = "rgb(0, 170, 0)";
		0 === wordAnserArr.length && setTimeout(initWriter, 1E3, currentQuestion_n)
	} else {
		rightAnsersSuborder =
			0;
		wrongAnswers += 1;
		showMsgStatusBar(str_Need + "<button>" + wordAnserArr[0] + "</button> <br>" + getRandomBadMark());
		for (StatusBar.style.color = "rgb(170, 0, 0)"; btnBlock.firstChild;) btnBlock.removeChild(btnBlock.firstChild);
		setTimeout(outPutBtns, 1E3)
	}
}

function outPutBtns() {
	for (var a, b = [], c = 0; c < wordAnserArr.length; c++) a = document.createElement("input"), a.className = "btnChar", a.type = "button", a.value = wordAnserArr[c], a.onclick = btnDown, b.push(a);
	for (; 0 < b.length;) a = getRandomNumber(b.length), btnBlock.appendChild(b[a]), b.splice(a, 1)
}

function initWriter(a) {
	~a && workDicArray.splice(currentQuestion_n, 1);
	showMsgStatusBar("&nbsp;");
	if (0 == workDicArray.length) document.getElementById("topheader").innerHTML = str_Rest_and_try_late, QuestionBtn.innerHTML = str_Fine, QuestionBtn.disabled = !0, PrinterDiv.innerHTML = "", StatusBar.innerHTML = str_All_tsks_done, ProgressBar.style.width = "100%", ProgressBar.innerHTML = "", MarkRuler.style.display = "block";
	else {
		currentQuestion_n = getRandomNumber(workDicArray.length);
		QuestionBtn.innerHTML = workDicArray[currentQuestion_n][trans];
		a = "";
		var b = 0;
		0 == workDicArray[currentQuestion_n].eng.indexOf("a ") && (a = "a ", b = 2);
		0 == workDicArray[currentQuestion_n].eng.indexOf("an ") && (a = "an ", b = 3);
		for (var c = workDicArray[currentQuestion_n].eng.toLowerCase(); b < workDicArray[currentQuestion_n].eng.length;) a += "*", wordAnserArr.push(c.charAt(b)), b += 1;
		outPutBtns();
		PrinterDiv.innerHTML = a;
		ModalAudioTeg = new Audio(sdn_store + workDicArray[currentQuestion_n].snd)
	}
}

function soundClick() {
	ModalAudioTeg.play()
}
window.onload = function() {
	QuestionBtn = document.getElementById("question");
	PrinterDiv = document.getElementById("printer");
	StatusBar = document.getElementById("statusbar");
	ProgressBar = document.getElementById("progressBar");
	MasteryBarSuccess = document.getElementById("masteryBarSuccess");
	MasteryBarDanger = document.getElementById("masteryBarDanger");
	MarkRuler = document.getElementById("markRuler");
	ModalAudioTeg = document.getElementById("media");
	if (0 < WORD_AMOUNT) {
		for (var a, b = 0; b < WORD_AMOUNT; b++) a = getRandomNumber(DicArray.length),
			workDicArray.push(DicArray[a]), DicArray.splice(a, 1);
		ALL_word_in_exersice = WORD_AMOUNT
	} else workDicArray = DicArray.slice(0), ALL_word_in_exersice = workDicArray.length;
	ProgressBar.innerHTML = str_Words_Amount + ALL_word_in_exersice;
	initWriter(-1)
};