import Header from "./Header";
import Accueil from "./pages/Accueil/Accueil";
import {
    BrowserRouter as Router, Navigate,
    Route,
    Routes,
} from "react-router-dom";
import Inscription from "./components/Auth/Inscription";
import Profile from "./components/User/Profile";
import Login from "./components/Auth/Login";
import Mes_Demande from "./pages/Mes_Demandes/Mes_Demande";
import PostList from "./components/Veterinarian/PostList";
import PrivateRoute from "./components/Auth/PrivateRoute";
import {UserContext} from "./Contexts/UserContext";
import {useContext} from "react";
import Create_Demande from "./pages/Create_Demande/Create_Demande";

function App() {
    const { user, loading, error } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Router>
            {!loading ?
            <div className="reactor">
                <Header user={user} />

                <Routes>
                    <Route exact path="/" element={<Accueil user={user} />} />
                    <Route path="/inscription" element={<Inscription />} />
                    <Route path="/connexion" element={<Login />} />
                    <Route path="/compte" element={<PrivateRoute element={<Profile user={user} />} />} />
                    <Route path="/demandes/list" element={user && user.role === 'ROLE_USER' ? <PrivateRoute element={<Mes_Demande user={user} />} /> : <Navigate to="/" />} />
                    <Route exact path="/posts" element={user && user.role === 'ROLE_VETO' ? <PrivateRoute element={<PostList user={user} finished={false}/>} /> : <Navigate to='/'/>} />
                    <Route exact path="/advices" element={user && user.role === 'ROLE_VETO' ? <PrivateRoute element={<PostList user={user} finished={true}/>} /> : <Navigate to='/'/>} />
                    <Route path="/demandes/create" element={user && user.role === 'ROLE_USER' ? <PrivateRoute element={<Create_Demande user={user} />} /> : <Navigate to="/" />} />
                </Routes>
            </div>
            : null}
        </Router>
    );
}

export default App;