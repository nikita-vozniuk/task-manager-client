export interface ITask {
    title: string;
    description: string;
    dueDate: Date | string,
    completed: boolean;
    user: string;
}
