App = Ember.Application.create({
	LOG_TRANSITION: true
});
App.Router.map(function (){
    this.resource('todos', {path: '/' }, function(){
    	this.resource('todo', {path: '/:id'}, function(){
    		this.route('update');
    		this.route('delete');
    	});
    });
});

App.Todo = Ember.Object.extend({
  id: '',
  todo: '',
  selected: false
});

App.TodosRoute = Ember.Route.extend({
	selectedTodo: null,
	model : function(){
		TodoObjects = [];
		TodoObjects.pushObject(App.Todo.create({id: 1, todo: 'create'}));
		TodoObjects.pushObject(App.Todo.create({id: 2, todo: 'read'}));
		TodoObjects.pushObject(App.Todo.create({id: 3, todo: 'update'}));
		TodoObjects.pushObject(App.Todo.create({id: 4, todo: 'delete'}));

		return TodoObjects;
	},
	actions: {
		upsertTodo : function(){
			var todoValue = this.get('controller.todoValue');
			if(this.selectedTodo == null){
				var model = this.modelFor('todos');
				var todo = App.Todo.create({id: model.length+1, todo: todoValue});
				model.pushObject(todo);
			}else{
				this.selectedTodo.set('todo', todoValue);
				this.selectedTodo = null;
			}
			this.get('controller').set('todoValue', '');
		},
		editTodo : function(todo){
			this.selectedTodo = todo;
			this.get('controller').set('todoValue', todo.get('todo'));
		},
		deleteTodo : function(todo){
			this.modelFor('todos').removeObject(todo);
		},
		selectAll : function(){
			this.modelFor('todos').setEach('selected', true);
		},
		deleteSelected: function(){
			this.modelFor('todos').removeObjects(this.modelFor('todos').filterProperty('selected'));
		}
	}
});

App.TodosController = Ember.ArrayController.extend({
	todoValue : "",
	allSelected: function(key, value) {
		if ( value !== undefined ) {
			// when check box is ticked, this gets executed
			this.setEach( 'selected', value );
			return value;
		} else {
			//as a computed property
			return !!this.get( 'length' ) &&
			this.everyProperty( 'selected', true );
		}
	}.property('@each.selected'),
	noSelected: function() {
		return this.everyProperty( 'selected', false );
	}.property('@each.selected')
});