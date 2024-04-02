import iziToast from "izitoast";   
import "izitoast/dist/css/iziToast.min.css"; 

const form = document.querySelector(".form"); 

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const { delay, state } = event.currentTarget.elements;

    
    const delayValue = parseInt(delay.value);
    if (isNaN(delayValue) || delayValue <= 0) {
        iziToast.error({
            title: 'Error',
            titleColor: 'black',
            backgroundColor: '#EF4040',
            color: '#FFFFFF',
            message: `❌ Please enter a valid positive integer for delay`,
            position: 'topRight',
        });
        return;
    }

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state.value === "fulfilled") {
                resolve();
            } else {
                reject();
            }
        }, delayValue);
    });

    
    promise
        .then(() => {
            iziToast.success({
                title: 'OK',
                titleColor: 'black',
                backgroundColor: '#59A10D',
                color: '#FFFFFF',
                message: `✅ Fulfilled promise in ${delayValue}ms`,
                position: 'topRight',
            });
        })
        .catch(() => {
            iziToast.error({
                title: 'Error',
                titleColor: 'black',
                backgroundColor: '#EF4040',
                color: '#FFFFFF',
                message: `❌ Rejected promise in ${delayValue}ms`,
                position: 'topRight',
            });
        });
}