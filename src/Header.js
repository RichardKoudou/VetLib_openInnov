import './Header.css';
import logo from './img/logo.png';
import Navigation from './components/Navigation/Navigation';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";

function Header({ user }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <header className="opoil-header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="Logo O'Poil" className="max-w-20 ml-3 hover:cursor-pointer" onClick={() => navigate('/')}/>
                    <h1 className="pl-8">VetLib</h1>
                </div>
                <div className="burger-menu" onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </header>
            <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} user={user}/>
        </>
    );
}

export default Header;
