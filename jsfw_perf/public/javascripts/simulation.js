var deleteTime = 0;
var addTime = 0;
var selectTime = 0;
function startAddition(){
    var startTime = Date.now()
    var newTodo = document.getElementById('add-todo-input');
    var printTime = document.getElementById('simulation-time-add-wrap');
    var submitEvent = document.createEvent('Event');
    submitEvent.initEvent('submit', true, true);
    for (var i = 0; i < 100; i++) {
        var inputEvent = document.createEvent('Event');
        inputEvent.initEvent('input', true, true);
        newTodo.value = 'Something to do ' + i;
        newTodo.dispatchEvent(inputEvent);
        newTodo.form.dispatchEvent(submitEvent);
    }
    totalTime = Date.now() - startTime;
    printTime.innerHTML = 'Total time: ' + totalTime + ' ms'
    console.log("insert: " + (addTime + totalTime))
    addTime += totalTime;
}
function deleteAll(){
    var startTime = Date.now()
    var printTime = document.getElementById('simulation-time-delete-wrap');
    var deleteButtons = document.querySelectorAll('.delete-btn');
    for(var i = deleteButtons.length; i--;){
        deleteButtons[i].click();
    }
    totalTime = Date.now() - startTime;
    printTime.innerHTML = 'Total time: ' + totalTime + ' ms'
    console.log("delete: " + (deleteTime + totalTime))
    deleteTime += totalTime;
}
function selectAll(){
    var startTime = Date.now()
    var printTime = document.getElementById('simulation-time-select-wrap');
    var inputSelects = document.querySelectorAll('.select-todo');
    for(var i = inputSelects.length; i--;){
        var inputEvent = document.createEvent('Event');
        inputEvent.initEvent('click', true, true);
        inputSelects[i].checked = true;
        inputSelects[i].dispatchEvent(inputEvent);
    }
    totalTime = Date.now() - startTime;
    printTime.innerHTML = 'Total time: ' + totalTime + ' ms'
    console.log("select: " + (selectTime + totalTime))
    selectTime += totalTime;
}