const openFormBtn = document.querySelector('#openForm');
const form = document.querySelector('form');
const createHabitBtn = form.querySelector('#createHabit');
const cancelFormBtn = form.querySelector('#cancelForm');
const habitList = document.querySelector('#habitList');

function displayElement(element) {
    element.style.display = 'inline-block';
}

function hideElement(element) {
    element.style.display = 'none';
}

openFormBtn.addEventListener('click', () => {
    hideElement(openFormBtn);
    displayElement(form);
})

form.addEventListener('submit', (e) => {
    const name = document.querySelector('#name').value;
    const goal = document.querySelector('#goal').value;
    const interval = document.querySelector('#interval').value;
    e.preventDefault();
    if (name === '' || interval ==='') {
        const alert = form.querySelector('.alert');
        alert.style.display ="";
    } else {
        hideElement(form);
        displayElement(openFormBtn);
        document.querySelector('#name').value = '';
        document.querySelector('#goal').value = '';

        const habit = new Habit(name, goal, interval);
        habit.addHabitToList();
        Storage.addHabit(habit);
    }
})

cancelFormBtn.addEventListener('click', () => {
    hideElement(form);
    displayElement(openFormBtn);

})

document.addEventListener('DOMContentLoaded', () => {
    const habits = Storage.getHabits();
    habits.forEach((habit) => {
        console.log(habit)
        habit = new Habit(habit.name, habit.goal);
        habit.addHabitToList();
    })
}
);

habitList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'I') {
        const button = e.target.tagName === 'BUTTON' ? e.target : e.target.parentNode;
        const habit = button.parentNode.parentNode;
        console.log(habit)
        // habit = new Habit()

        // if (button.classList.contains('progress-btn')) {
        //     habit.addProgress();

        // } else if (button.classList.contains('delete-btn')) {
        //     habit.remove();
        //     Storage.removeHabit(habit)
        // }
    } 
   
}) 