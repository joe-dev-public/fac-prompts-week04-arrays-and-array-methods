'use strict';

/*

    Todo:


    Low priority:
        - Add more tests/complete this bit.
        - Put tests in another script and import/include. Don't clog the main script :)
            - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules


    Stuff to learn:
        - Could that slightly unwieldy 3-stage validation check just be one cool regexp?

*/

function windowLoaded() {

    const formElement = document.getElementById('form');
    const inputElement = document.getElementById('input');
    const submitElement = document.getElementById('submit');
    const methodElements = document.getElementsByName('method');
    const testsElement = document.getElementById('tests');
    const outputElement = document.getElementById('output'); // No longer used?
    const resultsElement = document.getElementById('results');
    const messageElement = document.getElementById('message');

    formElement.onsubmit = function(event) { event.preventDefault(); }

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

        // split by commas
        let arr = str.split(/ *, */);

        // "quirks": last item can be empty or have trailing spaces; first item can have leading spaces (neither affects maths afaik).

        //console.log(arr);

        return arr;

    }


    function validateInput(str) {

        // valid input: (start)(0+ spaces)[(1+ digits)(0+ spaces)(exactly 1 comma)(0+ spaces)](1 or more times)(end)
        let re1 = new RegExp(/^ *(\d+ *, *)+$/);

        if (re1.test(str) === true){
            return true;
        } else {

            // Handle the "no final comma" case:
            let re2 = new RegExp(/^ *(\d+ *, *)+ *(\d+ *)$/);

            if (re2.test(str) === true){
                return true;
            } else {

                // If that fails, handle the "one number, any number of spaces, no commas" case:
                let re3 = new RegExp(/^ *\d+ *$/);

                if (re3.test(str) === true){
                    return true;
                } else {
                    return false;
                }

            }

        }

    }


    function displayResult(data, array) {

        let html = '';

        if (array === true){

            data.forEach( element => {

                html += `<span class="result">${element}</span>`;

            });

        } else {

            html = `<span class="result">${data}</span>`;

        }

        messageElement.classList.add('hidden');
        resultsElement.innerHTML = html;

    }


    function displayMessage(msg) {

        resultsElement.innerHTML = '';
        messageElement.classList.remove('hidden');

        messageElement.innerHTML = msg;

/* 
        messageElement.classList.remove('neutral');

        messageElement.classList.add('error');
 */

    }


    function runTests() {

        // I'd like to do programmatic tests which generate prefix/suffix/both of space, comma, letter, number against all of the above, BUT
        // the problem is you have to specify whether or not each test should pass or fail. So.. that doesn't exactly work.
        // But you can still save some space by maybe writing down the expected results, but not coding each individual test? (See above.)
        // Oh, and of course letter prefixes/suffixes should always fail, so you don't need to write results for that.

        const tests = [
            {
                'name': 'Single digit',
                'content': '1',
                'expected': true,
                'digitPrefix': true,
                'digitSuffix': true,
                'spacePrefix': true,
                'spaceSuffix': true,
                'commaPrefix': false,
                'commaSuffix': true,
            },
            {
                'name': 'Single letter',
                'content': 'a',
                'expected': false,
            },
            {
                'name': 'Single space',
                'content': ' ',
                'expected': false,
            },
            {
                'name': 'Single comma',
                'content': ',',
                'expected': false,
            },
            {
                'name': 'Nicely-formatted list',
                'content': '1, 1',
                'expected': true,
            },
            {
                'name': 'Happy commas but no spaces',
                'content': '1,1',
                'expected': true,
            },
            {
                'name': 'Find me the person that actually does this',
                'content': '1 ,1',
                'expected': true,
            },
            {
                'name': 'Extra spaces are nice',
                'content': '1 , 1',
                'expected': true,
            },
            {
                'name': 'List',
                'content': '1, 1,',
                'expected': true,
            },
            {
                'name': 'List',
                'content': '1, 1, ',
                'expected': true,
            },
            {
                'name': 'Empty item',
                'content': '1, 1, ,',
                'expected': false,
            },
            {
                'name': 'A letter got in there',
                'content': '1, a',
                'expected': false,
            }
        ];

        let overallResult = 'pass'; // Default overall result is to pass.

        let output = '';

        for (let i = 0; i < tests.length; i++){

            let check = validateInput(tests[i]['content']);

            let expected = tests[i]['expected'];

            let result = 'fail';

            if (check === expected) {
                result = 'pass';
            } else {
                overallResult = 'fail'; // If one test fails, the whole suite fails.
            }

            output += `Test input: <code>"${tests[i]['content']}"</code><br>Test result: ${result}<br><br>`;

            //console.log(`test: ${tests[i]['name']} | result: ${result}`);

        }

        resultsElement.innerHTML = '';
        messageElement.classList.remove('hidden');
        displayMessage(`<h3>Tests: ${overallResult}</h3><p>${output}</p>`);

    }


    function doThings() {

        let method = '';

        methodElements.forEach( element => {

            if (element.checked === true){

                method = element.value;

            }

        });

        let str = inputElement.value;

        if (str === ''){
            return false;
        } else {

            if (validateInput(str) === true){

                let arr = prepareArray(str);

                if (method === 'filter'){
                    let results = filterMethod(arr);
                    if (results.length !== 0){
                        displayResult(results, true);
                    } else {
                        displayResult("None of the numbers you entered are divisible by two.", false);
                    }
                } else if (method === 'reduce'){
                    displayResult(reduceMethod(arr), false);
                }


            } else {

                displayMessage("Only numbers, commas and spaces are allowed, and each number must be separated by a comma.");

            }

        }

    }

    submitElement.onclick = doThings;

    testsElement.onclick = runTests;    

} // end of function windowLoaded
