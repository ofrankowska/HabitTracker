class Storage {

    // Storage of all the created habits
    static getHabits() {
        let habits;
        if (localStorage.getItem('habits') === null) {
            habits = [];
        } else {
            habits = JSON.parse(localStorage.getItem('habits'));
        }
        return habits;
    }
    static addHabit(habit) {
        const habits = this.getHabits();
        habits.push(habit);
        localStorage.setItem('habits', JSON.stringify(habits));
    }
    static removeHabit(id) {
        const habits = this.getHabits();
        habits.forEach((habit, index) => {
            if (habit.id == id) {
                habits.splice(index, 1)
            }
        });
        localStorage.setItem('habits', JSON.stringify(habits));
    }
    static updateHabit(habit, complete) {
        const habits = this.getHabits();
        habits.forEach((item, index) => {
            if (item.name === habit.name) {
                habit.complete = complete;
                habits.splice(index, 1, habit)
            }
        });
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    // Date storage

    static getDate(){
        let day;
        if (localStorage.getItem('day') === null) {
            day = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
            localStorage.setItem('day', JSON.stringify(day));

        } else {
            day = JSON.parse(localStorage.getItem('day'));
        }
        return day;
    }
    static changeDate(day){
        localStorage.setItem('day', JSON.stringify(day));
    }
    static updateComplete(){
        const habits = this.getHabits();
        habits.forEach((habit, index) => {
                habit.complete = 0;
                habits.splice(index, 1, habit)
        });
        localStorage.setItem('habits', JSON.stringify(habits));

    }
}