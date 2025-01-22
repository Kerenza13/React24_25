import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
    return (
        <div className="container mx-auto">
          <h1 className="text-center font-bold text-3xl text-blue-500">Lista de Tareas</h1>  
          <TaskForm />
          <TaskList />
        </div>
    );
}

export default App;
