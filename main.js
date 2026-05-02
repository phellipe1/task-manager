import { toggleTheme, loadTheme } from "./theme.js";
loadTheme();
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
                : `<span class= "${task.done ? "completed" : ""}">${task.text}</span>`
            }
            <div class="actions">
            <button onclick="Tasks.update(${index})">
                ${task.editing ? "Save" : "Edit"}
            </button> 
            
            <button class="btn-del" onclick="Tasks.delete(${index})"><span class="material-symbols-outlined">
delete
</span></button></p></div></li>`
        });
        document.getElementById("num-tasks").innerText = this.list.length;
    },
    // Get user input and add a new task
    add: function () {
        const input = document.getElementById("inputs");
        const item = input.value.trim();

        // to evade duplicates
        if(this.list.some(task => task.text === item)){return;}

        if(item){
            this.list.push({
                text: item,
                done: false,
                editing: false
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
window.Tasks = Tasks;
