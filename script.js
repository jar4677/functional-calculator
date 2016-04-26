/**
 * Created by jar4677 on 4/25/16.
 */

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