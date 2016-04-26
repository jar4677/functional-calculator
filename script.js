/**
 * Created by jar4677 on 4/25/16.
 */

var array1 = [];

var array2 = [];

function Calc() {

    this.dataEntry = function(type, value){
        switch (type){
            case 'number':
                array1.push(value);
                $("#readout").text(array1.join(''));
                break;
            case 'operator':
                array2.push(parseFloat(array1.join('')), value);
                $("#readout").text(value);
                array1 = [];
                break;
            case 'decimal':
                if (array1.indexOf(".") == -1){
                    array1.push(value);
                }
                $("#readout").text(array1.join(''));
                break;
            case 'equalSign':
                array2.push(parseFloat(array1.join('')));
                $("#readout").text(eval(array2.join('')));
                break;
            default:
                array1 =[];
        }
        console.log('array1: ' + array1);
        console.log('array2: ' + array2);
    }
}

var calculator = new Calc();

$(document).ready(function () {
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