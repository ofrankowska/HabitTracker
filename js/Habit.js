class Habit{
    constructor(name, goal){
        this.name = name;
        this.goal = goal;
        this.complete = 0;
    }
    addProgress(){
        if (this.complete < this.goal){
            this.complete++;
        }
    }
}

