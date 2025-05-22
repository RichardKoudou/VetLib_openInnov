import React from 'react';
import AnimalForm from "./AnimalForm";

function Profile({ user }) {

    if (!user) {
        return <p>Vous n'êtes pas connecté.</p>;
    }

    return (
        <main className="pt-20 px-4 sm:px-6 lg:px-8 container mx-auto">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-center mb-8">Profil</h1>
                <div className="flex flex-col lg:flex-row justify-center gap-8">
                    <div className="w-full lg:w-3/5">
                        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                            <div className="form-group mb-4">
                                <label className="block text-sm font-medium text-gray-700">Prénom:</label>
                                <p className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-gray-50">{user.firstName}</p>
                            </div>
                            <div className="form-group mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nom:</label>
                                <p className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-gray-50">{user.lastName}</p>
                            </div>
                            <div className="form-group mb-4">
                                <label className="block text-sm font-medium text-gray-700">Role:</label>
                                <p className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-gray-50">
                                    {user.role === 'ROLE_USER' ? 'Utilisateur' : 'Vétérinaire'}
                                </p>
                            </div>
                            <div className="form-group mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email:</label>
                                <p className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-gray-50">{user.email}</p>
                            </div>
                        </div>
                    </div>
                    {user && user.role === 'ROLE_USER' && (
                        <div className="w-full lg:w-2/5">
                            <AnimalForm />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Profile;