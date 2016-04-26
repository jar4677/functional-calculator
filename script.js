/**
 * Created by jar4677 on 4/25/16.
 */
$(document).ready(function () {

    function callback(type, value, item) {
        $("#readout").text(value);
    }

    myCalculator = new calculator(callback);

    $(".button").click(function () {
        var val = $(this).attr('data-value');
        myCalculator.addItem(val);
    })
});