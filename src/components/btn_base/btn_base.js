import './btn_base.css';
import {useNavigate} from "react-router-dom";

function BtnBase({nav, name}) {
    const navigate = useNavigate();

    return (
        <button className="btn_base" onClick={() => navigate(nav)}>
            {name}
        </button>
    );
}

export default BtnBase;
