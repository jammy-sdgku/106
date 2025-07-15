function hello(){
    console.log("hello there!");
}

function init(){
    console.log("hello , Im the init");
    hello();
}

window.onload = init;  //this line waits for the logic and html to finish loading.