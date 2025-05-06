import DifficultyComponent from '../Difficulty/DifficultyComponent';
import PriorityComponent from '../Priority/PriorityComponent';
import { Button } from 'react-bootstrap';

import './taskComponent.css'

function TaskComponent({ task, clickMethod }) {
    return (
        task &&
        <div className="task-component" onClick={() => clickMethod("View", task)}>
            <div className='task-top-info'>
                <div className='task-smallview-date'>{task.deadline}</div>
                <div className='task-helper-components'>
                    <PriorityComponent data={task.priority} />
                    <DifficultyComponent data={task.difficulty} />
                </div>
            </div>
            <div>
                <div className='task-smallview-title'>
                    <p>{task.title}</p>
                </div>
                <div className='task-smallview-content'>
                    {task.description && task.description.length >= 150 ? `${task.description.substring(0, 150)}...` : task.description}
                </div>
            </div>
            <div className='task-display-buttons'>
                <Button onClick={(e) => {e.stopPropagation(); clickMethod("Delete", task)}} variant="outline-danger">
                <i class="bi bi-trash"></i>
                {"\u00A0"}
                {"\u00A0"}
                <p>Delete</p>
                </Button>
                
                {"\u00A0"}
                {"\u00A0"}
                {"\u00A0"}
                {"\u00A0"}

                <Button variant="outline-primary" onClick={(e) => {e.stopPropagation(); clickMethod("Edit", task)}}>
                <i class="bi bi-pen"></i>
                {"\u00A0"}
                {"\u00A0"}
                <p>Edit</p>
                </Button>
            </div>
        </div>
    )
}

export default TaskComponent;