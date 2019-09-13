const openFormBtn = document.querySelector('#openForm');
const form = document.querySelector('form');
const createHabitBtn = form.querySelector('#createHabit')

function displayElement(element){
    element.style.display = 'inline-block';
}

function hideElement(element){
    element.style.display = 'none';
}

openFormBtn.addEventListener('click', () => {
    hideElement(openFormBtn);
    displayElement(form);
})

createHabitBtn.addEventListener('click', () => {
    hideElement(form);
    displayElement(openFormBtn);
})

