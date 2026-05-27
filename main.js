import { toggleTheme, loadTheme } from "./theme.js";
import { currentStatus, realDate } from "./states.js";
loadTheme();
let currentDate = new Date();
const Tasks = {
    list: [],
    // Render all tasks to the DOM
    render: function () {
        let ul = document.getElementById("list");
        ul.innerHTML = "";
        if(!this.list.length){
            ul.innerHTML = "<p>No task's been defined yet.</p>";
        }
        this.list.forEach((task,index)=> {
            ul.innerHTML += `<li><p>
                <input type="checkbox" ${task.done ? "checked" : ""} onchange = "Tasks.toggle(${index})">
            
            ${
                task.editing 
                ? `<input type="text" value="${task.text}" onchange="Tasks.save(${index}, this.value)">`
                : `<span class= "${task.done ? "completed" : ""}">${task.text} ${currentStatus(task.dueDate)} ${task.dueDate}</span>`
            }
            <div class="actions">
            <button onclick="Tasks.update(${index})">
                ${task.editing ? "Save" : "Edit"}
            </button> 
            
            <button class="btn-del" onclick="Tasks.delete(${index})"><span class="material-symbols-outlined">
delete
</span></button></div></p></li>`
        });
        document.getElementById("num-tasks").innerText = this.list.length;
    },
    renderCalendar: function (){
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const startday = firstDay.getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const grid = document.getElementById("calendar-grid");
        grid.innerHTML = "";

        for(let i = 0; i < startday; i++){
            const empty = document.createElement("div");
            grid.appendChild(empty);
        }
        for(let day = 1; day <= daysInMonth; day++){
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");

            dayElement.innerHTML = `
                <strong>${day}</strong>
            `;
            grid.appendChild(dayElement);
        }
        document.getElementById("month-year").innerText = `${month + 1}/${year}`;

    },
    prevMonth: function(){
        currentDate.setMonth(currentDate.getMonth() - 1);
        this.renderCalendar();
    },
    nextMonth: function(){
        currentDate.setMonth(currentDate.getMonth() + 1);
        this.renderCalendar();
    },
    // Get user input and add a new task
    add: function () {
        const input = document.getElementById("inputs");
        const itemDate = document.getElementById("date");
        const item = input.value.trim();
        const date = new Date(itemDate.value + "T00:00");
        // to evade duplicates
        if(this.list.some(task => task.text === item)){return;}
        if(item){
            this.list.push({
                id: crypto.randomUUID(),
                text: item,
                dueDate: date == "Invalid Date" ? "" : date.toLocaleDateString('pt-BR'),
                done: false,
                editing: false
            });
            this.list.sort((a,b) => {
                if(!a.dueDate) return 1;
                if(!b.dueDate) return -1;

                return realDate(a.dueDate) - realDate(b.dueDate);
            });
            this.render();
            this.saveToStorage();
            input.value = "";
        }
    },
    // Remove a task from the list
    delete: function (index) {
        this.list.splice(index,1);
        this.render();
        this.saveToStorage();
    },
    // Toggle task completion status
    toggle: function (index){
        this.list[index].done = !this.list[index].done;
        this.render();
        this.saveToStorage();
    },
    // Edit tasks
    update: function(index){
        this.list[index].editing = !this.list[index].editing;
        this.render();
    },
    // Save Edition
    save: function(index, newValue){
        const value = newValue.trim();

        if(!value){ return; }
        // to evade duplicates
        if(this.list.some((task,i) => task.text === value && i !== index)){
            return;
        }
        // edit task
        this.list[index].text = value;
        this.list[index].editing = false;
        this.render();
        this.saveToStorage();
    },
    saveToStorage: function(){
        localStorage.setItem("tasks", JSON.stringify(this.list));
    },
    loadFromStorage: function(){
        const data = localStorage.getItem("tasks");
        if(data){
            this.list = JSON.parse(data);
        }
    }
   }
document.getElementById("add").addEventListener("click", () => Tasks.add());

Tasks.loadFromStorage();
Tasks.render();
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-toggle");
    toggle.addEventListener("click", toggleTheme);}
);
document.getElementById("btn-calendar").addEventListener("click", () => {Tasks.renderCalendar()});
document.getElementById("prev-month").addEventListener("click", () => {Tasks.prevMonth()});
document.getElementById("next-month").addEventListener("click", () => {Tasks.nextMonth()});
window.Tasks = Tasks;
