;
var mt = (function() {
  var DicArr = [];
  for (var k = 9; 1 < k; k--) {
    for (var i = 10; 0 < i; i--) {
      DicArr.push({
        ukr: k.toString() + " &times; " + i.toString() + " =",
        trk: "?",
        eng: (i * k).toString(),
        snd: "thinking.mp3"
      });
      DicArr.push({
        ukr: (i * k).toString() + " &divide; " + i.toString() + " =",
        trk: "?",
        eng: k.toString(),
        snd: "thinking.mp3"
      });
    }
  }
  return {
    dicArrey: DicArr
  }
}());