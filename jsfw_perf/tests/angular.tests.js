'use strict';

describe("Angular Todo App test suite", function(){

	beforeEach(module('todoApp'));
	var TodoCtrl,
	scope;
	beforeEach(inject(function($controller, $rootScope){
		scope = $rootScope.$new();
		TodoCtrl = $controller('TodoController', {$scope: scope});
	}));

	it('should have initial data', function(){
		expect(scope.todoList.length).toBe(4); 
	});

	it('should be able to add new Todo', function(){
		var currentTodoLength = scope.todoList.length;
		scope.formData = {todo:'Jasmine test todo', selected: false};
		TodoCtrl.addTodo();
		expect(scope.todoList.length).toBe(currentTodoLength + 1); 
	});

	it('should be able to edit Todo', function(){
		var toEditTodo = scope.todoList.length - 1,
		editedTodo = 'Edited jasmine test todo';
		TodoCtrl.editTodo($.Event("click"), toEditTodo);
		scope.todoList[toEditTodo].todo = editedTodo;
		TodoCtrl.addTodo();
		expect(scope.todoList[toEditTodo].todo).toEqual(editedTodo);
	});

	it('should be able to delete Todo', function(){
		var currentTodoLength = scope.todoList.length,
		toDelTodo = currentTodoLength - 1;
		TodoCtrl.deleteTodo($.Event("click"), toDelTodo);
		expect(scope.todoList.length).toBe(currentTodoLength - 1);
	});
});