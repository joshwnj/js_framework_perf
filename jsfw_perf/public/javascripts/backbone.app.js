var Todo = Backbone.Model.extend({
    defaults : function(){
        return {
            selected: false,
            todo: ''
        }
    }
});
var TodosList = Backbone.Collection.extend({
    model: Todo
});
var todos = new TodosList([
    new Todo({todo: 'Create',id:0}), 
    new Todo({todo: 'Read',id:1}),
    new Todo({todo: 'Update',id:2}), 
    new Todo({todo: 'Delete',id:3})
]);
var TodoView = Backbone.View.extend({
    model: new Todo(),
    tagName: 'li',
    events : {
        'click .edit-btn': 'editTodo',
        'click .delete-btn' : 'deleteTodo',
        'click .select-todo' : 'selectTodo',
        'mouseover' : 'toggleAction',
        'mouseout' : 'toggleAction'
    },
    initialize: function(){
        this.template = _.template($('#todo-template').html());
        this.model.on('change', this.render, this);
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    toggleAction : function(e){
        if (e.type == 'mouseover'){
            $('.action',this.$el).show();
        }else{
            $('.action',this.$el).hide();
        }
        e.preventDefault();
    },
    selectTodo : function(e){
        this.model.set({selected: e.target.checked});
        e.preventDefault();
    },
    editTodo : function(e){
        e.preventDefault();
    },
    deleteTodo : function(e){
        todos.remove(this.model);
        e.preventDefault();
    }
});
var TodosView = Backbone.View.extend({
    model : todos,
    el : $('.todo-list'),
    initialize : function(){
        this.model.on('add', this.render, this);
        this.model.on('remove', this.change, this);
        this.model.on('change', this.change, this);
    },
    change : function(){
        var allSet = true,
            allClear = true;
        _.each(this.model.toArray(), function(todo, index){
            if (todo.get('selected')) {
                allClear = false;
            } else {
                allSet = false;
            }
        });
        if (!allClear){
            $('.delete-selected a').show();
        }else{
            $('.delete-selected a').hide();
        }
        this.render();
    },
    render : function(){
        var self = this;
        _.delay(function(){
            self.$el.html('');
            _.each(self.model.toArray(), function(todo, index){
                todo = new TodoView({model: todo});
                self.$el.append(todo.$el);
                todo.render();
            });
        }, 0);
        return this;
    }
});


$(document).ready(function(){
    var todoAppView = new TodosView();
    todoAppView.render();
    $('.add-todo-form').submit(function(e){
        var todo = new Todo({todo: $('#add-todo-input').val(),id : todoAppView.model.toArray().length++});
        todos.add(todo);
        $('#add-todo-input').val("");
        e.preventDefault();
    });
    $('.add-todo-form .toggle').change(function(e){
        var self = this;
        _.each(todoAppView.model.toArray(), function(todo, index){
            todo.set({selected: self.checked});
        });
    });
    $('.delete-selected a').click(function(e){
         _.each(todoAppView.model.toArray(), function(todo, index){
            if(todo.get('selected')){
                todoAppView.model.remove(todo)
            }
        });
        e.preventDefault();
    });
});
