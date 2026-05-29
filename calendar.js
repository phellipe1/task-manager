let currentDate = new Date();

export function renderCalendar(){
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startday = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const grid = document.getElementById("calendar-grid");
    grid.innerHTML = "";
    
    // empty cell 
    for(let i = 0; i < startday; i++){
        const empty = document.createElement("div");
        grid.appendChild(empty);
    }
    for(let day = 1; day <= daysInMonth; day++){
        // make calendar grid of current month
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        const currentDayDate = new Date(year, month, day).toLocaleDateString("pt-BR");
        const tasksOfDay = window.Tasks.list.filter(task => task.dueDate === currentDayDate);
        dayElement.innerHTML = `
            <strong>${day}</strong>
        `;
        // show the two first tasks 
        tasksOfDay.slice(0,2).forEach(task =>{
            const taskElement = document.createElement("p");
            taskElement.textContent = task.text;
            taskElement.classList.add("calendar-task");
            dayElement.appendChild(taskElement);
        });
        // limit tasks visibility in cell
        if(tasksOfDay.length > 2){
            const more = document.createElement("span");
            more.textContent =
                `+${tasksOfDay.length - 2} more`;
            dayElement.appendChild(more);
        }

        grid.appendChild(dayElement);

    }
    document.getElementById("month-year").innerText = `${month + 1}/${year}`;

}
export function prevMonth(){ 
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    }
export function nextMonth(){
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    }