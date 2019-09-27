class Habits{
    constructor(){
        this.habitArr = [];
        // this.habitConatiner = document.createElement('div');
        // document.querySelector('#habitConatiner');
    }
    add(habit){
        habit.addHabit();
        this.habitArr.push(habit);
    }
    remove(habit){
        this.habitArr.forEach((item, index) => {
            if (item = habit) {
                this.habitArr.splice(index, 1)
            }
        });
    }
    getStoredHabits(){
        const storedHabits = Storage.getHabits();
        storedHabits.forEach((habit) => {
            habit = new Habit(habit.name, habit.goal, habit.color, habit.complete);
            this.add(habit);
        })
    
    }
}