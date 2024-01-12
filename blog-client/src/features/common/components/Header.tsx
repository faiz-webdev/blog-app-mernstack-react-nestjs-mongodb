import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png';

function Header() {
    return (
        <header>
            <div className='logo'>
                <NavLink to="/">
                    <img src={logo} width={50} alt="Blog" />
                </NavLink>
            </div>
            <div className='menu'>
                menu
            </div>
        </header>
    )
}

export default Header