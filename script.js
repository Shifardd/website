function updateClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const clock = document.querySelector('.clock');

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = weekdays[date.getDay()];

  clock.textContent = `${dayName} ${hours}:${minutes}`;
}

setInterval(updateClock, 1000); 

