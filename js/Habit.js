class Habit {
    constructor(name, goal, interval) {
        this.name = name;
        this.goal = goal;
        this.interval = interval;
        this.complete = 0;
        this.div = document.createElement('div');
    }
    addHabitToList() {
        const habitList = document.querySelector('#habitList');
        this.div.innerHTML = `
        <h4>${this.name}</h4>
        <div class="d-flex mb-3">
            <div class="progress">
                <div class="progress-bar bg-success" role="progressbar" style="width: 0%" aria-valuenow="25"
                    aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <button type="button" class="btn btn-secondary progress-btn"><i class="fas fa-chevron-right"></i></button>
            <button type="button" class="btn btn-secondary delete-btn"><i class="fas fa-times"></i></button>

        </div>
        `;
        habitList.appendChild(this.div);
    }
    addProgress() {
        if (this.complete < this.goal) {
            this.complete++;
            const fraction = (this.complete / this.goal) * 100;
            const progressBar = this.div.querySelector('.progress-bar');
            progressBar.style.width = `${fraction * 100}%`;

        }
    }
}

