import { Popover, Spinner } from "flowbite-react";
import { useState } from "react";
import { completeTask, inCompleteTask } from "../API/Tasks";
import TaskEditForm from "./TaskEditForm";

export default function Task({ task, id, setTasks, setError, setIsLoggedIn }) {
    const [submiting, setSubmitting] = useState(false);
    const token = localStorage.getItem('token')
    const [toggleButton, setToggleButton] = useState(true);
    const hover = () => {
        setToggleButton(prev => !prev);
    }

    const markIncomplete = async () => {
        setSubmitting(true);
        let res = await inCompleteTask(token, id);
        if (res.status === 202) {
            setTasks(res.data.tasks);
        } else {
            setError('Marking the task incomplete failed, please try again.');
        }
        setSubmitting(false);
    }

    const markComplete = async () => {
        setSubmitting(true);
        let res = await completeTask(token, id);
        if (res.status === 202) {
            setTasks(res.data.tasks);
        } else {
            setError('Marking the task complete failed, please try again.');
        }
        setToggleButton(true);
        setSubmitting(false);
    }

    return (
        <div className="task flex items-center gap-3 w-full md:w-2/3 lg:w-3/4 hover:shadow cursor-pointer hover:shadow-sky-200 p-3 my-0.5 bg-gray-100 border dark:border-indigo-500 rounded-md dark:bg-gradient-to-r from-indigo-900 to-violet-800">
            {submiting ?
                <div className="w-full flex justify-center items-center">
                    <Spinner aria-label="Extra small spinner example" size="md" />
                </div>
                :
                <div className="flex items-center gap-3 w-full">
                    <div>
                        {task.status !== "done" ?
                            toggleButton ?
                                <button onMouseEnter={hover} className="h-5 w-5 border-2 border-cyan-400 shadow rounded-full cursor-pointer bg-white p-0"></button>
                                :
                                <svg onClick={markComplete} onMouseLeave={hover} className="w-6 h-6 text-cyan-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            :
                            <svg onClick={markIncomplete} className="w-6 h-6 text-cyan-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        }
                    </div>
                    <div className="flex justify-between flex-grow items-center">
                        <div>
                            <h3 className="text-lg font-semibold dark:text-gray-50">{task.title}</h3>
                        </div>
                        <div className="flex items-center">
                            <Popover
                                className="overflow-hidden"
                                aria-labelledby="default-popover"

                                content={
                                    <div className="w-48 p-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gradient-to-br from-violet-900 to-indigo-800">
                                        {/* // edit task form : passing popover close function*/}
                                        <TaskEditForm task={task} setTasks={setTasks} setIsLoggedIn={setIsLoggedIn} />
                                        <button className="flex items-center w-full text-left text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white hover:text-semibold p-2">
                                            <span className="mr-2 flex justify-start">
                                                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                                </svg>
                                            </span>
                                            <span>
                                                Delete
                                            </span>
                                        </button>
                                    </div>
                                }
                            >
                                <button className="settings hidden rounded gap-1 flex-col justify-between items-center hover:shadow-md px-3 py-1">
                                    <div className="p-0.5 rounded-full bg-gray-400"></div>
                                    <div className="p-0.5 rounded-full bg-gray-400"></div>
                                    <div className="p-0.5 rounded-full bg-gray-400"></div>
                                </button>
                            </Popover>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
