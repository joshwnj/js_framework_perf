var Todo = function(id, todo){
    Object.defineProperties(this, {
        id : {
            value: id,
            enumerable : true
        },
        selected : {
            value : ko.observable(false),
            writable : true,
            enumerable : true
        },
        todo : {
            value : ko.observable(todo),
            writable : true,
            enumerable : true
        },
        actionVisible: {
            value : ko.observable(false),
            writable: true,
            enumerable: true
        }
    });
};

var TodoViewModel = function(){
    Object.defineProperties(this, {
        todos : {
            value : ko.observableArray([
                new Todo(0, 'Create'),
                new Todo(1, 'Read'),
                new Todo(2, 'Update'),
                new Todo(3, 'Delete')
            ]),
            enumerable : true,
            writable : true
        },
        todoValue : {
            value : ko.observable(''),
            enumerable: true,
            writable: true
        },
        selectAll: {
            value : ko.observable(false),
            enumerable: true,
            writable: true
        },
        allClear: {
            value : ko.observable(true),
            enumerable: true,
            writable: true
        }
    });
};

Object.defineProperties(TodoViewModel.prototype, {
    deleteTodo : {
        value : function(todo){
            this.todos.remove(todo);
        },
        enumerable : true
    },
    showAction : {
        value : function(todo){ 
            todo.actionVisible(true);
        },
        enumerable : true
    },
    hideAction : {
        value : function(todo){ 
            todo.actionVisible(false);
        },
        enumerable : true
    },
    addTodo : {
        value : function(){
            var self = this;
            var todo = new Todo(this.todos.length++, this.todoValue());
            todo.selected.subscribe(function(newValue) {
                self.watchSelected();
            });
            this.todos.push(todo);
            this.todoValue('');
        },
        enumerable: true
    },
    selectAllTodos : {
        value: function(){
            for(var i = this.todos().length; i--;){
                this.todos()[i].selected(this.selectAll());
            }
            return true;
        },
        enumerable: true
    },
    deleteSelectedTodos : {
        value: function(){
            for(var i = this.todos().length; i--;){
                if (this.todos()[i].selected()){
                    this.todos.remove(this.todos()[i]);
                }
            }
            this.watchSelected();
        },
        enumerable: true
    },
    watchSelected: {
        value : function(){
            var allSet = true,
            allClear = true;
            for(var i = this.todos().length; i--;){
                if (this.todos()[i].selected()) {
                    allClear = false;
                } else {
                    allSet = false;
                }
            }
            this.allClear(allClear);
        },
        enumerable : true
    }
});
