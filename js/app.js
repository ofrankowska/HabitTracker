document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const form = document.querySelector('form');
    const checkboxArray = form.querySelectorAll('.custom-checkbox');
    const habitContainer = document.querySelector('#habitContainer');
    const emptyInputAlert = form.querySelector('#empty-input-alert');
    const repeatedNameAlert = form.querySelector('#repeated-name-alert');
    const wrongDataTypeAlert = form.querySelector('#wrong-data-type-alert');

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
    function closeAlerts() {
        document.querySelectorAll('.alert').forEach(alert => {
            if (alert.classList.contains('show')) {
                toggleClasses(alert, 'hide', 'show');
            }
        })
    }
    form.querySelector('.colorPicker').addEventListener('change', (e) => {
        // Whenever a new checkbox is being checked, uncheck the one that is currently checked
        for (let checkbox of checkboxArray) {
            const checkboxInput = checkbox.firstElementChild;
            if (checkboxInput.checked) {
                checkboxInput.checked = '';
            }
        }
        e.target.checked = 'checked'
    })

    // When the create habit form is submitted
    form.addEventListener('submit', (e) => {
        // DOM Elements
        const name = document.querySelector('#name').value;
        const goal = document.querySelector('#goal').value;
        // Convert checkboxArray from an array-like-object into an array, find the checked checkbox and get its id
        const color = [].slice.call(checkboxArray).filter(checkbox => checkbox.children[0].checked)[0].id;

        // Prevent the form from submitting 
        e.preventDefault();

        // Close alerts that were displayed after previous submit
        closeAlerts();

        let allowSubmit = true;
        // Check if there are any fields that were left blank
        if (name === '' || goal === '') {
            toggleClasses(emptyInputAlert, 'hide', 'show');
            allowSubmit = false;
            // Check if a habit with the same name already exists
        } if (!habits.habitArr.every(habit => habit.name.toLowerCase() !== name.toLowerCase())) {
            toggleClasses(repeatedNameAlert, 'hide', 'show');
            allowSubmit = false;
            // Check if goal is an integer
        } if (!Number.isInteger(parseFloat(goal)) && goal !== '') {
            toggleClasses(wrongDataTypeAlert, 'hide', 'show');
            allowSubmit = false;

        } if (allowSubmit) {
            // Close modal
            $('#formModal').modal("hide");

            // Create a habit
            const habit = new Habit(name, goal, color, uuidv1())
            habits.add(habit);
            Storage.addHabit(habit);

        }
    })
    // When the hide instance method has been called on create habit modal
    $('#formModal').on('hide.bs.modal', function (e) {
        // Close displayed alerts
        closeAlerts();
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
            const habit = habits.habitArr.find(obj => obj.id === div.id);
            console.log(habit)
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
                // Open modal to confirm deletion
                $('#deleteHabitModal').modal('show');
                // Delete habit once deletion is confirmed
                document.querySelector('#delete-btn').addEventListener('click', () => {
                    $('#deleteHabitModal').modal('hide');
                    div.classList.add('delete');
                    setTimeout(() => {
                        div.remove();
                        Storage.removeHabit(habit.id)
                        habits.remove(habit);
                    }, 500)

                })
            }
        }

    })
});

