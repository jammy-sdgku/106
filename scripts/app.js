
//table data-----------------------------------------------------------

//get the form

const form = $("#taskForm");

//get the button
const submitButton = $("#taskBtn");

//get card container
const tableBody = document.querySelector('#taskTable tbody');

//function to be triggered after clicking submit

//save data ------------------------------------------------------------
function saveTask(){

//get user info for the input
        const title = $("#txtTitle").val().trim();
        const desc = $("#taDescription").val().trim();
        const color = $("#selColor").val().trim();
        const date = $("#selDate").val().trim();
        const status = $("#selStatus").val().trim();
        const budget = $("#numBudget").val().trim();
        
         console.log(title, desc, color, date, status, budget);

//build an object
        let data = new Task(title, desc, color,date ,status, budget );
        console.log(data);

//save to the server
        $.ajax({
        type: "post",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    })
    alert(`We saved your new task as ${data.title}, with a description of ${data.description}, a color of ${data.color}, a start date of ${data.date}, having a status of ${data.status}, and a task budget of ${data.budget} successfully! Thank you for your task entry!`);
     
    $("form").get(0).reset();
}
       
//start here with display function---------------------------------------
function displayTask(task){
    
    //send to HTML table for display

    const newRow= document.createElement("tr");
    newRow.innerHTML = `
        <td>${task.title}</td>    
        <td>${task.desc}</td>
        <td>${task.color}</td>
        <td>${task.date}</td>
        <td style="background-color:${task.color}; color: white;">${task.status}</td>
        <td>$${task.budget}</td>
        <td><button class="btn btn-danger onclick="deleteData(this)">Delete</button></td>
    `;
    tableBody.append(newRow);
}
     
//delete row of data button
function deleteData(button) {

    // Get the parent row of the clicked button
    let row = button.parentNode.parentNode;

    // Remove the row from the table
    row.parentNode.removeChild(row);
};

// pull data from the server to show on page load.
function loadTasks(){
    $.ajax({
        type:"get", 
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response){
//change the JSON back to an object
            let dataJSON = JSON.parse(response);
//to get only messages/entries created by me
            for(let i=0;i<dataJSON.length;i++){
                let currentValue = dataJSON[i]
                if(currentValue.name == "Jay59"){
                   displayTask(currentValue);
                }
            }
//JSON data pulled back
            console.log(response);
//Object data pulled back and converted from JSON
            console.log(dataJSON);         
    },
        error: function(error){
            console.log(error);
        }
    });
}

// initial loading of data on page load
function init()
{
    console.log("hello im the init");
    $("#taskBtn").click(saveTask);
    loadTasks();
}

window.onload = init;// it waits until the css and the html resolved to run the logic
