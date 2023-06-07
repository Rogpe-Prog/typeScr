(() => {
    enum NotificationPlataform {
        SMS = 'SMS',
        EMAIL = 'EMAIL',
        PUSH_NOTIFICATION = 'PUSH_NOTIFICATION',
    }

    const UUID = (): string => {
        return Math.random().toString(32).substring(2, 9);
    }; 

    const DateUtils = {
        tomorrow(): Date {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        today(): Date {
            return new Date();
        },
        FormDate(date: Date): string {
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        }
    }

    interface Task {
        id: string;
        dateCreated: Date;
        dateUpdated: Date;
        description: string;
        render(): string;
    }

    class Reminder implements Task {
        id: string = UUID();
        dateCreated: Date = DateUtils.today();
        dateUpdated: Date = DateUtils.today();
        description: string = '';

        date: Date = DateUtils.tomorrow();
        notifications: Array<NotificationPlataform> = [NotificationPlataform.EMAIL];

        constructor(
            description:string,
            date: Date,
            notifications: Array<NotificationPlataform>
            ) {
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }
        render(): string {
            return `
            --->Remainder<---
            description: ${this.description}
            date: ${DateUtils.FormDate(this.date)}
            plataform: ${this.notifications.join(',')}
            `;
        }
    }

    class Todo implements Task {
        id: string = UUID();
        dateCreated: Date = DateUtils.today();
        dateUpdated: Date = DateUtils.today();
        description: string = '';

        done: boolean = false;

        constructor(description: string) {
            this.description = description;
        }

        render(): string {
            return `
            ---> Todo <---
            description: ${this.description}
            done: ${this.done}
            `;
        }
        
    }


    const todo = new Todo('Todo criado com a classe');

    const reminder = new Reminder('Remainder croiado com a classe', new Date(), [NotificationPlataform.EMAIL,]);

    const taskView = {
        render(tasks: Array<|Task>) {
            const taskList = document.getElementById("tasksList");
            while(taskList?.firstChild) {
                taskList.removeChild(taskList.firstChild);
            }

            tasks.forEach((task) => {
                const li = document.createElement("LI");
                const textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                taskList?.appendChild(li);
            })
        }
    };


  const TaskController = (view: typeof taskView) => {
    const tasks: Array<Task> = [todo, reminder];

    const handleEvent = (event: Event) => {
        event.preventDefault();
        view.render(tasks);
    };

    document.getElementById("taskForm")?.addEventListener("submit", handleEvent );
  }; 
  
  TaskController(taskView);
})();
