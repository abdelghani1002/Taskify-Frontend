import React, { useEffect, useState } from "react";
import { Flowbite } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import TaskCreateForm from "../components/TaskCreateForm";
import { getTasks } from "../API/Tasks";
import Task from "../components/Task";

export default function Home({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoggedIn(false);
            navigate('/login');
            return null;
        }

        const fetchTasks = async () => {
            try {
                let response = await getTasks(token);
                if (response.status === 200) {
                    // update the state of the tasks and re-render the component
                    setTasks(response.data.tasks);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchTasks();

    }, [navigate, setTasks, setIsLoggedIn]);

    return (
        <Flowbite>
            <div className="min-h-dvh p-3 flex flex-col items-center">
                <div className="flex flex-col justify-center items-center w-full">
                    <div className="">
                        <TaskCreateForm setTasks={setTasks} setIsLoggedIn={setIsLoggedIn} />
                    </div>
                    <div className="flex flex-col w-full items-center">
                        {tasks && tasks.map(task => (
                            <Task task={task} key={task.id} />
                        ))}
                    </div>
                </div>
            </div>
        </Flowbite>
    )
}