import React, { useContext } from 'react'
import { TaskContext } from '../context/TaskContext';

const TaskList = () => {
const {tasks, removeTask, editTask, toggleTaskCompletion} = useContext(TaskContext);

  return (
    <div className='p-4 bg-gray-100 rounded-lg shadow-md'>
        <h2 className='text-xl font-bold mb-4'>Lista de tareas</h2>
        <ul>
            {tasks.map((task) => (
                <li key={task.id} className='flex justify-between items-center p-2 mb-2 bg-white rounded-lg shadow-md'>
            <span
            onClick={() => toggleTaskCompletion(task.id)}
            className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
            >
                        {task.title}
                    </span>
                    <div>
                        <button
                        onClick={() => editTask(task.id, task.title)}
                        className='px-2 mr-2 text-blue-500'
                        >
                            Editar
                        </button>
                        <button
                        onClick={() => removeTask(task.id)}
                        className='px-2 text-red-500'
                        >
                            Eliminar
                        </button>
                        <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className='px-2 text-green-500'
                        >
                            inClick={()=>toggleTaskCompletion(task.id)}
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default TaskList