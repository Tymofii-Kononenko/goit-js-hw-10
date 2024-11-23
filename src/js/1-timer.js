import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const buttonStart = document.querySelector('[data-start]')
const timerDays = document.querySelector('[data-days]')
const timerHours = document.querySelector('[data-hours]')
const timerMinutes = document.querySelector('[data-minutes]')
const timerSeconds = document.querySelector('[data-seconds]')
const inputPicker = document.querySelector('#datetime-picker')


let userSelectedDate = null;

buttonStart.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0].getTime();
        buttonStart.disabled = false;

        if (userSelectedDate < Date.now()) {
            buttonStart.disabled = true;
            iziToast.show({
                message: `Please choose a date in the future`,
                position: 'topCenter',
                messageColor: '#ffffff',
                backgroundColor: '#ed6905'
            });
        }
    },
};

flatpickr(inputPicker, options);


buttonStart.addEventListener('click', onHandleClick);

function onHandleClick(e) {
    buttonStart.disabled = true;

    const interval = setInterval(() => {
        const timeLeft = userSelectedDate - Date.now();
        inputPicker.disabled = true;

        if (timeLeft <= 0) {
            clearInterval(interval);
            iziToast.show({
                message: `It is your time`,
                position: 'topCenter',
                messageColor: '#ffffff',
                backgroundColor: '#0581ed'
            });
            buttonStart.disabled = false;
            return
        }

        const { days, hours, minutes, seconds } = convertMs(timeLeft);
        timerDays.textContent = `${addLeadingZero(days)}`
        timerHours.textContent = `${addLeadingZero(hours)}`
        timerMinutes.textContent = `${addLeadingZero(minutes)}`
        timerSeconds.textContent = `${addLeadingZero(seconds)}`

    }, 1000)

}



function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0')
}






