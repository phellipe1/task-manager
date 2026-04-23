/*
    coisas pra fazer:
    1 - adicionar tarefas a lista -> acho q pode ser colocado em um objeto ou em arquivo json
    2 - poder editar tarefa -> criar um botão q permita editar a tarefa
    3 - poder apagar tarefa -> autoexplicativo
    4 - colocar como concluir tarefa -> riscar tarefa concluida
    5 - mostrar quantas tarefas tem
    6 - não duplicar tarefa
    */ 
   // posso criar um objeto q guarda a variável lista, variável item e método adicionar e excluir
   
const Tarefas = {
    list: [],
    render: function () {
            // funciona, mas deve refazer
            //document.getElementById('list').innerHTML += `<li>${this.list.at(-1).text}</li>`;
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
    DelfromList: function () {
        // fazer dps
 }
   }
document.getElementById("add").addEventListener("click", () => Tarefas.AddtoList());