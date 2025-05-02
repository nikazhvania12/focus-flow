import { useState } from 'react';
import ModalComp from '../Modal/Modal';
import TaskComponent from '../Task/TaskComponent';
import Filter from '../../Components/Filter/Filter';
import ZoneBackground from '../ZoneBackground/ZoneBackground';
import './Home.css'
import { Button } from 'react-bootstrap';


function Home() {
    const [show, setShow] = useState(false);
    const [action, setAction] = useState("");
    const task = {
        deadline: '2005-03-30',
        title: 'this is a very large title',
        description: 'contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
        priority: "High",
        difficulty: "Normal"
    }

    function HandleShowModal(currentAction) {
        setAction(currentAction);
        setShow(true);
    }

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <ZoneBackground />
        <div style={{ position: 'relative', zIndex: 1 }}>
        <div className='home-container'>
            <div className='home-top'>
                <Filter className="filter"/>
                <Button onClick={() => HandleShowModal("Add")} variant="primary" className='home-create-task-btn'>
                    <div className='home-btn-content'>
                        <i class="bi bi-journal-plus"></i>
                        {"\u00A0"}
                        {"\u00A0"}
                        {"\u00A0"}
                        {"\u00A0"}
                        <h4>Add Task</h4>
                    </div>
                </Button>
            </div>
            <div className="home-component">
                <div className="todo-tasks tasks">To-Do</div>
                <div className="progress-tasks tasks">In Progress</div>
                <div className="done-tasks tasks">Completed</div>
            </div>
            <div className = 'header-create-task'>
            </div>
            <div className='tasks-container'>
                <TaskComponent task={task} clickMethod={HandleShowModal} />
            </div>

        <ModalComp show={show} setShow={setShow} action={action} task={task} />
        </div>
        </div>
      </div>
    )
}

export default Home;