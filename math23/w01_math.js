///////////
/*slint browser:true */
/*global window, document, btn1, btn1, btn2, btn3, btn4, btn4, btn5, question, statusbar, statusbar2*/
var DicArray = [];

DicArray.push({eng: "2 &times; 1 =", trk: "?", ukr: "2", snd: "thinking.mp3"});
DicArray.push({eng: "2 &times; 2 =", trk: "?", ukr: "4", snd: "thinking.mp3"});
DicArray.push({eng: "2 &times; 3 =", trk: "?", ukr: "6", snd: "thinking.mp3"});
DicArray.push({eng: "2 &times; 4 =", trk: "?", ukr: "8", snd: "thinking.mp3"});
DicArray.push({eng: "2 &times; 5 =", trk: "?", ukr: "10", snd: "thinking.mp3"});
DicArray.push({eng: "2 &times; 6 =", trk: "?", ukr: "12", snd: "thinking.mp3"});
DicArray.push({eng: "2 &times; 7 =", trk: "?", ukr: "14", snd: "thinking.mp3"});
DicArray.push({eng: "2 &times; 8 =", trk: "?", ukr: "16", snd: "thinking.mp3"});
DicArray.push({eng: "2 &times; 9 =", trk: "?", ukr: "18", snd: "thinking.mp3"});
DicArray.push({eng: "2 &times; 10 =", trk: "?", ukr: "20", snd: "thinking.mp3"});

DicArray.push({eng: "2 &divide; 2 =", trk: "?", ukr: "1", snd: "thinking.mp3"});
DicArray.push({eng: "4 &divide; 2 =", trk: "?", ukr: "2", snd: "thinking.mp3"});
DicArray.push({eng: "6 &divide; 2 =", trk: "?", ukr: "3", snd: "thinking.mp3"});
DicArray.push({eng: "8 &divide; 2 =", trk: "?", ukr: "4", snd: "thinking.mp3"});
DicArray.push({eng: "10 &divide; 2 =", trk: "?", ukr: "5", snd: "thinking.mp3"});
DicArray.push({eng: "12 &divide; 2 =", trk: "?", ukr: "6", snd: "thinking.mp3"});
DicArray.push({eng: "14 &divide; 2 =", trk: "?", ukr: "7", snd: "thinking.mp3"});
DicArray.push({eng: "16 &divide; 2 =", trk: "?", ukr: "8", snd: "thinking.mp3"});
DicArray.push({eng: "18 &divide; 2 =", trk: "?", ukr: "9", snd: "thinking.mp3"});
DicArray.push({eng: "20 &divide; 2 =", trk: "?", ukr: "10", snd: "thinking.mp3"});

DicArray.push({eng: "3 &times; 1 =", trk: "?", ukr: "3", snd: "thinking.mp3"});
DicArray.push({eng: "3 &times; 2 =", trk: "?", ukr: "6", snd: "thinking.mp3"});
DicArray.push({eng: "3 &times; 3 =", trk: "?", ukr: "9", snd: "thinking.mp3"});
DicArray.push({eng: "3 &times; 4 =", trk: "?", ukr: "12", snd: "thinking.mp3"});
DicArray.push({eng: "3 &times; 5 =", trk: "?", ukr: "15", snd: "thinking.mp3"});
DicArray.push({eng: "3 &times; 6 =", trk: "?", ukr: "18", snd: "thinking.mp3"});
DicArray.push({eng: "3 &times; 7 =", trk: "?", ukr: "21", snd: "thinking.mp3"});
DicArray.push({eng: "3 &times; 8 =", trk: "?", ukr: "24", snd: "thinking.mp3"});
DicArray.push({eng: "3 &times; 9 =", trk: "?", ukr: "27", snd: "thinking.mp3"});
DicArray.push({eng: "3 &times; 10 =", trk: "?", ukr: "30", snd: "thinking.mp3"});

DicArray.push({eng: "3 &divide; 3 =", trk: "?", ukr: "1", snd: "thinking.mp3"});
DicArray.push({eng: "6 &divide; 3 =", trk: "?", ukr: "2", snd: "thinking.mp3"});
DicArray.push({eng: "9 &divide; 3 =", trk: "?", ukr: "3", snd: "thinking.mp3"});
DicArray.push({eng: "12 &divide; 3 =", trk: "?", ukr: "4", snd: "thinking.mp3"});
DicArray.push({eng: "15 &divide; 3 =", trk: "?", ukr: "5", snd: "thinking.mp3"});
DicArray.push({eng: "18 &divide; 3 =", trk: "?", ukr: "6", snd: "thinking.mp3"});
DicArray.push({eng: "21 &divide; 3 =", trk: "?", ukr: "7", snd: "thinking.mp3"});
DicArray.push({eng: "24 &divide; 3 =", trk: "?", ukr: "8", snd: "thinking.mp3"});
DicArray.push({eng: "27 &divide; 3 =", trk: "?", ukr: "9", snd: "thinking.mp3"});
DicArray.push({eng: "30 &divide; 3 =", trk: "?", ukr: "10", snd: "thinking.mp3"});

DicArray.push({eng: "4 &times; 1 =", trk: "?", ukr: "4", snd: "thinking.mp3"});
DicArray.push({eng: "4 &times; 2 =", trk: "?", ukr: "8", snd: "thinking.mp3"});
DicArray.push({eng: "4 &times; 3 =", trk: "?", ukr: "12", snd: "thinking.mp3"});
DicArray.push({eng: "4 &times; 4 =", trk: "?", ukr: "16", snd: "thinking.mp3"});
DicArray.push({eng: "4 &times; 5 =", trk: "?", ukr: "20", snd: "thinking.mp3"});
DicArray.push({eng: "4 &times; 6 =", trk: "?", ukr: "24", snd: "thinking.mp3"});
DicArray.push({eng: "4 &times; 7 =", trk: "?", ukr: "28", snd: "thinking.mp3"});
DicArray.push({eng: "4 &times; 8 =", trk: "?", ukr: "32", snd: "thinking.mp3"});
DicArray.push({eng: "4 &times; 9 =", trk: "?", ukr: "36", snd: "thinking.mp3"});
DicArray.push({eng: "4 &times; 10 =", trk: "?", ukr: "40", snd: "thinking.mp3"});

DicArray.push({eng: "4 &divide; 4 =", trk: "?", ukr: "1", snd: "thinking.mp3"});
DicArray.push({eng: "8 &divide; 4 =", trk: "?", ukr: "2", snd: "thinking.mp3"});
DicArray.push({eng: "12 &divide; 4 =", trk: "?", ukr: "3", snd: "thinking.mp3"});
DicArray.push({eng: "16 &divide; 4 =", trk: "?", ukr: "4", snd: "thinking.mp3"});
DicArray.push({eng: "20 &divide; 4 =", trk: "?", ukr: "5", snd: "thinking.mp3"});
DicArray.push({eng: "24 &divide; 4 =", trk: "?", ukr: "6", snd: "thinking.mp3"});
DicArray.push({eng: "28 &divide; 4 =", trk: "?", ukr: "7", snd: "thinking.mp3"});
DicArray.push({eng: "32 &divide; 4 =", trk: "?", ukr: "8", snd: "thinking.mp3"});
DicArray.push({eng: "36 &divide; 4 =", trk: "?", ukr: "9", snd: "thinking.mp3"});
DicArray.push({eng: "40 &divide; 4 =", trk: "?", ukr: "10", snd: "thinking.mp3"});

DicArray.push({eng: "5 &times; 1 =", trk: "?", ukr: "5", snd: "thinking.mp3"});
DicArray.push({eng: "5 &times; 2 =", trk: "?", ukr: "10", snd: "thinking.mp3"});
DicArray.push({eng: "5 &times; 3 =", trk: "?", ukr: "15", snd: "thinking.mp3"});
DicArray.push({eng: "5 &times; 4 =", trk: "?", ukr: "20", snd: "thinking.mp3"});
DicArray.push({eng: "5 &times; 5 =", trk: "?", ukr: "25", snd: "thinking.mp3"});
DicArray.push({eng: "5 &times; 6 =", trk: "?", ukr: "30", snd: "thinking.mp3"});
DicArray.push({eng: "5 &times; 7 =", trk: "?", ukr: "35", snd: "thinking.mp3"});
DicArray.push({eng: "5 &times; 8 =", trk: "?", ukr: "40", snd: "thinking.mp3"});
DicArray.push({eng: "5 &times; 9 =", trk: "?", ukr: "45", snd: "thinking.mp3"});
DicArray.push({eng: "5 &times; 10 =", trk: "?", ukr: "50", snd: "thinking.mp3"});

DicArray.push({eng: "5 &divide; 5 =", trk: "?", ukr: "1", snd: "thinking.mp3"});
DicArray.push({eng: "10 &divide; 5 =", trk: "?", ukr: "2", snd: "thinking.mp3"});
DicArray.push({eng: "15 &divide; 5 =", trk: "?", ukr: "3", snd: "thinking.mp3"});
DicArray.push({eng: "20 &divide; 5 =", trk: "?", ukr: "4", snd: "thinking.mp3"});
DicArray.push({eng: "25 &divide; 5 =", trk: "?", ukr: "5", snd: "thinking.mp3"});
DicArray.push({eng: "30 &divide; 5 =", trk: "?", ukr: "6", snd: "thinking.mp3"});
DicArray.push({eng: "35 &divide; 5 =", trk: "?", ukr: "7", snd: "thinking.mp3"});
DicArray.push({eng: "40 &divide; 5 =", trk: "?", ukr: "8", snd: "thinking.mp3"});
DicArray.push({eng: "45 &divide; 5 =", trk: "?", ukr: "9", snd: "thinking.mp3"});
DicArray.push({eng: "50 &divide; 5 =", trk: "?", ukr: "10", snd: "thinking.mp3"});