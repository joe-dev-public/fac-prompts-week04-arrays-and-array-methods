const inputElement = document.getElementById('input');

const submitElement = document.getElementById('submit');

const methodElements = document.getElementsByName('method');

const outputElement = document.getElementById('output');


function filterMethod(arr) {

    let newArr = arr.filter( element => {

        if (element % 2 === 0){ return element; }

    });

    return newArr;
    //console.log(newArr);

}


function reduceMethod(arr) {

    let result = arr.reduce( (curr, prev) => {

        return Number(curr) + Number(prev);

    });

    return result;

}


function prepareArray(str) {

    // todo: trim whitespace properly
    let arr = str.split(", ");

    //console.log(arr);

    return arr;

}


function validateInput(str) {

    // valid input is (one or more digits only)(comma)(zero or more spaces)[repeat].
    // just need to be careful about final trailing comma not being there...
    // todo: fix this :)
    let re1 = new RegExp(/^(?:\d+, *)+(\d+|,| *)$/); 

    if (re1.test(str) === true){
        return true;
    } else {
        return false;
    }

}


function displayResult(data, array) {

    if (array === true){

        data.forEach( element => {

            outputElement.innerHTML += `<div>${element}</div>`;

        });

    } else {

        outputElement.innerHTML = `<div>${data}</div>`;

    }

}


function doThings() {

    let method = '';

    methodElements.forEach( element => {

        if (element.checked === true){

            method = element.value;

        }

    });

    let str = inputElement.value;

    if (validateInput(str) === true){

        let arr = prepareArray(str);

        if (method === 'filter'){
            displayResult(filterMethod(arr), true);
        } else if (method === 'reduce'){
            displayResult(reduceMethod(arr), false);
        }

    } else {

        // todo: show validation error

    }

}

submitElement.onclick = doThings;