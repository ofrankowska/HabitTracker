document.addEventListener('DOMContentLoaded', () => {

    // DOM Elements
    const form = document.querySelector('form');
    const checkboxArray = form.querySelectorAll('.custom-checkbox');
    const habitContainer = document.querySelector('#habitContainer');
    const alert = form.querySelector('.alert');

    function updateDate() {
        const day = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
            .getTime();
        // Check if the date is different than in the local storage
        if (day !== Storage.getDate()) {
            // Update date in the local storage
            Storage.changeDate(day);
            // Set the complete parameter to 0 for every habit in the local storage
            Storage.updateComplete();
        }
    }

    updateDate();
    const habits = new Habits();
    // Display all habits thst are in the local storage
    habits.getStoredHabits();

    function toggleClasses(element, ...classNames) {
        // If the class exists, remove it, if not, then add it
        classNames.forEach(className => element.classList.toggle(className));
    }

    form.querySelector('.colorPicker').addEventListener('change', (e) => {
        // Whenever a checkbox is checked, uncheck the previously checked one
        for (let checkbox of checkboxArray) {
            const checkboxInput = checkbox.firstElementChild;
            if (checkboxInput.checked) {
                checkboxInput.checked = '';
            }
        }
        e.target.checked = 'checked'
    })


    form.addEventListener('submit', (e) => {
        // DOM Elements
        const name = document.querySelector('#name').value;
        const goal = document.querySelector('#goal').value;

        // Convert checkboxArray from an array-like-object into an array, find the checked checkbox and get its id
        const color = [].slice.call(checkboxArray).filter(checkbox => checkbox.children[0].checked)[0].id;

        // Prevent the form from submitting 
        e.preventDefault();

        // Check if there are any fields that were left blank
        if (name === '' || goal === '') {
            toggleClasses(alert, 'hide', 'show');

        } else {
            // Close alert if it's displayed
            if (alert.classList.contains('show')) {
                toggleClasses(alert, 'hide', 'show');
            }

            // Close modal
            $('#formModal').modal("hide");

            // Set form inputs to empty strings
            document.querySelector('#name').value = '';
            document.querySelector('#goal').value = '';

            // Create a habit
            const habit = new Habit(name, goal, color)
            habits.add(habit);
            Storage.addHabit(habit);

        }
    })

    form.querySelector('#cancelForm').addEventListener('click', () => {
        if (alert.classList.contains('show')) {
            toggleClasses(alert, 'hide', 'show');
        }
        // Set form inputs to empty strings
        document.querySelector('#name').value = '';
        document.querySelector('#goal').value = '';

    })

    habitContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'I') {
            // DOM Elements
            const button = e.target.tagName === 'BUTTON' ? e.target : e.target.parentNode;
            const div = button.parentNode.parentNode;
            const progressBar = div.children[1].firstElementChild.firstElementChild;

            // Get the chosen habit 
            const habit = habits.habitArr.filter(obj => obj.index == div.id)[0];

            // Check if the progress button was clicked
            if (button.classList.contains('progress-btn')) {
                // Add progress 
                habit.complete += 1;
                Storage.updateHabit(habit, habit.complete);
                toggleClasses(progressBar, 'progress-bar-striped', 'progress-bar-animated')
                setTimeout(() => {
                    toggleClasses(progressBar, 'progress-bar-striped', 'progress-bar-animated')
                }, 800)
                progressBar.style.width = `${habit.complete / habit.goal * 100}%`;

                div.lastElementChild.firstElementChild.textContent = habit.complete;

                // Check if the remove button was clicked
            } else if (button.classList.contains('delete-btn')) {
                div.classList.add('delete');
                setTimeout(() => {
                    div.remove();
                }, 500)
                Storage.removeHabit(habit)
                habits.remove(habit);
            }
        }

    })
});

