"use strict";
(function () {
    var NotificationPlataform;
    (function (NotificationPlataform) {
        NotificationPlataform["SMS"] = "SMS";
        NotificationPlataform["EMAIL"] = "EMAIL";
        NotificationPlataform["PUSH_NOTIFICATION"] = "PUSH_NOTIFICATION";
    })(NotificationPlataform || (NotificationPlataform = {}));
    var UUID = function () {
        return Math.random().toString(32).substring(2, 9);
    };
    var DateUtils = {
        tomorrow: function () {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        today: function () {
            return new Date();
        },
        FormDate: function (date) {
            return "".concat(date.getDate(), ".").concat(date.getMonth() + 1, ".").concat(date.getFullYear());
        }
    };
    var Reminder = /** @class */ (function () {
        function Reminder(description, date, notifications) {
            this.id = UUID();
            this.dateCreated = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = '';
            this.date = DateUtils.tomorrow();
            this.notifications = [NotificationPlataform.EMAIL];
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }
        Reminder.prototype.render = function () {
            return "\n            --->Remainder<---\n            description: ".concat(this.description, "\n            date: ").concat(DateUtils.FormDate(this.date), "\n            plataform: ").concat(this.notifications.join(','), "\n            ");
        };
        return Reminder;
    }());
    var Todo = /** @class */ (function () {
        function Todo(description) {
            this.id = UUID();
            this.dateCreated = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = '';
            this.done = false;
            this.description = description;
        }
        Todo.prototype.render = function () {
            return "\n            ---> Todo <---\n            description: ".concat(this.description, "\n            done: ").concat(this.done, "\n            ");
        };
        return Todo;
    }());
    var todo = new Todo('Todo criado com a classe');
    var reminder = new Reminder('Remainder croiado com a classe', new Date(), [NotificationPlataform.EMAIL,]);
    var taskView = {
        render: function (tasks) {
            var taskList = document.getElementById("tasksList");
            while (taskList === null || taskList === void 0 ? void 0 : taskList.firstChild) {
                taskList.removeChild(taskList.firstChild);
            }
            tasks.forEach(function (task) {
                var li = document.createElement("LI");
                var textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                taskList === null || taskList === void 0 ? void 0 : taskList.appendChild(li);
            });
        }
    };
    var TaskController = function (view) {
        var _a;
        var tasks = [todo, reminder];
        var handleEvent = function (event) {
            event.preventDefault();
            view.render(tasks);
        };
        (_a = document.getElementById("taskForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", handleEvent);
    };
    TaskController(taskView);
})();
