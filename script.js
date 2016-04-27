/**
 * Created by jar4677 on 4/25/16.
 */

var entryArray = [];

var evalArray = [];

var lastEntry = null;

var result = null;

var tempNum = null;
var tempOp = null;

//keypress function (rework)
function keyPress(event) {
    var key = String.fromCharCode(event.which);

    if (event.which == 13){
        key = "="
    }

    switch (key){
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            calculator.dataEntry('number', key);
            break;
        case '/':
        case '*':
        case '-':
        case '+':
            calculator.dataEntry('operator', key);
            break;
        case '.':
            calculator.dataEntry('decimal', key);
            break;
        case '=':
            calculator.dataEntry('equalSign', key);
            break;
        default:
            console.log(event.which);
    }
}

//redout function
function display(value) {
    $("#readout").text(value);
    $("#ticker").text(evalArray.join(' '));
}

//type functions
function numberEntry(value) {
    if (lastEntry == 'equalSign'){
        evalArray =[];
    }
    entryArray.push(value);
    lastEntry = 'number';
    display(entryArray.join(''));
}

function decimalEntry() {
    if (entryArray.indexOf(".") == -1) {
        entryArray.push(".");
        lastEntry = 'number';
    }
    display(entryArray.join(''));
}

function operatorEntry(value) {

    //this is less ugly, still fix this
    if (lastEntry == "number"){
        evalArray.push(parseFloat(entryArray.join('')), value);
        display(value);
        entryArray = [];
        lastEntry = 'operator';
    } else if (lastEntry == "operator"){
        evalArray[evalArray.length - 1] = value;
        display(value);
        lastEntry = 'operator';
    } else if (lastEntry == "equalSign"){
        // evalArray.push(value, result);
        evalArray.push(value);
        display(value);
        entryArray = [];
        lastEntry = 'operator';
    }

}

function equalSignEntry() {
    if (lastEntry == "number"){
        if (evalArray.length == 0){
            evalArray.push(parseFloat(entryArray.join('')), tempOp, tempNum);
        }
        if (entryArray.length != 0){
            evalArray.push(parseFloat(entryArray.join('')));
        }
        tempNum = evalArray[evalArray.length - 1];
        tempOp = evalArray[evalArray.length - 2];
        lastEntry = 'equalSign';
    } else if (lastEntry == "operator"){
        var tempArray = evalArray.slice(0,evalArray.length -1);
        evalArray.push(eval(tempArray.join('')));
        tempNum = evalArray[evalArray.length - 1];
        tempOp = evalArray[evalArray.length - 2];
        lastEntry = 'equalSign';
    } else if (lastEntry == 'equalSign'){
        // tempNum = evalArray[evalArray.length - 1];
        // tempOp = evalArray[evalArray.length - 2];
        evalArray.push(tempOp, tempNum);
    }

    result = eval(evalArray.join(''));
    console.log('tempNum: ' + tempNum);
    console.log('tempOp: ' + tempOp);
    console.log('result: ' + result);

    entryArray = [];
    evalArray = [];
    evalArray.push(result);
    // entryArray.push(result);
    display(result);
}

function clearEntry(value){
    if (value == 'AC'){
        evalArray = [];
        lastEntry = null;
    }
    entryArray = [];
    display('');
}

//object constructor
function Calc() {

    this.dataEntry = function (type, value) {
        switch (type) {
            case 'number':
                numberEntry(value);
                break;
            case 'decimal':
                decimalEntry();
                break;
            case 'operator':
                operatorEntry(value);
                break;
            case 'equalSign':
                equalSignEntry();
                break;
            case 'clear':
                clearEntry(value);
                break;
            default:
        }
        console.log('entryArray: ' + entryArray);
        console.log('evalArray: ' + evalArray);
        console.log('last entry: ' + lastEntry);
    }
}

//object instantiation
var calculator = new Calc();

//event handlers
$(document).ready(function () {
    $('body').on('keypress', keyPress);

    $(".button").click(function () {
        var type = $(this).attr("data-type");
        var value = $(this).attr("data-value");

        calculator.dataEntry(type, value);
    })
});


/* v0.5 code
 function callback(type, value, item) {

 switch (value) {
 case undefined:
 $('#readout').text("");
 break;
 default:
 $('#readout').text(value);
 break;
 }
 }

 var myCalculator = new calculator(callback);

 $(document).ready(function () {

 $(".button").click(function () {

 var val = $(this).text();

 console.log(val);
 switch (val){
 case 'C':
 myCalculator.clear();
 break;
 case 'AC':
 myCalculator.allClear();
 break;
 default:
 myCalculator.addItem(val);
 }

 });
 });
 */