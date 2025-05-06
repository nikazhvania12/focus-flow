import { useEffect, useState } from 'react';
import ModalComp from '../Modal/Modal';
import TaskComponent from '../Task/TaskComponent';
import Filter from '../../Components/Filter/Filter';
import ZoneBackground from '../ZoneBackground/ZoneBackground';
import './Home.css'
import { Button } from 'react-bootstrap';
import GetTasks from '../../API/GetTasks';
import { useNavigate } from 'react-router';


function Home({ currentUser }) {
    const [show, setShow] = useState(false);
    const [action, setAction] = useState("");
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState({
        TodoTasks: [],
        ProgressTasks: [],
        CompletedTasks: []
    });

    const [filter, setFilter] = useState({
        priority_id: 0,
        difficulty_id: 0,
        val: '',
        user_id: currentUser.id
    })

    const navigate = useNavigate();

    useEffect(() => {
        if(!currentUser)
            navigate('/')
    }, [])

    useEffect(() => {
        if(tasks) {
            async function Tasks() {
                const resp = await GetTasks(filter);
                setTasks(task => ({
                    ...task,
                    TodoTasks: resp.filter(x => x.status.id === 1),
                    ProgressTasks: resp.filter(x => x.status.id === 2),
                    CompletedTasks: resp.filter(x => x.status.id === 3)
                }));
            }
        Tasks();
        }
    }, [filter])
    function HandleShowModal(currentAction, task) {
        setAction(currentAction);
        setShow(true);
        if(task) {
            setSelectedTask(task);
        }


    }

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <ZoneBackground />
        <div style={{ position: 'relative', zIndex: 1 }}>
        <div className='home-container'>
            <div className='home-top'>
                <Filter className="filter" filter={filter} setFilter={setFilter}/>
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
            <div className='tasks-container-container'>
                <div className='tasks-content-container'>
                    {tasks && tasks.TodoTasks.map((task, index) => {
                        return (
                            <TaskComponent key={index} task={task} clickMethod={HandleShowModal} />
                        )
                    })}
                </div>
                <div className='tasks-content-container'>
                    {tasks && tasks.ProgressTasks.map((task, index) => {
                        return (
                            <TaskComponent key={index} task={task} clickMethod={HandleShowModal} />
                        )
                    })}
                </div>
                <div className='tasks-content-container'>
                    {tasks && tasks.CompletedTasks.map((task, index) => {
                        return (
                            <TaskComponent key={index} task={task} clickMethod={HandleShowModal} />
                        )
                    })}
                </div>
            </div>

        <ModalComp show={show} setShow={setShow} action={action} task={selectedTask} 
        tasks={tasks} setTasks={setTasks} />
        </div>
        </div>
      </div>
    )
}

export default Home;