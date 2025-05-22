import './Header.css';
import vetlib from './img/vetlib.png';
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
                    <img src={vetlib} alt="Logo O'Poil" className="max-w-16 ml-3 hover:cursor-pointer" onClick={() => navigate('/')}/>
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
