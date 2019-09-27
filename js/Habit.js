class Habit {
    constructor(name, goal, color, complete = 0) {
        this.name = name;
        this.goal = goal;
        // this.interval = interval;
        this.complete = complete;
        this.color = color;
        this.index = new Date().getTime();
    }
    addHabit() {
        habitContainer.innerHTML += 
        `
        <div id=${this.index}>
            <h4>${this.name}</h4>
            <div class="d-flex">
                <div class="progress">
                    <div id="${this.color}" class="progress-bar bg-${this.color}" role="progressbar" style="width: ${this.complete/this.goal * 100}%" aria-valuenow="25"
                        aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <button type="button" class="btn btn-secondary progress-btn"><i class="fas fa-chevron-right"></i></button>
                <button type="button" class="btn btn-secondary delete-btn"><i class="fas fa-times"></i></button>
        
            </div>
            <p class="text-muted"><span class ="complete">${this.complete}</span> / <span class="goal">${this.goal}</span></p>
        </div>
        `;
    }
}

