var taskButton = document.getElementById("taskButton")
var taskInput = document.getElementById("taskInput")
var todoColonna = document.getElementById("todoColonna")
var doingColonna = document.getElementById("doingColonna")
var doneColonna = document.getElementById("doneColonna")

taskButton.addEventListener("click", createTask);

function createTask() {
  var testo = taskInput.value.trim()
  
  if(testo!="" && testo.trim()!=""){
    var card = createCard(testo)
    taskInput.value="";
    todoColonna.appendChild(card)

  }

  
  console.log(testo)
}
function createCard(testo) {
  var card = document.createElement('div');
  card.className = 'kanban-card';
  card.draggable= true

  var title = document.createElement('span');
  title.className = 'kanban-card-title';
  title.textContent = testo;
  card.appendChild(title)

  var btnDiv = document.createElement('div');
  btnDiv.className = 'float-end';

  var btnDelete = document.createElement('button');
  btnDelete.className = 'btn btn-danger btn-sm';
  btnDelete.textContent = "X";
 
  btnDelete.addEventListener("click", function ()
  {
    card.remove()
  })
   btnDiv.appendChild(btnDelete) 
   var btnModifica = document.createElement('button');
  btnModifica.className = 'btn btn-primary btn-sm';
  btnModifica.textContent = "Modifica";

  btnModifica.addEventListener("click", function ()
  { 
    var newText=prompt("inserisci testo", title.textContent)
    if (newText!="" && newText.trim()!=""){
      title.textContent = newText.trim()
    }
  })

  btnDiv.appendChild(btnModifica) 

 

  card.appendChild(btnDiv)
  card.addEventListener('dragstart', function()
  {
    draggedcard = card
    card.classList.add('dragging')

  })
  card.addEventListener('dragend', function()
  {
    draggedcard=null
    card.classList.remove('dragging')
    card.className = 'kanban-dragging'
  })

  var colonne = [todoColonna, doingColonna, doneColonna];

  colonne.forEach(colonna => {
    colonna.addEventListener('dragover', function(e){
      e.preventDefault()
      colonna.className='kanban-colonna-dragover'
    })
    colonna.addEventListener('dragleave', function(){
      colonna.className='kanban-colonna'
    })
    colonna.addEventListener('drop' ,function(e){
      e.preventDefault()
      colonna.className='kanban-colonna'
      if(draggedcard!=null){
        colonna.appendChild(draggedcard)
      }
    })
  })

return card;



}
  