/**
 * Created by jar4677 on 4/25/16.
 */

var entryArray = [];

var evalArray = [];

var lastEntry = null;

var result = null;

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

//type functions
function numberEntry(value) {
    entryArray.push(value);
    lastEntry = 'number';
    $("#readout").text(entryArray.join(''));
}

function decimalEntry() {
    if (entryArray.indexOf(".") == -1) {
        entryArray.push(".");
        lastEntry = 'number';
    }
    $("#readout").text(entryArray.join(''));
}

function operatorEntry(value) {

    //this is less ugly, still fix this
    if (lastEntry == "number"){
        evalArray.push(parseFloat(entryArray.join('')), value);
        $("#readout").text(value);
        entryArray = [];
        lastEntry = 'operator';
    } else if (lastEntry == "operator"){
        evalArray[evalArray.length - 1] = value;
        $("#readout").text(value);
        lastEntry = 'operator';
    } else if (lastEntry == "equalSign"){
        evalArray.push(value, result);
        $("#readout").text(value);
        entryArray = [];
        lastEntry = 'number';
    }

}

function equalSignEntry() {
    if (lastEntry == "number"){
        evalArray.push(parseFloat(entryArray.join('')));
        result = eval(evalArray.join(''));
        console.log(result);
        lastEntry = 'equalSign';
    } else if (lastEntry == "operator"){
        var tempArray = evalArray.slice(0,evalArray.length -1);
        console.log(tempArray);
        result = eval(tempArray.join(''));
    }

    entryArray = [];
    entryArray.push(result);
    $("#readout").text(result);
}

function clearEntry(value){
    if (value == 'AC'){
        evalArray = [];
        lastEntry = null;
    }
    entryArray = [];
    $("#readout").text('');
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