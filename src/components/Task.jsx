

export default function Task({ task }) {


    return (
        <div className="flex items-center justify-between w-full md:w-2/3 lg:w-3/4 p-3 my-2 bg-white rounded-md shadow-sm dark:bg-gray-800">
            <div>
                <h3 className="text-lg font-semibold dark:text-gray-50">{task.title}</h3>
                <p className="text-sm dark:text-gray-200">{task.description}</p>
            </div>
            <div className="flex items-center">
                <button className="p-2 text-gray-50 bg-blue-500 rounded-md dark:bg-blue-600" onClick={() => console.log('Edit task')}>Edit</button>
                <button className="p-2 ml-2 text-gray-50 bg-red-500 rounded-md dark:bg-red-600" onClick={() => console.log('Delete task')}>Delete</button>
            </div>
        </div>
    )
}