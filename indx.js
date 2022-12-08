let input_text=document.querySelector(".input_text")
let todo_button=document.querySelector(".todo_buttons")
let listItems=document.querySelector(".list_items")







let addTodoLists=(id,txt)=>{
            let l=document.createElement("li")
            l.id=id
            l.classList.add("list_item")
            l.innerHTML=`
            <span>${txt} </span> <button class="todo_button" ><i class="fa-solid fa-trash"></i></button></li>
            `
         listItems.appendChild(l)
         console.log(l)
         input_text.value=""

        //  delete items 
        let delete_button=l.querySelector(".todo_button")
        delete_button.addEventListener("click",deleteSection)
}



// delete section
let deleteSection=(e)=>{
        let element=e.target.parentElement.parentElement
        listItems.removeChild(element)
        massageShow("msg-removed","the massage is removed")
        
        let todos=addTodosToLocalStorage()
        todos=  todos.filter(tdo=> tdo.id!=element.id)
        localStorage.setItem("getTodos",JSON.stringify(todos))

}


// massage section
let massageShow=(cls,txt)=>{
    let p=document.querySelector("#msg")
    p.classList.add(cls)
    p.innerHTML=txt
    setTimeout(() => {
        p.classList.remove(cls)
        p.innerHTML=""
    }, 1000);
}


// add todos to localStorage
let addTodosToLocalStorage=()=>{
   
  return localStorage.getItem("getTodos") ? JSON.parse(localStorage.getItem("getTodos")) : []
}

// when todo_button is clicked it create a todo list
todo_button.addEventListener("click",(e)=>{
        e.preventDefault()
        let txt=input_text.value
        let id=Date.now().toString()

        addTodoLists(id,txt)
       massageShow("msg-added","New todo is added")

    //  add todos to local storage 

    let todos=addTodosToLocalStorage()
    todos.push({id,txt})
    localStorage.setItem("getTodos",JSON.stringify(todos))
    
})


window.addEventListener("DOMContentLoaded",()=>{
    let tdos=addTodosToLocalStorage()
    tdos.map((tdo)=>{
        addTodoLists(tdo.id,tdo.txt)
    })
})