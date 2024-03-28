import logo from '../assets/logo.png';

export default function AppLogo() {
    return (
        <div className="flex justify-center items-center">
            <img src={logo} className="mr-1.5 h-6 sm:h-9" alt="App Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-sky-500 dark:text-cyan-300 ">Taskify</span>
        </div>
    )
}