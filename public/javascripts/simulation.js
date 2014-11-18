function startAddition(){
    var newTodo = document.getElementById('add-todo-input'),
        submitEvent = document.createEvent('Event');
    submitEvent.initEvent('submit', true, true);
    for (var i = 0; i < 100; i++) {
        var inputEvent = document.createEvent('Event');
        inputEvent.initEvent('input', true, true);
        newTodo.value = 'Something to do ' + i;
        newTodo.dispatchEvent(inputEvent);
        newTodo.form.dispatchEvent(submitEvent);
    }
};
function deleteAll(){
    var deleteButtons = document.querySelectorAll('.delete-btn');
    for(var i = deleteButtons.length; i--;){
        deleteButtons[i].click();
    }
};
function selectAll(){
    var inputSelects = document.querySelectorAll('.select-todo');
    for(var i = inputSelects.length; i--;){
        var inputEvent = document.createEvent('MouseEvent');
        inputEvent.initEvent('click', true, true);
        inputSelects[i].dispatchEvent(inputEvent);
    }
};

function benchmark(name, fn) {
    var startTime = Date.now(),
        printTime = document.getElementById('simulation-time-' + name + '-wrap');
    fn();
    printTime.innerHTML = 'Total time: ' + (Date.now() - startTime) + ' ms'
    console.log(name, "" + (Date.now() - startTime) + "ms");
}