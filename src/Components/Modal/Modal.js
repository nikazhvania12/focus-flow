import './modal.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import { useState, useEffect } from 'react';
import GetPriorities from '../../API/GetPriorities';
import GetDifficulties from '../../API/GetDifficulties';
import AddTaskApi from '../../API/AddTask';
import DeleteTaskApi from '../../API/DeleteTask';
import EditTaskApi from '../../API/EditTask';
import GetStatuses from '../../API/GetStatuses';

function ModalComp({ show, setShow, action, task, tasks, setTasks }) {
    const [priority, setPriority] = useState({
      value: null,
      label: null
    });
    const [difficulty, setDifficulty] = useState({
      value: null,
      label: null
    });
    const [status, setStatus] = useState({
      value: null,
      label: null
    });

    useEffect(() => {
      if(task) { 
          function GetData() {
              setPriority(priority => ({...priority, label: task.priority.name, value: task.priority.id}));
              setDifficulty(difficulty => ({...difficulty, label: task.difficulty.name, value: task.difficulty.id}));
              setStatus(status => ({...status, label: task.status.name, value: task.status.id}));
          }
          GetData();
        }
      }, [task])
    return (
        action === "Add" ? (
          <AddTask show={show} setShow={setShow} tasks={tasks} setTasks={setTasks} />
        ) : action === "Edit" ? (
          <EditTask show={show} setShow={setShow} task={task} setTasks={setTasks}
           priority={priority} difficulty={difficulty} status={status} />
        ) : action === "View" ? (
          <ViewTask show={show} setShow={setShow} task={task} priority={priority} difficulty={difficulty} />
        ) : action === "Delete" && (
          <DeleteTask show={show} setShow={setShow} task={task} tasks={tasks} setTasks={setTasks} />
        )
    )
}

function AddTask({show, setShow, tasks, setTasks}) {
  const [taskToAdd, setTaskToAdd] = useState({
      deadline: '',
      title: '',
      difficulty_id: 0,
      priority_id: 0,
      description: '',
      status_id: 1,
      user_id: 1
  });
  const [priorites, setPriorities] = useState();
  const [difficulties, setDifficulties] = useState();

  useEffect(() => {
      async function GetData() {
          const priorites = await GetPriorities();
          const difficulties = await GetDifficulties();

          const mappedPriorities = priorites.map(p => ({
            value: p.id,
            label: p.name
          }))
          const mappedDifficulties = difficulties.map(d => ({
            value: d.id,
            label: d.name
          }))

          setPriorities(mappedPriorities);
          setDifficulties(mappedDifficulties);
      }

      GetData();
  }, [])

  async function handleSubmit() {
    if(taskToAdd.deadline.trim() === '' ||
       taskToAdd.title.trim() === '' ||
       taskToAdd.difficulty_id <= 0 ||
       taskToAdd.priority_id <= 0 ||
       taskToAdd.description.trim() === '' 
    )
      return;

    const newTask = await AddTaskApi(taskToAdd);
    setTasks(prev => ({
      ...prev,
      TodoTasks: [...prev.TodoTasks, newTask]
    }));
    setShow(false);
  }

  return (
    <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Add Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div class="input-group mb-3">
    <div class="input-group-prepend">
        <span class="input-group-text" id="deadline">Deadline</span>
    </div>
        <input onChange={(e) => setTaskToAdd(task => ({...task, deadline: e.target.value}))}
         type="date" class="form-control" placeholder="" />
    </div>
    <div class="input-group mb-3">
        <input onChange={(e) => setTaskToAdd(task => ({...task, title: e.target.value}))}
         type="text" class="form-control" placeholder="Title" />
    </div>
    <div class="input-group mb-3">
        <Select options={difficulties} onChange={(selected) => setTaskToAdd(task => ({...task, difficulty_id: selected.value}))} 
        className='add-task-select' placeholder="Select Task Difficulty" />
    </div>
    <div class="input-group mb-3">
        <Select options={priorites} onChange={(selected) => setTaskToAdd(task => ({...task, priority_id: selected.value}))}
         className='add-task-select' placeholder="Select Task Priority" />
    </div>
    <div>
    <textarea onChange={(e) => setTaskToAdd(task => ({...task, description: e.target.value}))} 
    class="form-control" id="description-textarea" rows="3" placeholder='Task Description...'></textarea>
    </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleSubmit}>
        Add Task!
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

function EditTask({show, setShow, task, setTasks, priority, difficulty, status}) {
  const [taskToEdit, setTaskToEdit] = useState({
    deadline: task.deadline,
    title: task.title,
    description: task.description,
    status_id: status.value,
    priority_id: priority.value,
    difficulty_id: difficulty.value,
  });

  const [priorites, setPriorities] = useState();
  const [difficulties, setDifficulties] = useState();
  const [statuses, setStatuses] = useState();


  useEffect(() => {
      async function GetData() {
          const priorites = await GetPriorities();
          const difficulties = await GetDifficulties();
          const statuses = await GetStatuses();

          const mappedPriorities = priorites.map(p => ({
            value: p.id,
            label: p.name
          }))
          const mappedDifficulties = difficulties.map(d => ({
            value: d.id,
            label: d.name
          }))
          const mappedStatuses = statuses.map(s => ({
            value: s.id,
            label: s.name
          }))

          setPriorities(mappedPriorities);
          setDifficulties(mappedDifficulties);
          setStatuses(mappedStatuses);

          setTaskToEdit(x => ({
            ...x,
            priority: priority,
            difficulty: difficulty,
            status: status
          }))
      }

      GetData();
  }, [priority, difficulty, status])

  useEffect(() => {}, [difficulty])

  async function handleUpdate() {
    if (
      taskToEdit.deadline.trim() === '' ||
      taskToEdit.title.trim() === '' ||
      taskToEdit.description.trim() === ''
    ) return;

    
    const updatedTask = {
      ...taskToEdit,
      difficulty_id: taskToEdit.difficulty.value,
      priority_id: taskToEdit.priority.value,
      status_id: taskToEdit.status.value,
    };
    
    const EditedTask = await EditTaskApi(updatedTask, task.id);
  
    let statusKey = '';
    switch (EditedTask.status.id) {
      case 1:
        statusKey = 'TodoTasks';
        break;
      case 2:
        statusKey = 'ProgressTasks';
        break;
      case 3:
        statusKey = 'CompletedTasks';
        break;
      default:
        return;
    }
  
    setTasks(prev => {
      const updatedTasks = {
        TodoTasks: prev.TodoTasks.filter(t => t.id !== EditedTask.id),
        ProgressTasks: prev.ProgressTasks.filter(t => t.id !== EditedTask.id),
        CompletedTasks: prev.CompletedTasks.filter(t => t.id !== EditedTask.id),
      };
      updatedTasks[statusKey] = [...(updatedTasks[statusKey] || []), EditedTask];
  
      return updatedTasks;
    });
  
    setShow(false);
  }
  
  
  return (
    <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div class="input-group mb-3">
    <div class="input-group-prepend">
        <span class="input-group-text" id="deadline">Deadline</span>
    </div>
        <input value={taskToEdit.deadline} 
        onChange={(e) => {setTaskToEdit(x => ({...x, deadline: e.target.value}))}} type="date" class="form-control" placeholder="" />
    </div>
    <div class="input-group mb-3">
        <input onChange={(e) => {setTaskToEdit(x => ({...x, title: e.target.value}))}}  
        type="text" class="form-control" placeholder="Title" value={taskToEdit.title} />
    </div>
    <div class="input-group mb-3">
        <Select value={taskToEdit.difficulty} options={difficulties}
        onChange={(option) => {
          setTaskToEdit(x => ({ ...x, difficulty: option }));
        }}
        className='add-task-select' placeholder="Select Task Difficulty" />
    </div>
    <div class="input-group mb-3">
    <Select value={taskToEdit.priority} options={priorites}
        onChange={(option) => {
          setTaskToEdit(x => ({ ...x, priority: option }));
        }}
        className='add-task-select' placeholder="Select Task Priority" />
    </div>
    <div class="input-group mb-3">
    <Select value={taskToEdit.status} options={statuses}
        onChange={(option) => {
          setTaskToEdit(x => ({ ...x, status: option }));
        }}
        className='add-task-select' placeholder="Select Task Status" />
    </div>
    <div>
    <textarea class="form-control"
    onChange={(e) => {setTaskToEdit(x => ({...x, description: e.target.value}))}}
    id="description-textarea" rows="3" value={taskToEdit.description} placeholder='Task Description...'>

    </textarea>
    </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleUpdate}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

function ViewTask({show, setShow, task, priority, difficulty}) {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>View Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div class="input-group mb-3">
    <div class="input-group-prepend">
        <span class="input-group-text" id="deadline">Deadline</span>
    </div>
        <input type="date" class="form-control" placeholder="" value={task.deadline} disabled/>
    </div>
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Title" value={task.title} disabled/>
    </div>
    <div class="input-group mb-3">
        <Select value={priority} className='add-task-select' placeholder="Select Task Difficulty" isDisabled={true}/>
    </div>
    <div class="input-group mb-3">
        <Select value={difficulty} className='add-task-select' placeholder="Select Task Priority" isDisabled={true}/>
    </div>
    <div>
    <textarea class="form-control" id="description-textarea" rows="3" value={task.description} placeholder='Task Description...' disabled>

    </textarea>
    </div>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={() => setShow(false)}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

function DeleteTask({show, setShow, task, tasks, setTasks}) {
  async function handleDelete() {
    await DeleteTaskApi(task.id);

    const updatedTasks = { ...tasks };

    if (updatedTasks.TodoTasks.some(t => t.id === task.id)) {
        updatedTasks.TodoTasks = updatedTasks.TodoTasks.filter(t => t.id !== task.id);
    } else if (updatedTasks.ProgressTasks.some(t => t.id === task.id)) {
        updatedTasks.ProgressTasks = updatedTasks.ProgressTasks.filter(t => t.id !== task.id);
    } else if (updatedTasks.CompletedTasks.some(t => t.id === task.id)) {
        updatedTasks.CompletedTasks = updatedTasks.CompletedTasks.filter(t => t.id !== task.id);
    }
    setTasks(updatedTasks);

    setShow(false);
}

  return (
    <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Delete Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <h3>Are You Sure You want to Delete This Task?</h3>   
    </Modal.Body>
    <Modal.Footer>
    <Button variant="danger" onClick={() => handleDelete()}>
        Delete
      </Button>
    <Button variant="secondary" onClick={() => setShow(false)}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalComp;