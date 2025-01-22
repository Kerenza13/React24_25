import { createContext, useState } from "react";

// Crear el contexto
export const TaskContext = createContext();



// Crear el proveedor (provider) del contexto
export const TaskProvider = ({ children }) => {

    // hooks
    const [tasks, setTasks] = useState(() => {
        const savedTask = localStorage.getItem('task');
        return savedTask ? JSON.parse(savedTask) : [];
    });

    // funciones
    // acciones sobre una tarea:
    // - agregar tarea
    // - eliminar tarea
    // - editar tarea
    // - marcar tarea como completada
    // No olvidar que las tareas han de estar guardadas en el localStorage
    const addTask = (task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
        localStorage.setItem('task', JSON.stringify(tasks));
    };
    const removeTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };
    const editTask = (taskId, task) => { };
    const toggleTaskCompletion = (taskId) => {
        setTasks((prevTasks) => prevTasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task));

    };

    return (
        <TaskContext.Provider 
            value={{tasks, addTask, removeTask, editTask, toggleTaskCompletion}}
        >
            {children}
        </TaskContext.Provider>
    );
};