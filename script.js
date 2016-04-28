/**
 * Created by jar4677 on 4/25/16.
 */

var entryArray = [];
var evalArray = [];
var lastEntry = null;
var result = null;
var tempNum = null;
var tempOp = null;
var tickerDisplay = [];

//keypress function (rework)
function keyPress(key) {
    //calls method based on the value of the key
    switch (key) {
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
        case 'AC':
        case 'C':
        case 'B':
            calculator.dataEntry('clear', key);
            break;
        default:
    }
}

//readout function
function display(value) {
    if (value.length >= 16){
        value = parseFloat(value).toExponential(2);
    }
    // $("#readout").attr('value', value);
    $("#readout").text(value);
    // $("#ticker").text(tickerDisplay.join(' '));
    $(".ticker").text(tickerDisplay.join(' '));
}

//entry type functions
function numberEntry(value) {
    if (lastEntry == 'equalSign') {
        evalArray = [];
    }
    entryArray.push(value);
    lastEntry = 'number';
    tickerDisplay = [evalArray.join(' '), entryArray.join('')];
    display(entryArray.join(''));
}

function decimalEntry() {
    if (lastEntry == 'equalSign') {
        evalArray = [];
    }
    if (entryArray.indexOf(".") == -1) {
        entryArray.push(".");
        lastEntry = 'number';
    }
    tickerDisplay = [evalArray.join(' '), entryArray.join('')];
    display(entryArray.join(''));
}

function operatorEntry(value) {
    //this is less ugly, still fix this
    if (lastEntry == "number") {
        evalArray.push(parseFloat(entryArray.join('')), value);
        entryArray = [];
    } else if (lastEntry == "operator") {
        evalArray[evalArray.length - 1] = value;
    } else if (lastEntry == "equalSign") {
        evalArray.push(value);
        entryArray = [];
    }

    tickerDisplay = [evalArray.join(' '), entryArray.join('')];
    display(value);
    lastEntry = 'operator';
}

function equalSignEntry() {
    if (lastEntry == "number") {
        if (evalArray.length == 0) {
            evalArray.push(parseFloat(entryArray.join('')), tempOp, tempNum);
        } else if (entryArray.length != 0) {
            evalArray.push(parseFloat(entryArray.join('')));
        }
        tempNum = evalArray[evalArray.length - 1];
        tempOp = evalArray[evalArray.length - 2];
    } else if (lastEntry == "operator") {
        var tempArray = evalArray.slice(0, evalArray.length - 1);
        evalArray.push(eval(tempArray.join('')));
        tempNum = evalArray[evalArray.length - 1];
        tempOp = evalArray[evalArray.length - 2];

    } else if (lastEntry == 'equalSign') {
        evalArray.push(tempOp, tempNum);
    }

    //run the calculation on the evalArray
    result = eval(evalArray.join(''));

    // account for /0 and long numbers
    if (result == "Infinity"){
        result = "Error";
        tickerDisplay = [evalArray.join(' '), "=", result];
        entryArray = [];
        evalArray = [];
    } else {
        tickerDisplay = [evalArray.join(' '), "=", result];
        entryArray = [];
        evalArray = [];
        evalArray.push(result);
    }

    display(result);

    lastEntry = 'equalSign';
}

function clearEntry(value) {
    if (value == 'AC') {
        evalArray = [];
        lastEntry = null;
        entryArray = [];
        tickerDisplay = [];
        display('');
    } else if (value == 'C'){
        entryArray = [];
        tickerDisplay = [evalArray.join(' ')];
        display('');
    } else {
        entryArray.pop();
        tickerDisplay = [evalArray.join(' '), entryArray.join('')];
        display(entryArray.join(''));
    }
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
    }
}


//object instantiation
var calculator = new Calc();

//event handlers
$(document).ready(function () {
    // $('body').on('keypress', keyPress);

    $('body').bind('keypress keyup', function (event) {
        var key = null;
        if (event.type == 'keypress') {
            key = String.fromCharCode(event.which);
            if(event.which == 13){
                key = '=';
            }
        } else if (event.type == 'keyup'){
            var keyCode = event.keyCode;
            if (keyCode == 27) {
                key = 'AC';
            } else if (keyCode == 46 ){
                key = 'C'
            } else if (keyCode == 8){
                key = 'B'
            }

        }

        if (key != null){
            keyPress(key);
        }
    });

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