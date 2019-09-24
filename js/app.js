const openFormBtn = document.querySelector('#openForm');
const form = document.querySelector('form');
const cancelFormBtn = form.querySelector('#cancelForm');
const habitList = document.querySelector('#habitList');
const colorPicker = form.querySelector('.colorPicker');
const checkboxArray = form.querySelectorAll('.custom-checkbox');

function displayElement(element) {
    element.style.display = 'inline-block';
}

function hideElement(element) {
    element.style.display = 'none';
}

function getColor() {
    for (let checkbox of checkboxArray){
        if (checkbox.firstElementChild.checked) {
            return checkbox.id;
        }
    }
}

openFormBtn.addEventListener('click', () => {
    hideElement(openFormBtn);
    displayElement(form);
})

colorPicker.addEventListener('change', (e) => {
    for (let checkbox of checkboxArray){
        const checkboxInput = checkbox.firstElementChild;
        if (checkboxInput.checked) {
            checkboxInput.checked = '';
        }
    }
    e.target.checked = 'checked'
})

form.addEventListener('submit', (e) => {
    const name = document.querySelector('#name').value;
    const goal = document.querySelector('#goal').value;
    const color = getColor();
    // const interval = document.querySelector('#interval').value;
    e.preventDefault();

    if (name === '' || goal === '') {
        const alert = form.querySelector('.alert');
        alert.style.display = '';

    } else {
        hideElement(form);
        displayElement(openFormBtn);
        document.querySelector('#name').value = '';
        document.querySelector('#goal').value = '';

        const habit = new Habit(name, goal, color);
        habit.addHabitToList();
        Storage.addHabit(habit);
    }
})

cancelFormBtn.addEventListener('click', () => {
    hideElement(form);
    displayElement(openFormBtn);

})

document.addEventListener('DOMContentLoaded', () => {
    const day = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
    if (day !== Storage.getDate()) {
        console.log('new day, new beginning')
        Storage.changeDate(day);
        Storage.updateComplete();
    }
    const habits = Storage.getHabits();
    habits.forEach((habit) => {
        habit = new Habit(habit.name, habit.goal, habit.color, habit.complete);
        habit.addHabitToList();
    })
}
);

habitList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'I') {
        const button = e.target.tagName === 'BUTTON' ? e.target : e.target.parentNode;
        const div = button.parentNode.parentNode;
        let complete = div.lastElementChild.firstElementChild.textContent;
        const goal = div.lastElementChild.lastElementChild.textContent;
        const progressBar = div.children[1].firstElementChild.firstElementChild;
        const color = progressBar.id;
        const name = div.firstElementChild.textContent;
        
        const habit = new Habit(name, goal, color, complete);

        if (button.classList.contains('progress-btn')) {
            complete++;
            Storage.updateHabit(habit, complete);
            progressBar.classList.add('progress-bar-striped', 'progress-bar-animated');
            setTimeout(() => {
                progressBar.classList.remove('progress-bar-striped', 'progress-bar-animated');
            }, 800)
            progressBar.style.width = `${complete / goal * 100}%`;
            div.lastElementChild.firstElementChild.textContent = complete;

        } else if (button.classList.contains('delete-btn')) {
            div.remove();
            Storage.removeHabit(habit)
        }
    }

}) 