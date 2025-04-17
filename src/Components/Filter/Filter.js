import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import './filter.css';

function Filter() {
    return (
        <div className='filter-container'>
            <div className="filter-component">
                <Dropdown className=''>
                    <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" className='filter-dropdown'>
                        Priority
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className='filter-input-container'>
                    <Form.Control type="text" placeholder="Search Tasks" className='filter-input' />
                    {"\u00A0"}
                    <Button variant="outline-primary">
                        <i class="bi bi-search"></i>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Filter;