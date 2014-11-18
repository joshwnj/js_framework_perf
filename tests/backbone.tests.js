'use strict';

describe("Backbone Todo App test suite", function(){

	var todoAppView;
	beforeEach(function(){
		todoAppView = new TodosView();
	});

	it('should have initial data', function(){
		expect(todoAppView.model.toArray().length).toBe(4); 
	});

	it('should be able to add new Todo', function(){
		var currentTodoLength = todoAppView.model.toArray().length;
		var todo = new Todo({todo: 'Jasmine test todo', id : todoAppView.model.toArray().length++});
        todos.add(todo);
        expect(todoAppView.model.toArray().length).toBe(currentTodoLength + 1); 
	});

	// it('should be able to edit Todo', function(){
	// 	var toEditTodo = todoAppView.model.toArray().length - 1,
	// 	editedTodo = 'Edited jasmine test todo';
	// 	TodoCtrl.editTodo($.Event("click"), toEditTodo);
	// 	scope.todoList[toEditTodo].todo = editedTodo;
	// 	TodoCtrl.addTodo();
	// 	expect(scope.todoList[toEditTodo].todo).toEqual(editedTodo);

	// });

	// it('should be able to delete Todo', function(){
		
	// });
});