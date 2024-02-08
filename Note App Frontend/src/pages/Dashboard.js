import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Note from '../components/Note';
import { toast } from 'react-hot-toast';
import { postData } from '../Services/NodeServices';

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

  const fetchAllNotes = async () => {
    const token = localStorage.getItem('Token');
    const allNotes = await postData('note/fetchallnotes', { token });
    setNotes(allNotes.data);
  }

  const addNote = async (newNote) => {
    const createNote = await postData('note/create', newNote);
    if (createNote.status) {
      fetchAllNotes();
      toast.success(createNote.message);
    } else {
      toast.error(createNote.message);
    }
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <div className='bg-richblack-900'>
      <Menu onAddNote={addNote} />
      <div className="container mx-auto mt-8 flex justify-center items-center flex-wrap">
        {notes.length > 0 ? notes.map((note, index) => (
          <Note key={index} noteId={note.noteid} title={note.title} body={note.body} fetchAllNotes={fetchAllNotes} />
        )) : ''}
      </div>
    </div>
  );
}

