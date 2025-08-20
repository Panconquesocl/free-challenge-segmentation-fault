import MDEditor from '@uiw/react-md-editor';
import './NoteList.css'
export default function NoteList({notes, value, setValue}){
    
    const loadNote = (e) => {
        console.log(e.target.dataset.noteText);
        setValue(e.target.dataset.noteText);
    };
    const listNotes = notes.map((note,index)=>
    <div className="note-container" id={"note-"+index+"-container"} key={"note-"+index+"-container"}  >
        <button className="load-note-button" onClick={loadNote} key ={"note-"+index+"-button" } data-note-text = {note}> Cargar Nota</button>
        <MDEditor.Markdown onClick={loadNote} className="nav-note" source={note} style={{ whiteSpace: 'pre-wrap' }}key={"note-"+index+"preview"} />
    </div>)
    return(
        <>
        <div className='notes-navigation-items'>
           {listNotes}
         </div>
        </>
    )
}