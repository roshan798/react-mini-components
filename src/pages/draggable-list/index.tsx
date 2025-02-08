import { useState } from "react";
// framer animation is added by AI (chat GPT)
import { motion } from "framer-motion";
import Todo from "./components/Todo";
import { CheckCircle, Trash2 } from "lucide-react";
import { TodoType } from "./types";

const initialTodos: TodoType[] = [
    {
        id: 1,
        todoContent: "Learn React",
        createdAt: new Date().toISOString(),
        completed: false,
    },
    {
        id: 2,
        todoContent: "Learn TypeScript",
        createdAt: new Date().toISOString(),
        completed: false,
    },
    {
        id: 3,
        todoContent: "Learn Tailwind CSS",
        createdAt: new Date().toISOString(),
        completed: false,
    },
];


const DraggableList = () => {

    const [todos, setTodos] = useState<TodoType[]>(initialTodos);
    // const [todos, setTodos] = useState<TodoType[]>([]);

    const [draggedItem, setDraggedItem] = useState<TodoType | null>(null);
    const [draggedOverItem, setDraggedOverItem] = useState<TodoType | null>(null);

    const addTodo = (todoContent: string) => {
        const newTodo = {
            id: todos.length + 1,
            todoContent,
            createdAt: new Date().toISOString(),
            completed: false,
        };
        setTodos([newTodo, ...todos]);
    };

    const toggleComplete = (id: number) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };



    const handleDragStart = (item: TodoType) => setDraggedItem(item);

    const handleDragOver = (item: TodoType) => {
        if (draggedItem && draggedItem.id !== item.id) {
            setDraggedOverItem(item);
        }
    };

    const handleDrop = () => {
        if (draggedItem && draggedOverItem) {
            const draggedIndex = todos.findIndex(todo => todo.id === draggedItem.id);
            const overIndex = todos.findIndex(todo => todo.id === draggedOverItem.id);

            const updatedTodos = [...todos];
            updatedTodos[draggedIndex] = draggedOverItem;
            updatedTodos[overIndex] = draggedItem;

            setTodos(updatedTodos);
            setDraggedItem(null);
            setDraggedOverItem(null);
        }
    };

    return (
        <div className="min-h-screen  p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4 text-blue-600">Draggable ToDo List</h1>

            <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-lg">
                <Todo addTodo={addTodo} />
            </div>

            <div className="mt-6 w-full max-w-md">
                <ul className="space-y-3">
                    {todos.map((item, index) => (
                        <motion.li
                            key={item.id}
                            draggable
                            onDragStart={() => handleDragStart(item)}
                            onDragOver={(e) => {
                                e.preventDefault();
                                handleDragOver(item);
                            }}
                            onDrop={handleDrop}
                            className={`p-4 border rounded-md shadow-md flex justify-between items-center transition-all cursor-pointer ${item.completed ? "bg-green-100 line-through text-gray-500" : "bg-gray-100 hover:bg-blue-100"
                                }`}
                            layout
                            whileHover={{ scale: 1.03 }}
                            whileDrag={{ opacity: 0.7, scale: 1.05 }}
                        >
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-800">{index + 1}. </span>
                                <span>{item.todoContent}</span>
                            </div>

                            <div className="flex items-center space-x-3">
                                <button title={`Mark as ${item.completed ? "incomplete" : "complete"}`} onClick={() => toggleComplete(item.id)} className="text-green-500 hover:text-green-700">
                                    <CheckCircle size={20} />
                                </button>
                                <button title="Delete" onClick={() => deleteTodo(item.id)} className="text-red-500 hover:text-red-700">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </motion.li>
                    ))}
                    {todos.length === 0 && (
                        <li className="p-4 border rounded-md shadow-md text-center text-gray-500">
                            No todos. Add a new ToDo.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default DraggableList;
