import React from 'react';
import AnimalForm from "./AnimalForm";

function Profile({ user }) {

    if (!user) {
        return <p>Vous n'êtes pas connecté.</p>;
    }

    return (
        <main className="pt-28 w-[50vw] mx-auto">
            <h1 className="text-4xl text-center mb-6">Profil</h1>
            <div className="flex">
                <div className="w-full md:w-1/2 mx-auto">
                    <div className="form-group mb-4">
                        <label className="block text-gray-700">Prénom:</label>
                        <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">{user.firstName}</p>
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-gray-700">Nom:</label>
                        <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">{user.lastName}</p>
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-gray-700">Role:</label>
                        <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                            {user.role === 'ROLE_USER' ? 'Utilisateur' : 'Vétérinaire'}
                        </p>
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">{user.email}</p>
                    </div>
                </div>
                {user && user.role === 'ROLE_USER' ? <AnimalForm /> : null}
            </div>
        </main>
    );
}

export default Profile;