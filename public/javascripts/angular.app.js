var todo = angular.module('todoApp', []);

todo.controller('TodoController', [
    '$scope',
    function($scope){
        $scope.currentIndex;
        $scope.formData = {};
        $scope.todoList = [
            {todo : 'Create'},
            {todo : 'Read'},
            {todo : 'Update'},
            {todo : 'Delete'}
        ];
        $scope.isAllItemSelected = false;
        $scope.isNoItemSelected = false;
        this.addTodo = function(){
            if(typeof $scope.formData.index === "undefined"){
                if($scope.formData.todo){
                    $scope.todoList.push($scope.formData);
                }
            }
            $scope.formData = {};
        }
        this.editTodo = function(event, index){
            event.preventDefault();
            $scope.formData = $scope.todoList[index];
            $scope.formData['index'] = index;
        }
        this.deleteTodo = function(event, index){
            event.preventDefault();
            $scope.todoList.splice(index, 1);
        }
        this.setCurrent = function(index){
            if($scope.currentIndex != index){
                $scope.currentIndex = index;
            }
        }
        this.deleteSelected = function(event){
            event.preventDefault();
            for(var i = $scope.todoList.length; i--;){
               if($scope.todoList[i].selected) $scope.todoList.splice(i,1)
            }
        }
    }
]);

todo.directive('selectAllCheckbox', function () {
    return {
        replace: true,
        restrict: 'E',
        scope: {
            checkboxes: '=',
            allselected: '=?allSelected',
            allclear: '=?allClear'
        },
        template: '<input type="checkbox" ng-model="master" ng-change="masterChange()">',
        controller: function ($scope, $element) {
            $scope.masterChange = function () {
                angular.forEach($scope.checkboxes, function (cb, index) {
                    cb.selected = $scope.master;
                });
            };
        },
        link: function(scope, element, attrs){
            scope.$watch('checkboxes', function () {
                var allSet = true,
                    allClear = true;
                angular.forEach(scope.checkboxes, function (cb, index) {
                    if (cb.selected) {
                        allClear = false;
                    } else {
                        allSet = false;
                    }
                });
                scope.allselected = allSet;
                scope.allclear = allClear;

                element.prop('indeterminate', false);
                if (allSet) {
                    scope.master = true;
                } else if (allClear) {
                    scope.master = false;
                } else {
                    scope.master = false;
                    element.prop('indeterminate', true);
                }

            }, true);
        }
    };
});