import './modal.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'

function ModalComp({ show, setShow, action, task }) {
    return (
        action === "Add" ? (
          <AddTask show={show} setShow={setShow} />
        ) : action === "Edit" ? (
          <EditTask show={show} setShow={setShow} task={task} />
        ) : action === "View" ? (
          <ViewTask show={show} setShow={setShow} task={task} />
        ) : action === "Delete" && (
          <DeleteTask show={show} setShow={setShow} />
        )
    )
}

function AddTask({show, setShow}) {
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
        <input type="date" class="form-control" placeholder="" />
    </div>
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Title" />
    </div>
    <div class="input-group mb-3">
        <Select className='add-task-select' placeholder="Select Task Difficulty" />
    </div>
    <div class="input-group mb-3">
        <Select className='add-task-select' placeholder="Select Task Priority" />
    </div>
    <div>
    <textarea class="form-control" id="description-textarea" rows="3" placeholder='Task Description...'></textarea>
    </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={() => setShow(false)}>
        Add Task!
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

function EditTask({show, setShow, task}) {
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
        <input type="date" class="form-control" placeholder="" value={task.deadline} />
    </div>
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Title" value={task.title} />
    </div>
    <div class="input-group mb-3">
        <Select className='add-task-select' placeholder="Select Task Difficulty" />
    </div>
    <div class="input-group mb-3">
        <Select className='add-task-select' placeholder="Select Task Priority" />
    </div>
    <div>
    <textarea class="form-control" id="description-textarea" rows="3" value={task.description} placeholder='Task Description...'>

    </textarea>
    </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={() => setShow(false)}>
        Save Task!
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

function ViewTask({show, setShow, task}) {
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
        <Select className='add-task-select' placeholder="Select Task Difficulty" isDisabled={true}/>
    </div>
    <div class="input-group mb-3">
        <Select className='add-task-select' placeholder="Select Task Priority" isDisabled={true}/>
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

function DeleteTask({show, setShow}) {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Delete Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <h3>Are You Sure You want to Delete This Task?</h3>   
    </Modal.Body>
    <Modal.Footer>
    <Button variant="danger" onClick={() => setShow(false)}>
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