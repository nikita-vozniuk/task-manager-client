export interface ITask {
    _id?: string;
    title: string;
    description: string;
    dueDate: Date | string,
    completed: boolean;
    user: string;
}
