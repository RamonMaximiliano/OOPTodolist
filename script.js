//grabbing the elements
let formdata = document.querySelector('[data-form]');
let listdata = document.querySelector('[data-list]');
let inputdata = document.querySelector('[data-input]');

//local storage
class Storage {
    static setStorage(taksItems){
        let storage = localStorage.setItem("todo",JSON.stringify(taksItems))
        return storage
    };

    static getStorage(){
        let storage = localStorage.getItem("todo") === null ?
        [] : JSON.parse(localStorage.getItem("todo"));
        return storage
    };
}


//Array of items
let taksItems = Storage.getStorage();

// OOP Creating the class in JS
class Todo {
    constructor(id, todo) {
        this.id = id;
        this.todo = todo;
    }
};

formdata.addEventListener("submit", (e) => {
    //Preventing the form from submitting and therefore refreshing the page
    e.preventDefault();

    //Generating random number
    let numberid = Math.floor(Math.random() * 100000000000000000)

    //Instantioating an object from the class "Todo"
    const todo = new Todo(numberid, inputdata.value)


    //Taking original array, spreading it and adding the new item, and pvoding this data as the new value for the original array
    taksItems = [...taksItems, todo]

    //calling the displayData method by its class name to render the items list in the UI
    UI.displayData();

    //Clearing the input field after adding an item, in vanilla JS it would be like this: "document.querySelector(".addItem").value = '';"
    UI.claerInput();

    //Removing a list item from the UI
    UI.removeTodo();

    //add to storage
    Storage.setStorage(taksItems);
});

//Display the taksItems in the DOM using a class

class UI {
    //Method to create the long String which will form the list
    static displayData() {
        let displayData = taksItems.map((item) => {
            return `
            <div class="taskdescription">
            <p>${item.todo}</p>
            <span class="erase remove" data-id = ${item.id}>🗑️</span>
            </div>
            `
        });
        //appending the displayData string to the parent element which is "listdata", that was grabbed in the top of the JS script, as it is a string, the ".join(" ");", is necessary to separate the items 
        listdata.innerHTML = (displayData).join(" ");

        //Checking the type of variable of the variable created above
        console.log(typeof displayData)
    };

    //Method to Clear the input field after adding an item,
    static claerInput() {
        inputdata.value = "";
    };

    //Method that removes the item from the UI only, not the array
    static removeTodo(){
        listdata.addEventListener("click", (e)=>{
            if(e.target.classList.contains("remove")){
                e.target.parentElement.remove();
            }
            let btnId = e.target.dataset.id;
            UI.removeArrayTodo(btnId)
        })
    };

    static removeArrayTodo(id){
        taksItems = taksItems.filter((item)=> {
            //The +id below is the same as Number(id), the plus sign converts the variable to a number
            item.id !== +id;
        })
        Storage.setStorage(taksItems);
    };

}

window.addEventListener("DOMContentLoaded", ()=>{
    UI.displayData();
    UI.removeTodo();
})




