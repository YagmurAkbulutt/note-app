import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./pages/Main"
import Create from "./pages/Create"
import Detail from "./pages/Detail"
import Edit from "./pages/Edit"
import { useLocalStorage } from "@uidotdev/usehooks"
import { Note, NoteData, Tag } from "./type"
import {v4} from "uuid"
import Layout from "./components/Layout"

const App = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  // etiket oluşturma fonk
  const createTag = (tag: Tag): void => {
    setTags([...tags, tag])
  }

  // not oluşturma fonk
  const createNote = (noteData: NoteData): void => {
    //formdan gelen veriye id ekle
    const newNote : Note = {
      id: v4(),
      ...noteData,
    }
    setNotes([...notes, newNote])
  }

  // not silme fonk
  const deleteNote = (id:string): void => {
    setNotes(notes.filter((n) => n.id !== id))
  }

  //not düzenleme fonk
  const updateNote = (id:string, updatedData: NoteData):void => {
    const updatedArr = notes.map((note) => note.id === id ? {id,...updatedData} : note);

    setNotes(updatedArr)
  }


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main notes={notes} availableTags={tags}/>}/>
      <Route path="/new" element={<Create createTag={createTag} handleSubmit={createNote} availableTags={tags}/>}/>

      <Route path="/note/:id" element={<Layout notes={notes}/>} >
      <Route index element={<Detail deleteNote={deleteNote}/>}/>
      <Route path="edit" element={<Edit handleSubmit={updateNote} createTag={createTag} availableTags={tags}/>}/>
      </Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App