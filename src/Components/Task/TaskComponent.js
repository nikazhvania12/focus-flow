import DifficultyComponent from '../Difficulty/DifficultyComponent';
import PriorityComponent from '../Priority/PriorityComponent';
import './taskComponent.css'

function TaskComponent() {
    return (
        <div className="task-component">
            <div className='task-top-info'>
                <div className='task-smallview-date'>30 მარტი, 2025</div>
                <PriorityComponent />
                <DifficultyComponent />
            </div>
            <div className='task-smallview-title'>
                <p>this is a very large title</p>
            </div>
            <div className='task-smallview-content'>
                contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
            </div>
        </div>
    )
}

export default TaskComponent;