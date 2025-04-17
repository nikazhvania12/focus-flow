import TaskComponent from '../Task/TaskComponent';
import './Home.css'

function Home() {
    return (
        <div className='home-container'>
            <div className="home-component">
                <div className="todo-tasks tasks">To-Do</div>
                <div className="progress-tasks tasks">In Progress</div>
                <div className="done-tasks tasks">Completed</div>
            </div>
            <div className='tasks-container'>
                <TaskComponent />
            </div>
        </div>
    )
}

export default Home;