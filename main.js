/*
    coisas pra fazer:
    *1 - adicionar tarefas a lista -> acho q pode ser colocado em um objeto ou em arquivo json
    2 - poder editar tarefa -> criar um botão q permita editar a tarefa
    *3 - poder apagar tarefa
    4 - colocar como concluir tarefa -> riscar tarefa concluida
    5 - mostrar quantas tarefas tem
    6 - não duplicar tarefa
    */ 
   // posso criar um objeto q guarda a variável lista, variável item e método adicionar e excluir
   
const Tasks = {
    list: [],
    render: function () {
        let ul = document.getElementById("list");
        ul.innerHTML = "";
        
        this.list.forEach((task,index)=> {
            ul.innerHTML += `<li><input type="checkbox" ${task.done ? "checked" : ""} onchange = "Tasks.toggle(${index})"><span class= ${task.done ? "completed" : ""}>${task.text}</span> <button onclick="Tasks.DelfromList(${index})">Excluir</button></li>`
        });
    },
    AddtoList: function () {
        const input = document.getElementById("inputs");
        const item = input.value;
        
        if(item){
            this.list.push({
                text: item,
                done: false
            });
            this.render();
            input.value = "";
        }
    },
    DelfromList: function (index) {
        this.list.splice(index,1);
        this.render();
    },
    toggle: function (index){
        this.list[index].done = !this.list[index].done;
        this.render();
    }
   }
document.getElementById("add").addEventListener("click", () => Tasks.AddtoList());

