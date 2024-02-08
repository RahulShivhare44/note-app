import React, { useState } from 'react';

const Menu = ({ onAddNote }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleAddNote = () => {
        if (title !== '' && body !== '') {
            const token = localStorage.getItem('Token');
            onAddNote({ title, body, token });
            setTitle('');
            setBody('');
        }
    };

    return (
        <div className="w-screen flex items-center justify-center">
            <div className="bg-richblack-800 w-[50%] p-4">
                <h1 className="text-2xl font-bold mb-4 text-blue-400">Notes App</h1>
                <div className="mb-4">
                    <label className="block text-gray-200 font-bold mb-2">Title:</label>
                    <input
                        required
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200 font-bold mb-2">Note Body:</label>
                    <textarea
                        required
                        className="w-full p-2 border rounded-md"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                </div>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-400"
                    onClick={handleAddNote}
                >
                    Add Note
                </button>
            </div>
        </div>
    );
};

export default Menu;
