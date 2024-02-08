import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { postData } from '../Services/NodeServices';
import toast from 'react-hot-toast';

const Note = ({ title, body, noteId, fetchAllNotes }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedBody, setEditedBody] = useState(body);
    const [noteid, setNoteId] = useState(noteId);

    const handleEdit = () => {
        setIsModalOpen(true);
        setEditedBody(body);
        setEditedTitle(title);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSave = async () => {
        const token = localStorage.getItem('Token');
        const editNote = await postData('note/editnote', { title: editedTitle, body: editedBody, id: noteid, token: token })
        if (editNote.status) {
            setIsModalOpen(false);
            toast.success(editNote.message);
        }
        else {
            toast.error(editNote.message);
        }
        fetchAllNotes();
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('Token');
        const deleteNote = await postData('note/deletenote', { id: noteid, token: token })

        if (deleteNote.status) {
            setIsModalOpen(false);
            toast.success(deleteNote.message);
            setEditedTitle('');
            setEditedBody('');
            await fetchAllNotes();
        } else {
            toast.error(deleteNote.message);
        }
    };

    useEffect(() => {
        setNoteId(noteId);
    }, [handleDelete]);

    return (
        <div className="bg-richblack-800 p-4 mb-4 shadow-md rounded-md w-[30%] m-3">
            <h2 className="text-gray-200 text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-200">{body}</p>
            <div className="mt-4 flex justify-end">
                <button
                    className="mr-2 bg-blue-500 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-400"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md font-bold hover:bg-red-400"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>

            {/* Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Edit Note"
                className="Modal"
                overlayClassName="Overlay"
                ariaHideApp={false}
            >
                <h2 className="text-xl font-bold mb-4 text-blue-400">Edit Note</h2>
                <div className="mb-4">
                    <label className="block text-gray-200 font-bold mb-2">Title:</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200 font-bold mb-2">Note Body:</label>
                    <textarea
                        className="w-full p-2 border rounded-md"
                        value={editedBody}
                        onChange={(e) => setEditedBody(e.target.value)}
                    ></textarea>
                </div>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-400 mr-2"
                    onClick={handleSave}
                >
                    Save
                </button>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-400"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </Modal>
        </div>
    );
};

export default Note;
