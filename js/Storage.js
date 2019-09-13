class Storage{
    static getHabits(){
        let habits;
        if (localStorage.getItem('habits') === null){
            habits = [];
        } else {
            habits = JSON.parse(localStorage.getItem('habits'));
        }
    }
    static addHabit(habit){
        const habits = this.getHabits;
        habits.push(habit);
        localStorage.setItem('habits', JSON.stringify(habits));
    }
    static removeHabit(habit){
        const habits = this.getHabits;
        habits.forEach((item, index) => {
            if (item === habit){
                habits.splice(index, 1)
            }
        });
        localStorage.setItem('habits', JSON.stringify(habits));
    }
}