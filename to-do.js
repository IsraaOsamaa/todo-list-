
let task = document.querySelector('.add_task input');
let addButton = document.querySelector('.add_task button');
let allTasks = document.querySelector('.tasks');
let doneDiv = document.querySelector('.done')
let count=0;



// when the program start check local storage 
    // localStorage.clear();
    getFromLocalStorage();
    
    if(localStorage.length !== 0){
        count=localStorage.length;
    }

    // display done tasks
    
    if(document.querySelector('.done .divTask') !== false){
        document.querySelector('.done').style.display = 'block'  ;
    }else{
        document.querySelector('.done').style.display = 'none'  ;   
    }
    // add button action
    addButton.addEventListener('click' , ()=>{  
        if(task.value !== ''){ 
            // check count is not a key in local storages
            check(count);
        
        ////// check(count) //// this is done 
            for(let i=0 ; i< localStorage.length ; i++){
                if(count == localStorage.key(i)){
                    count++ ;
                    
                }
            }

            /////
        
            allTasks.appendChild(addToTasks(task.value , count));
            
        
        // add tasks to lacal storage
        addToLocalStorage(count , task.value)
        // clear input box
        task.value ='';
        // increase the count var
        count++ ;
    }
});


// delete button action
document.addEventListener('click' , (e)=>{
        
        // check its a delete button
         document.querySelectorAll('div .delete-button').forEach((deleteB)=>{
            if(e.target=== deleteB){
                removeFromLocalStorage(deleteB.parentElement.getAttribute('taskNO'))
                removeFromPage(e.target); 
                count--;
         }
        })     
    }
)

// done button action
document.addEventListener('click', (e)=>{
    // check the done button
    document.querySelectorAll('.done-button').forEach((doBu)=>{
        if(e.target === doBu){
            // remove task from tasks
            removeFromLocalStorage(doBu.parentElement.getAttribute('taskNo'));
            removeFromPage(doBu);

            // add task to done tasks
            let doneTaskText = doBu.parentElement.querySelector('p').getInnerHTML();
            doneDiv.appendChild(addToDone( doneTaskText, doBu.parentElement.getAttribute('taskNo')));
            
            count--;
        }
    })
})

// undo button action
document.addEventListener('click', (e)=>{
    //1/ add task to all tasks
    // check the done button
    document.querySelectorAll('.undone-button').forEach((undoBu)=>{
        if(e.target === undoBu){
            ////// check(count) //// this is done 
            for(let i=0 ; i< localStorage.length ; i++){
                if(count == localStorage.key(i)){
                    count++ ;
                    
                }
            }
            let tasktext = undoBu.parentElement.querySelector('p').getInnerHTML();
            allTasks.appendChild(addToTasks(tasktext , count));
        //2/ add tasks to lacal storage
        addToLocalStorage(count , tasktext)
        }

        //3/ remove it from done tasks 
        removeFromLocalStorage(undoBu.parentElement.getAttribute('taskNO'))
        removeFromPage(e.target);

        //4/ increase count
        count++;
    })
})

// when the program start check local storage 
 function getFromLocalStorage(){
        if(localStorage.length !== 0){
            // add tasks to allTasks Div from local storage
            for(let i=0 ; i< localStorage.length ; i++){
                allTasks.appendChild(addToTasks(localStorage.getItem(localStorage.key(i)) , localStorage.key(i)));
               
            }
         
        }
    }
// create div task 
function addToTasks(taskStetment , taskNO){
    let divTask = document.createElement('div');
    let value = document.createElement('p');
    let textVulue = document.createTextNode(taskStetment);
    let deleteButton = document.createElement('button');
    let deleteText = document.createTextNode('delete task');
    let doneButton = document.createElement('button');
    let doneText = document.createTextNode('done!');

    // add paragraph , delete Button and done Buttons to tasks Div
    value.appendChild(textVulue);
    deleteButton.appendChild(deleteText);
    doneButton.appendChild(doneText);
    divTask.appendChild(value);
    divTask.appendChild(deleteButton);
    divTask.appendChild(doneButton);

    divTask.setAttribute('taskNO', taskNO)
     // add Class name to paragraph and delete button
     value.classList.add('created-task');
     deleteButton.classList.add('delete-button');
     doneButton.classList.add('done-button');
     divTask.classList.add('divTask');

   
   return divTask;
}
function addToDone(taskStetment , taskNo){
    let divTask = document.createElement('div');
    let value = document.createElement('p');
    let textVulue = document.createTextNode(taskStetment);
    let undoneButton = document.createElement('button');
    let undoneText = document.createTextNode('unDone');

    // add paragraph , delete Button and done Buttons to tasks Div
    value.appendChild(textVulue);
    undoneButton.appendChild(undoneText);
    divTask.appendChild(value);
    divTask.appendChild(undoneButton);

    divTask.setAttribute('taskNO', taskNo)
     // add Class name to paragraph and delete button
     value.classList.add('done-task');
     undoneButton.classList.add('undone-button');
     divTask.classList.add('divTask');

   
   return divTask;
}
// add to local storage
function addToLocalStorage(key , value){
    window.localStorage.setItem(key , value);
}

function removeFromPage(targetButton){
    targetButton.parentElement.remove();
}

function removeFromLocalStorage(k){
    window.localStorage.removeItem(k);
}

function check(t){
    for(let i=0 ; i< localStorage.length ; i++){
        if(t == localStorage.key(i)){
            t++ ;
            return; 
        }
    }
}