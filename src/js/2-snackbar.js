import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');
const input = form.querySelector('label>input');

let delay;

input.addEventListener('input', e => {
    delay = e.currentTarget.value;

});

form.addEventListener('submit', e => {
    e.preventDefault();

    function promise(delay, state) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state === 'fulfilled') {
                    resolve(delay);
                } else {
                    reject(delay);
                }
            }, delay)
        })
    }
    promise(delay, form.elements.state.value)
        .then(value => {

            iziToast.show({
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topCenter',
                messageColor: '#ffffff',
                backgroundColor: '#16a61d'
            });

        })
        .catch(value => {
            iziToast.show({
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topCenter',
                messageColor: '#ffffff',
                backgroundColor: '#a6161f'
            });

        })
    form.reset();
})




