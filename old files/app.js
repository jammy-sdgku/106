
//table data-----------------------------------------------------------

//get the form

const form = $("#taskForm");

//get the button
const submitButton = $("#taskBtn");

//get card container
const tableBody = document.querySelector('#taskTable tbody');

//function to be triggered after clicking submit

//save data ------------------------------------------------------------
$("#taskBtn").click(function(event){
       event.preventDefault();

        //get user info for the input
        const newTask = {
            title : $("#txtTitle").val().trim(),
            description : $("#taDescription").val().trim(),
            color : $("#color").val().trim(),
            date : $("#selDate").val().trim(),
            status : $("#selStatus").val().trim(),
            budget : $("#numBudget").val().trim()
        }

        //get the users json created if doesent exist
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        //add the new users to users JSON
        tasks.push(newTask);

        //save to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
    alert(`We saved your new task as ${newTask.title}, with a description of ${newTask.description}, a color of ${newTask.color}, a start date of ${newTask.date}, having a status of ${newTask.status}, and a task budget of ${newTask.budget} successfully! Thank you for your task entry!`);
     
    $("form").get(0).reset();

    loadData(); 

        
//start here with load function---------------------------------------
    function loadData(){

        //get information stored
        const titleStored = (newTask.title);
        const descriptionStored = (newTask.description);
        const colorStored = (newTask.color);
        const dateStored = (newTask.date);
        const statusStored = (newTask.status);
        const budgetStored = (newTask.budget);
        
        
        //send to HTML table for display
        const newRow= document.createElement("tr");
        newRow.innerHTML = `
            <td>${titleStored}</td>    
            <td>${descriptionStored}</td>
            <td>${colorStored}</td>
            <td>${dateStored}</td>
            <td style="bg-color:${colorStored}">${statusStored}</td>
            <td>$${budgetStored}</td>
            <td><button class="btn btn-danger onclick="deleteData(this)">Delete</button></td>
        `;
        tableBody.appendChild(newRow);
    }});
     
//delete row of data button
function deleteData(button) {

    // Get the parent row of the clicked button
    let row = button.parentNode.parentNode;

    // Remove the row from the table
    row.parentNode.removeChild(row);
};


