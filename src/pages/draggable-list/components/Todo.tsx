import React from 'react';

export type TodoPropType = {
    addTodo: (todoContent: string) => void;
};

const Todo = ({ addTodo }: TodoPropType) => {
    const [todoContent, setTodoContent] = React.useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoContent(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (todoContent.trim() !== '') {
            addTodo(todoContent);
            setTodoContent('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
                type="text"
                value={todoContent}
                onChange={handleChange}
                placeholder="Add new ToDo..."
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
                Add
            </button>
        </form>
    );
};

export default Todo;
 