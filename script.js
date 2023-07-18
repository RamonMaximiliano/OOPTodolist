//grabbing the elements
let formdata = document.querySelector('[data-form]');
let listdata = document.querySelector('[data-list]');
let inputdata = document.querySelector('[data-input]');

//Array of items
let taksItems = []

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

});


//Display the taksItems in the DOM using a class

class UI {
    //Method to create the long String which will form the list
    static displayData() {
        let displayData = taksItems.map((item) => {
            return `
            <div class="taskdescription">
            <p>${item.todo}</p>
            <span class="erase">🗑️</span>
            </div>
            `
        });
        //appending the displayData string to the parent element which is "listdata", that was grabbed in the top of the JS script, as it is a string, the ".join(" ");", is necessary to separate the items 
        listdata.innerHTML = (displayData).join(" ");

        //Checking the type of variable of the variable created above
        console.log(typeof displayData)
    }

    //Method to Clear the input field after adding an item,
    static claerInput() {
        inputdata.value = "";
    }
}






