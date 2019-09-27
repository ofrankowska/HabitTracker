document.addEventListener('DOMContentLoaded', () => {
    const openFormBtn = document.querySelector('#openForm');
    const form = document.querySelector('form');
    const checkboxArray = form.querySelectorAll('.custom-checkbox');
    const habitContainer = document.querySelector('#habitContainer');

    const habits = new Habits();
    habits.getStoredHabits();

    function toggleClasses(element, ...classNames) {
        classNames.forEach(className => element.classList.toggle(className));
    }

    function getColor() {
        for (let checkbox of checkboxArray) {
            if (checkbox.firstElementChild.checked) {
                return checkbox.id;
            }
        }
    }

    openFormBtn.addEventListener('click', () => {
        toggleClasses(openFormBtn, 'hide', 'show');
        toggleClasses(form, 'hide', 'show');
    })

    form.querySelector('.colorPicker').addEventListener('change', (e) => {
        for (let checkbox of checkboxArray) {
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
            toggleClasses(alert, 'hide', 'show');
            setTimeout(() => toggleClasses(alert, 'hide', 'show'), 3000)

        } else {
            toggleClasses(openFormBtn, 'hide', 'show');
            toggleClasses(form, 'hide', 'show');
            document.querySelector('#name').value = '';
            document.querySelector('#goal').value = '';

            const habit = new Habit(name, goal, color)
            habits.add(habit);
            Storage.addHabit(habit);

        }
    })

    form.querySelector('#cancelForm').addEventListener('click', () => {
        toggleClasses(openFormBtn, 'hide', 'show');
        toggleClasses(form, 'hide', 'show');
    })


    const day = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
        .getTime();
    if (day !== Storage.getDate()) {
        console.log('new day, new beginning')
        Storage.changeDate(day);
        Storage.updateComplete();
    }


    habitContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'I') {
            const button = e.target.tagName === 'BUTTON' ? e.target : e.target.parentNode;
            const div = button.parentNode.parentNode;
            const habit = habits.habitArr.filter(obj => obj.index == div.id)[0];
            const progressBar = div.children[1].firstElementChild.firstElementChild;

            if (button.classList.contains('progress-btn')) {
                habit.complete += 1;
                Storage.updateHabit(habit, habit.complete);

                progressBar.classList.add('progress-bar-striped', 'progress-bar-animated');
                setTimeout(() => {
                    progressBar.classList.remove('progress-bar-striped', 'progress-bar-animated');
                }, 800)
                progressBar.style.width = `${habit.complete / habit.goal * 100}%`;

                div.lastElementChild.firstElementChild.textContent = habit.complete;

            } else if (button.classList.contains('delete-btn')) {
                div.remove();
                Storage.removeHabit(habit)
                habits.remove(habit);
            }
        }

    })
});