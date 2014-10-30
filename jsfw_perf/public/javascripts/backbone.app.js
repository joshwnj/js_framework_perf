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
        this.todoViews = [];
        this.model.on('add', this.updateRender, this);
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
    updateRender : function(){
        var self = this;
        _.each(self.todoViews, function(todoView, index){
            todoView.remove();
        });
        self.todoViews = [];
        self.render();
    },
    render : function(){
        var self = this;
        _.delay(function(){
            self.$el.html('');
            _.each(self.model.toArray(), function(todo, index){
                todo = new TodoView({model: todo});
                self.todoViews.push(todo);
                self.$el.append(todo.$el);
                todo.render();
            });
        }, 0);
        return this;
    }
});