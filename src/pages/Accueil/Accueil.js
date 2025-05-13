import './Accueil.css';
import Cookies from "js-cookie";
import BtnBase from "../../components/btn_base/btn_base";

function Accueil({user}) {
    const token = Cookies.get("token");

    return (
        <main className="flex justify-center flex-col items-center">
            <div className='center-col'>
                {token && user ? <h1 className="text-4xl my-5">Bienvenue, {user.firstName}</h1> : <h1 className="text-4xl my-5">Bienvenue sur O'Poil</h1>}
                <div className='div-img-Accueil'>
                    <img
                        src='https://www.veterinaire-monveto.com/wp-content/uploads/2023/11/TRAME-CLINIQUE-HEADER2-2.png'
                        alt="Image d'un vétérinaire avec un chien à ses côtés"
                    />
                </div>
            </div>
            <div className='center-col'>
                <div className='p-Accueil'>
                Que vous soyez un propriétaire d'animal de compagnie à la recherche de soins experts ou un vétérinaire souhaitant proposer vos services, O'Poil est là pour vous faciliter la tâche.    
                </div>
                {token ? (
                    <>
                        {user && user.role === 'ROLE_USER' ? 
                            <BtnBase nav='/demandes/list' name='Voir mes demandes' /> 
                        : null}

                        {user && user.role === 'ROLE_VETO' ? 
                            <BtnBase nav='/posts' name='Voir les demandes' />
                        : null}
                    </>
                ) : (
                    <BtnBase nav='/inscription' name='Inscription' />
                )}
            </div>
        </main>
    );
}

export default Accueil;
