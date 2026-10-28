const noButton = document.getElementById('noButton');
const buttonArea = document.getElementById('buttonArea');
const yesButton = document.getElementById('yesButton');
const confirmation = document.getElementById('confirmation');
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const confirmationDetails = document.getElementById('confirmationDetails');
const eventDetails = document.getElementById('eventDetails');
const prompt = document.querySelector('.prompt');
let choosingSchedule = false;

function dodgeNoButton() {
  const area = buttonArea.getBoundingClientRect();
  const button = noButton.getBoundingClientRect();
  const maxX = Math.max(0, area.width - button.width);
  const maxY = 80;
  const x = Math.random() * maxX - maxX / 2;
  const y = (Math.random() - 0.5) * maxY;

  noButton.style.position = 'relative';
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
}

noButton.addEventListener('pointerenter', dodgeNoButton);
noButton.addEventListener('click', dodgeNoButton);
noButton.addEventListener('focus', dodgeNoButton);

yesButton.addEventListener('click', () => {
  if (!choosingSchedule) {
    choosingSchedule = true;
    eventDetails.hidden = false;
    prompt.textContent = 'Lovely! Choose a date and time:';
    yesButton.innerHTML = 'Confirm date <span aria-hidden="true">♥</span>';
    noButton.hidden = true;
    dateInput.focus();
    return;
  }

  if (!dateInput.value || !timeInput.value) {
    (dateInput.value ? timeInput : dateInput).focus();
    return;
  }

  const date = new Date(`${dateInput.value}T00:00:00`);
  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });
  const [hours, minutes] = timeInput.value.split(':').map(Number);
  const formattedTime = new Date(2000, 0, 1, hours, minutes).toLocaleTimeString(undefined, {
    hour: 'numeric', minute: '2-digit'
  });

  confirmationDetails.textContent = `${formattedDate} at ${formattedTime}. I can’t wait! ♥`;
  confirmation.hidden = false;
  window.open('https://www.facebook.com/rintaru.tsumogi0', '_blank', 'noopener,noreferrer');
  yesButton.disabled = true;
  noButton.hidden = true;
  confirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

