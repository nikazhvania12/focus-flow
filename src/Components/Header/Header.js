import './Header.css';
import Logo from './logo.png'
import { Button } from 'react-bootstrap';

function Header() {
    return (

    <div className="header">
        <div className='header-left'>
            <div className='logo'>
            FocusFl<img className='header-logo' src={Logo} alt="o"></img>w
            </div>
            <div className = 'header-create-task'>
            <Button variant="outline-primary" className='header-create-task-btn'>
                <div className='header-btn-content'>
                    <span>+</span>
                    {"\u00A0"}
                    <span>Add Task</span>
                </div>
            </Button>
            </div>
        </div>
        <div className='header-right'>
            <Button variant="success" className='header-right-btn'>Log in</Button>
            <Button variant="success" className='header-right-btn'>Register</Button>
        </div>
    </div>
    )
}

export default Header;
