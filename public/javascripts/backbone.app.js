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
    initialize: function(options){
        this.parent = options.parent;
        this.template = _.template($('#todo-template').html());
        this.listenTo(this.model, { change: this.render });
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
        this.parent.selectedTodo = this.model;
        this.parent.todoForm.$el.find('#add-todo-input').val(this.model.get('todo'));
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
        this.selectedTodo = null;
        this.todoForm = new TodoForm({parent: this});
        this.todoViews = [];
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
                todo = new TodoView({model: todo, parent: self});
                self.$el.append(todo.$el);
                todo.render();
            });
        }, 0);
        return this;
    }
});
var TodoForm = Backbone.View.extend({
    el : $('.add-todo-form'),
    initialize : function (options) {
        this.parent = options.parent;
    },
    events : {
        'submit' : 'upsertTodo'
    },
    upsertTodo : function(e){
        var form = this.$el;
        var input = form.find('#add-todo-input');
        if(this.parent.selectedTodo == null){
            var todo = new Todo({todo: input.val(),id : this.parent.model.toArray().length++});
            this.parent.model.add(todo);
        }else{
            this.parent.selectedTodo.set({todo: input.val()})
        }
        input.val("").blur();
        this.parent.selectedTodo = null;
        e.preventDefault();
    }
});