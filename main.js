const daysSegment = document.querySelector('[data-value="days"]');
const hoursSegment = document.querySelector('[data-value="hours"]');
const minutesSegment = document.querySelector('[data-value="minutes"]');
const secondsSegment = document.querySelector('[data-value="seconds"]');

const endDate = new Date(2024, 2, 10, 14);

setInterval(() => {
  const currentDate = new Date();
  const dateDiffSeconds = Math.ceil((endDate - currentDate) / 1000);
  updateCountdown(dateDiffSeconds);
}, 1000);

function updateCountdown(timeLeft) {
  const seconds = Math.floor(timeLeft % 60);
  const minutes = Math.floor((timeLeft / 60) % 60);
  const hours = Math.floor((timeLeft / 3600) % 24);
  const days = Math.floor((timeLeft / 86000) % 100);

  flip(daysSegment, days);
  flip(hoursSegment, hours);
  flip(minutesSegment, minutes);
  flip(secondsSegment, seconds);
}

function formatNumber(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return '' + number;
}

function flip(segment, newValue) {
  const topHalf = segment.querySelector('.number--top');
  const bottomHalf = segment.querySelector('.number--bottom');
  const previousValue = topHalf.innerText;
  newValue = formatNumber(newValue);

  if (newValue === previousValue) return;

  const flipperTop = document.createElement('div');
  flipperTop.classList.add('number', 'flipper-top');
  const flipperBottom = document.createElement('div');
  flipperBottom.classList.add('number', 'flipper-bottom');

  flipperTop.innerText = previousValue;
  flipperBottom.innerText = newValue;

  flipperTop.addEventListener('animationstart', () => {
    topHalf.innerText = newValue;
  });

  flipperTop.addEventListener('animationend', () => {
    flipperTop.remove();
  });

  flipperBottom.addEventListener('animationend', () => {
    bottomHalf.innerText = newValue;
    flipperBottom.remove();
  });

  segment.append(flipperTop, flipperBottom);
}
