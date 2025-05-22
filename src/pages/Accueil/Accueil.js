import './Accueil.css';
import Cookies from "js-cookie";
import BtnBase from "../../components/btn_base/btn_base";

function Accueil({user}) {
    const token = Cookies.get("token");

    return (
        <main className="flex justify-center items-center min-h-screen p-8 pb-20 sm:pb-8 bg-gray-50">
            <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 order-2 lg:order-1">
                    {token && user ? 
                        <h1 className="welcome-title">Bienvenue, {user.firstName}</h1> 
                        : 
                        <h1 className="welcome-title">Bienvenue sur VetLib</h1>
                    }
                    <div className='p-Accueil'>
                        <p>
                            Découvrez VetLib, votre plateforme de mise en relation entre propriétaires d'animaux et vétérinaires. 
                            Nous simplifions la recherche de soins vétérinaires de qualité pour vos compagnons.
                        </p>
                    </div>
                    <div className="flex justify-start mb-16 sm:mb-0">
                        {token ? (
                            <>
                                {user && user.role === 'ROLE_USER' && 
                                    <BtnBase className="action-button" nav='/demandes/list' name='Voir mes demandes' />}
                                {user && user.role === 'ROLE_VETO' && 
                                    <BtnBase className="action-button" nav='/posts' name='Voir les demandes' />}
                            </>
                        ) : (
                            <BtnBase className="action-button" nav='/inscription' name='Rejoignez-nous' />
                        )}
                    </div>
                </div>
                <div className="flex-1 order-1 lg:order-2">
                    <div className='div-img-Accueil'>
                        <img
                            src='https://storage.letudiant.fr/mediatheque/letudiant/7/3/2747473-le-veterinaire-diagnostique-et-traite-les-maladies-des-animaux-original.jpg'
                            alt="Un vétérinaire prenant soin d'un animal"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Accueil;
