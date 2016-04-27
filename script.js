/**
 * Created by jar4677 on 4/25/16.
 */

var array1 = [];

var array2 = [];

//keypress function
function keyPress(event) {
    var key = String.fromCharCode(event.which);

    if (event.which == 13){
        key = "="
    } else if (event.which == 27 || event.which == 127){
        key = "C"
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
        case 'C':
            calculator.dataEntry('clear', key);
        default:
            console.log(event.which);
    }
}

function Calc() {

    this.dataEntry = function (type, value) {
        switch (type) {
            case 'number':
                array1.push(value);
                $("#readout").text(array1.join(''));
                break;
            case 'operator':

                //this is really ugly, fix this
                var temp = typeof array2[array2.length - 1];
                if (temp == 'number' || temp == 'undefined'){
                    array2.push(parseFloat(array1.join('')), value);
                    $("#readout").text(value);
                    array1 = [];
                } else {
                    array2[array2.length -1] = value;
                    $("#readout").text(value);
                }

                break;
            case 'decimal':
                if (array1.indexOf(".") == -1) {
                    array1.push(value);
                }
                $("#readout").text(array1.join(''));
                break;
            case 'equalSign':
                array2.push(parseFloat(array1.join('')));
                $("#readout").text(eval(array2.join('')));
                break;
            default:
                array1 = [];
                array2 = [];
                $("#readout").text('');
        }
    }
}

var calculator = new Calc();

$(document).ready(function () {
    $('body').on('keypress', keyPress);

    $(".button").click(function () {
        var type = $(this).attr("data-type");
        var value = $(this).attr("data-value");

        // console.log('type: ' + type + ' value: ' + value);

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