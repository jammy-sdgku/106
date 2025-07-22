function saveTask()
{ 
    // get the values
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();

    console.log(title, desc, color, date, status, budget);
    //build an object
    let data = new Task(title, desc, color,date ,status, budget );
    console.log(data);
     
    // save to server
    console.log("hello im the saveButton");
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
}

function displayTask(task){
    let render = `<div class = "task" style="border-color:${task.color}" >
    <div class="info">
    <h4> ${task.title}</h4>
    <p> ${task.desc}<p>
    </div>
    <label class="status">${task.status} </label>
    <div class="date-budget">
    <label> ${task.date}</label>
    <label> $${task.budget}</label>
    </div>
    </div>`
    ;
// use the content of the object to render the list section
    $(".list").append(render);
}

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
    $("#btnSave").click(saveTask);
    loadTasks();
    
}

window.onload = init;// it waits until the css and the html resolved to run the logic