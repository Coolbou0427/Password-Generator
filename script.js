const sym = document.getElementById('symbols');
const lett = document.getElementById('letters');
const num = document.getElementById('numbers');
const len = document.getElementById('len');
const lengthDisplay = document.getElementById('length');
const go = document.getElementById('generate');
const out = document.getElementById('output');
const copytoclipboard = document.getElementById('clipboard');
let pass = "";


lengthDisplay.textContent = len.value;
len.addEventListener('input', () => {
    lengthDisplay.textContent = len.value;
});

go.addEventListener('click', () => {
    const length = parseInt(len.value);
    let numberOfTypes = 0;

    if(sym.checked) numberOfTypes += 1;
    if(lett.checked) numberOfTypes += 1;
    if(num.checked) numberOfTypes += 1;

    let pass = "";
    let changedLength = length;
    
    if(num.checked) {
        const possibleNumbers = ["1","2","3","4","5","6","7","8","9","0"];
        let generatedNumber = Math.floor(length / numberOfTypes) + (--numberOfTypes < length % numberOfTypes ? 1 : 0);
        for (let i = 0; i < generatedNumber; i++) {
            pass += possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)];
        }
        changedLength -= generatedNumber;
    }
    
    if(sym.checked) {
        const symbolsIncluded = ["!","@","#","$","%","^","&","*","-","_","=","+","~","/","[","]","{","}",";",":","'",'"',"|",",",".","<",">","?"];
        let generatedNumber = Math.floor(changedLength / numberOfTypes) + (--numberOfTypes < changedLength % numberOfTypes ? 1 : 0);
        for (let i = 0; i < generatedNumber; i++) {
            pass += symbolsIncluded[Math.floor(Math.random() * symbolsIncluded.length)];
        }
        changedLength -= generatedNumber;
    }
    
    if(lett.checked) {
        const possibleLetters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
        for (let i = 0; i < changedLength; i++) {
            let letter = possibleLetters[Math.floor(Math.random() * possibleLetters.length)];
            pass += Math.random() < 0.5 ? letter.toUpperCase() : letter;
        }
    }    

    let arr = pass.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    pass = arr.join('');
    out.textContent = pass;
    console.log(pass.length);
});

copytoclipboard.addEventListener('click', () => {
    const output = document.getElementById('output');
    const tempTextarea = document.createElement('textarea');
    document.body.appendChild(tempTextarea);
    tempTextarea.value = output.textContent;
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
});
