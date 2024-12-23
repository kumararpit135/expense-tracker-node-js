//number-> all number has no diff bet float or integer 
//  string-> all text values
//  boolean -> true or false 
//  object -> any type of object 
// arrys -> any typw of array strict or flexible 
var num1Element = document.getElementById('num1');
var num2Element = document.getElementById('num2');
var buttonElement = document.querySelector('button'); //as HTMLButtonElement
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
var numResult = [];
var textResult = [];
//defining the tobject type here 
function printResult(resultObj) {
    console.log(resultObj.val);
}
//console.log('sdfhalhfdsjh')
buttonElement.addEventListener('click', function () {
    var num1 = num1Element.value;
    var num2 = num2Element.value;
    var result = add(+num1, +num2);
    numResult.push(result);
    var stringvalue = add(num1, num2);
    textResult.push(stringvalue);
    console.log(stringvalue);
    console.log(result);
    printResult({ val: result, timestamp: new Date() });
    console.log(numResult, textResult);
});
var myPromise = new Promise(function (res, rej) {
    setTimeout(function () {
        res("it worked");
    }, 1000);
});
//myPromise.then(res=>console.log(res.split('w'))).catch(err=>console.log(err))
