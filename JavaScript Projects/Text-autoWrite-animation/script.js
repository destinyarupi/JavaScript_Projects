//Steps
//1. save your text in a variable
//2. set a variable to the index of 0
//3. use string.slice() to break down the string and start it from index of 0 to its total index 
//4. use index++ to increase the value of the initially set index from 0 to the total length of the string
//5. set a condition that if the index exceeds the length of the string set it back to zero
//6. use setInterval() to repeat

const text = "Proactively incubate web-enabled channels";

let index = 0;

function writeText() {
    document.body.innerText = text.slice(0, index);

    index++;

    if (index > text.length) {
        index = 0;
    }
}

setInterval(writeText, 250);
