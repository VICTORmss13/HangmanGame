const keyboardDiv = document.querySelector(".keyboard");

// Creating keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);  
    keyboardDiv.appendChild(button);
}

/* For some reason I couldn`t make this script work and the buttons were not created. 
TODO: try to discover why and fix this*/
