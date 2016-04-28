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
function keyPress(key) {
    // //identifies the key based on the event listener
    // var key = String.fromCharCode(event.which);
    //
    // //changes 'Enter' to '='
    // if (event.which == 13) {
    //     key = "=";
    // }

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
    $("#readout").text(value);
    // $("#ticker").text(evalArray.join(' '));
}

//entry type functions
function numberEntry(value) {
    if (lastEntry == 'equalSign') {
        evalArray = [];
    }
    entryArray.push(value);
    lastEntry = 'number';
    display(entryArray.join(''));
}

function decimalEntry() {
    //LF START
    //begin conditional which checks if an equal was entered last
    if (lastEntry == 'equalSign'){
        //empty the evaluation array
        evalArray = [];
    //end the conditional
    }
    //begin conditional which checks to see if there is a decimal in the current number being entered
    if (entryArray.indexOf(".") == -1) {
        //if not, add a decimal to the array of items being entered
        entryArray.push(".");
        //define which kind of thing was entered last
        lastEntry = 'number';
    //end conditional
    }
    //call function which shows what has been entered and tell it to show everything that has been entered so far
    display(entryArray.join(''));
    //LF END
}

function operatorEntry(value) {
    //this is less ugly, still fix this
    if (lastEntry == "number") {
        evalArray.push(parseFloat(entryArray.join('')), value);
        display(value);
        entryArray = [];
        lastEntry = 'operator';
    } else if (lastEntry == "operator") {
        evalArray[evalArray.length - 1] = value;
        display(value);
        lastEntry = 'operator';
    } else if (lastEntry == "equalSign") {
        // evalArray.push(value, result);
        evalArray.push(value);
        display(value);
        entryArray = [];
        lastEntry = 'operator';
    }
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
        lastEntry = 'equalSign';
    } else if (lastEntry == "operator") {
        var tempArray = evalArray.slice(0, evalArray.length - 1);
        evalArray.push(eval(tempArray.join('')));
        tempNum = evalArray[evalArray.length - 1];
        tempOp = evalArray[evalArray.length - 2];
        lastEntry = 'equalSign';
    } else if (lastEntry == 'equalSign') {
        evalArray.push(tempOp, tempNum);
    }

    //run the calculation on the evalArray
    result = eval(evalArray.join(''));

    //reset arrays
    entryArray = [];
    evalArray = [];
    evalArray.push(result);

    display(result);
}

function clearEntry(value) {
    if (value == 'AC') {
        evalArray = [];
        lastEntry = null;
    }
    entryArray = [];
    display('');
}

//object constructor
function Calc() {
//LF START
    //create a method to call when you click a button (or press a key)
    //make sure it takes two parameters which identify what kind of thing was clicked and which one in particular
    this.dataEntry = function (type, value) {
        //create a conditional to call a different function based on what kind of thing was clicked
        switch (type) {
            //if it was 0-9...
            case 'number':
                //...call the appropriate function and tell it which one it was
                numberEntry(value);
                //get out of the conditional
                break;
            //if it was '.' ...
            case 'decimal':
                //...call the appropriate function
                decimalEntry();
                //get out of the conditional
                break;
            //if it was "+, -, *, or /" ...
            case 'operator':
                //...call the appropriate function and tell it which one it was
                operatorEntry(value);
                //get out of the conditional
                break;
            //if it was "="...
            case 'equalSign':
                //...call the appropriate function
                equalSignEntry();
                //get out of the conditional
                break;
            //if it was "'AC', 'C', or 'B' ...
            case 'clear':
                //...call the appropriate function and tell it which one it was
                clearEntry(value);
                //get out of the conditional
                break;
            //do nothing if it is anything else
            default:
        //end conditional
        }
    //end method
    };
    //LF END
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