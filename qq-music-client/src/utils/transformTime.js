export default function (number) {
  number = parseInt(number);
  let minute = Math.floor(number / 60);
  if (minute < 10) {
    minute = padding(minute);
  }
  let second = number - minute * 60;
  if (second < 10) {
    second = padding(second);
  }
  return minute + ":" + second;
}

function padding(number) {
  return "0" + number;
}
