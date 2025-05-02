import './Header.css';
import Logo from './logo.png'
import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        location.pathname != '/' &&
        <div className="header">
            <div className='header-left'>
                <div className='logo'>
                FocusFl<img className='header-logo' src={Logo} alt="o"></img>w
                </div>
            </div>
            <Button onClick={() => navigate('/')} variant="success" className='header-right-btn'>Sign Out</Button>
        </div>
    )
}

export default Header;
