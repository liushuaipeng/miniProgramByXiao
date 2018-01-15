var convertToStarsArray = function (starts) {
  var num = Number(starts.toString().substring(0, 1));
  var arr = [];
  for (var i = 1; i <= 5; i++) {
    if (i < num) {
      arr.push(1);
    } else {
      arr.push(0);
    }
  };
  return arr;
}
module.exports = {
  convertToStarsArray
}