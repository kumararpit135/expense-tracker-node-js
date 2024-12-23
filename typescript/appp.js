"use strict";
//number-> all number has no diff bet float or integer 
//  string-> all text values
//  boolean -> true or false 
//  object -> any type of object 
// arrys -> any typw of array strict or flexible 
const num1Element = document.getElementById('num1');
const num2Element = document.getElementById('num2');
const buttonElement = document.querySelector('button'); //as HTMLButtonElement
function add(num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    }
    return +num1 + +num2;
}
// how to define the arrays
const numResult = [];
const textResult = [];
//defining the tobject type here 
function printResult(resultObj) {
    console.log(resultObj.val);
}
//console.log('sdfhalhfdsjh')
buttonElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const result = add(+num1, +num2);
    numResult.push(result);
    const stringvalue = add(num1, num2);
    textResult.push(stringvalue);
    console.log(stringvalue);
    console.log(result);
    printResult({ val: result, timestamp: new Date() });
    console.log(numResult, textResult);
});
const myPromise = new Promise((res, rej) => {
    setTimeout(() => {
        res("it worked");
    }, 1000);
});
myPromise.then(res => console.log(res.split('w'))).catch(err => console.log(err));
