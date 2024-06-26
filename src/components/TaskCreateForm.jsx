import { differenceInCalendarDays, differenceInMinutes, format, milliseconds } from "date-fns";
import { Button, Datepicker, Label, Modal, Spinner, TextInput, Textarea } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { createTask } from "../API/Tasks";
import { useNavigate } from "react-router-dom";

export default function TaskCreateForm({ setTasks, setIsLoggedIn }) {
    const navigate = useNavigate();
    const readyToSubmit = useRef(false);
    const [openModal, setOpenModal] = useState(false);
    const emailInputRef = useRef();
    const [isSubmiting, setIsSubmiting] = useState(false);

    const [values, setValues] = useState({
        title: '',
        description: '',
        deadline: format(new Date(), 'MMMM dd, yyyy'),
        time: format(new Date(), 'HH:mm'),
    });
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        deadline: '',
        time: ''
    });
    const [inputsStyle, setInputsStyle] = useState({
        title: '',
        description: '',
        deadline: '',
        time: ''
    });

    useEffect(() => {
        if (openModal) {
            emailInputRef.current?.focus();
        }
    }, [openModal]);

    const testRegExp = (target) => {
        if (target.name === 'title') {
            // title length must be between 3 and 100 characters
            const regExp = new RegExp(/^[a-zA-Z0-9\s]{3,100}$/);
            if (!regExp.test(target.value.trim())) {
                setErrors({
                    ...errors,
                    title: 'Title must be between 3 and 100 characters'
                });
                setInputsStyle({
                    ...inputsStyle,
                    title: 'failure'
                });
                return false;
            } else {
                setErrors({
                    ...errors,
                    title: ''
                });
                setInputsStyle({
                    ...inputsStyle,
                    title: 'success'
                });
                return true;
            }
        } else if (target.name === 'description') {
            // jsut check if the description is a text
            if (target.value.trim() === '') {
                setErrors({
                    ...errors,
                    description: 'Description must be a text'
                });
                setInputsStyle({
                    ...inputsStyle,
                    description: 'failure'
                });
                return false;
            } else {
                setErrors({
                    ...errors,
                    description: ''
                });
                setInputsStyle({
                    ...inputsStyle,
                    description: 'success'
                });
                return true;
            }
        } else if (target.name === 'deadline') {
            const deadline = new Date(target.value);
            // diff between now and deadline in days
            const diff = (differenceInCalendarDays(deadline, new Date()));
            if (diff < 0) {
                setErrors({
                    ...errors,
                    deadline: 'Deadline must be today or after today'
                });
                setInputsStyle({
                    ...inputsStyle,
                    deadline: 'failure'
                });
                return false;
            } else {
                testRegExp({ name: 'time', value: values.time });
                setErrors({
                    ...errors,
                    deadline: ''
                });
                setInputsStyle({
                    ...inputsStyle,
                    deadline: 'success'
                });
                return null;
            }
        } else if (target.name === 'time') {
            // check the deadline first
            if (errors.deadline !== '') {
                setErrors({
                    ...errors,
                    time: 'Please set the deadline first'
                });
                setInputsStyle({
                    ...inputsStyle,
                    time: 'failure'
                });
                return false;
            }
            // in case deadline is today time must be after now
            const now = new Date();
            const time = milliseconds({ hours: target.value.split(':')[0], minutes: target.value.split(':')[1] });
            const diff = differenceInMinutes(
                time,
                milliseconds({ hours: now.getHours(), minutes: now.getMinutes() })
            );
            // if the deadline is today
            if (differenceInCalendarDays(now, new Date(values.deadline)) === 0) {
                if (diff < 0) {
                    setErrors({
                        ...errors,
                        time: 'Time must be after now'
                    });
                    setInputsStyle({
                        ...inputsStyle,
                        time: 'failure'
                    });
                    return false;
                } else {
                    setErrors({
                        ...errors,
                        time: ''
                    });
                    setInputsStyle({
                        ...inputsStyle,
                        time: 'success'
                    });
                    return true;
                }
            }
            setErrors({
                ...errors,
                time: ''
            });
            setInputsStyle({
                ...inputsStyle,
                time: 'success'
            });
        }
    }

    const handleSubmit = async (event) => {
        const token = localStorage.getItem('token');
        if (!token) {
            // redirect to login page
            navigate('/login');
            return null;
        }
        event.preventDefault();
        if (!readyToSubmit.current) {
            setErrors({
                title: 'Title is required',
            });
            setInputsStyle({
                title: 'failure',
            });
            return null;
        }
        if (errors.title !== '' || errors.deadline !== '' || errors.time !== ''
            || values.title === '' || values.description === '' || values.deadline === '' || values.time === '') {
            return null;
        }
        setIsSubmiting(true);
        // send the data to the server with deadline and time as one field (deadline) type timestamp
        const data = { ...values, deadline: new Date(values.deadline + ' ' + values.time).toISOString().slice(0, 19).replace('T', ' ')};
        delete data.time;
        try {
            const response = await createTask(token, data);
            if (response.status === 201) {
                const tasks = response.data.tasks;
                setTasks(tasks);
                setValues({
                    title: '',
                    description: '',
                    deadline: format(new Date(), 'MMMM dd, yyyy'),
                    time: format(new Date(), 'HH:mm'),
                });
                setInputsStyle({
                    title: '',
                    description: '',
                    deadline: '',
                    time: ''
                });
                setOpenModal(false);
            } else if (response.status === 401) {
                setIsLoggedIn(false);
                localStorage.removeItem('token');
                navigate('/login');
            } else if (response.status === 400) {
                setErrors({
                    error: response.data.message,
                });
            }
            setIsSubmiting(false);
        } catch (error) {
            if (error.response.status === 401) {
                setIsLoggedIn(false);
                localStorage.removeItem('token');
                navigate('/login'); 
            } else {
                setErrors({
                    error: 'Something went wrong, please try again',
                });
            }
            setIsSubmiting(false);
        }
    };

    const handleChange = (target) => {
        if (!readyToSubmit.current) {
            readyToSubmit.current = true;
        }
        // handle date case from deadline input (Datepicker component) 
        if (target instanceof Date) {
            setValues({
                ...values,
                deadline: format(target, 'MMMM dd, yyyy')
            });
            testRegExp({ name: 'deadline', value: target });
            return null;
        }
        // handle text input case
        const { name, value } = target;
        setValues({
            ...values,
            [name]: value
        });
        testRegExp(target);
    }



    return (
        <>
            <Button onClick={() => setOpenModal(true)} className="bg-cyan-500 flex-grow-0 h-fit flex justify-between items-center">
                <div className="mr-2">
                    <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 1 0-18c1.052 0 2.062.18 3 .512M7 9.577l3.923 3.923 8.5-8.5M17 14v6m-3-3h6" />
                    </svg>
                </div>
                <div>New task</div>
            </Button>
            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={emailInputRef}>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {errors.error && <p className="text-red-500 text-sm">{errors.error}</p>}
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add new task</h3>
                        <div className="relative">
                            <div className="mb-2 block">
                                <Label htmlFor="title" value="Title" />
                            </div>
                            <TextInput color={inputsStyle.title} name="title" value={values.title} onChange={e => handleChange(e.target)} id="title" ref={emailInputRef} placeholder="title" required />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description" />
                            </div>
                            <Textarea color={inputsStyle.description} name="description" value={values.description} onChange={e => handleChange(e.target)} id="descrip
                            tion" placeholder="Description" />
                            <p className="text-red-500 text-sm">{errors.description}</p>
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <div className="mb-2 block">
                                    <Label htmlFor="deadline" value="Deadline" />

                                    <Datepicker color={inputsStyle.deadline} name="deadline"
                                        onSelectedDateChanged={handleChange} defaultDate={new Date()} value={values.deadline}
                                        id="deadline" maxDate={new Date("01/01/2050")} className="w-full" />
                                </div>
                                <div className="mb-2 block">
                                    <Label htmlFor="time" value="Time" />
                                    <div className="relative">
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <TextInput type="time" color={inputsStyle.time} name="time" value={values.time} onChange={e => handleChange(e.target)} id="time" placeholder="Time" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-red-500 text-sm">{errors.deadline}</p>
                                <p className="text-red-500 text-sm">{errors.time}</p>
                            </div>
                        </div>
                        <div>
                            {!isSubmiting ?
                                <Button className="w-full" onClick={handleSubmit} >
                                    Create task
                                </Button>
                                :
                                <Button className="w-full dark:bg-cyan-700">
                                    <Spinner aria-label="Spinner button example" size="sm" />
                                    <span className="pl-3">Submitting...</span>
                                </Button>
                            }
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
