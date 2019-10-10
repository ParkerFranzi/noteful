import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom'


export default class Note extends Component {
    static contextType = ApiContext
    
    render() {
        console.log(this.props)
        const filter = this.context.notes.filter(note => note.id === this.props.match.params.noteId);
        return (
            <ul className="noteList">
                {filter.map(note =>
                <div key={note.id}>
                    <li>
                        <h2>{note.name}</h2>
                        <p>last modified: {note.modified}</p>
                        <button onClick={(e) => this.context.handleDeleteClick(note.id, this.props, e)}>Delete Note</button>
                    </li>
                    <p className="noteContent">{note.content}</p>
                </div>
                )}
                <Link to='/addNote'>
                    Add Note
                </Link>
            </ul>
        )
    }
}
