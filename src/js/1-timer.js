import flatpickr from "flatpickr"; 
import "flatpickr/dist/flatpickr.min.css";   
import iziToast from "izitoast";   
import "izitoast/dist/css/iziToast.min.css"; 

const startBtn = document.querySelector("[data-start]");;
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');
const inputDateTime = document.querySelector('#datetime-picker');

startBtn.disabled = true;
startBtn.style.backgroundColor = "#CFCFCF";
startBtn.style.color = "#989898";



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < new Date().getTime()) {
            
            daysRef.textContent === "00";
            hoursRef.textContent === "00";
            minutesRef.textContent === "00";
            secondsRef.textContent === "00";
            iziToast.error({
                title: 'Error',
                titleColor: 'black',
                backgroundColor: 'red',
                message: 'Please choose a date in the future',
                position: 'topRight',
            });
      } else {
            startBtn.disabled = false;
            startBtn.style.backgroundColor = "#4E75FF";
            startBtn.style.color = "#FFFFFF";
            startBtn.addEventListener("click", () => {    
                startBtn.style.backgroundColor = "#CFCFCF";
                startBtn.style.color = "#989898";
                const userDate = setInterval(() => {
                    const time = convertMs(selectedDates[0].getTime() - new Date().getTime());
                    daysRef.textContent = addLeadingZero(time.days);
                   
                    hoursRef.textContent = addLeadingZero(time.hours);
                    minutesRef.textContent = addLeadingZero(time.minutes);
                    secondsRef.textContent = addLeadingZero(time.seconds);
                    if (daysRef.textContent === "00" &&
                        hoursRef.textContent === "00" &&
                        minutesRef.textContent === "00" &&
                        secondsRef.textContent === "00") {
                        console.log(userDate);
                        clearInterval(userDate);
                    }
                }, 1000);
                startBtn.disabled = true;
                inputDateTime.disabled = true;
            })
  }
  }
};

flatpickr(inputDateTime, options);


function addLeadingZero(value) {
   
    return value.toString().padStart(2, '0');
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
//