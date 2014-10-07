window.timeout = null;
window.totalTime = null;
window.loopCount = null;
window.startDate = null;
window.reset = function() {
    $('#grid').empty();
    $('#timing').html('&nbsp;');
    clearTimeout(timeout);
};
window.startClock = function () {
    loopCount = 0;
    totalTime = 0;
    startDate = Date.now();
}

window.benchmarkLoop = function(fn) {
    totalTime += Date.now() - startDate;
    startDate = Date.now();
    fn();
    loopCount++;
    if (loopCount % 20 === 0) {
        $('#timing').text('Performed ' + loopCount + ' iterations in ' + totalTime + ' ms (average ' + (totalTime / loopCount).toFixed(2) + ' ms per loop).');
    }
    timeout = _.defer(benchmarkLoop, fn);
};