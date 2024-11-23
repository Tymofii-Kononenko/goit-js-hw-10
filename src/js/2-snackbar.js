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
            console.log(`✅ Fulfilled promise in ${delay}ms`);

        })
        .catch(value => {
            console.log(`❌ Rejected promise in ${delay}ms`
            );
        })
    form.reset();
})




