import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import './NoteNav.css'

export default class NoteNav extends Component {
    static contextType = ApiContext
    render() {
        return (
            <ul className="noteList">
                {this.context.notes.map(note =>
                    <li key={note.id}>
                        <Link className={note.id} to={`/note/${note.id}`}>
                            <h2>{note.name}</h2>
                        </Link>
                        <p>{note.modified}</p>
                        <button onClick={(e) => this.context.handleDeleteClick(note.id, this.props, e)}>Delete Note</button>
                    </li>
                )}
                <Link className="addNoteLink" to='/addNote'>
                    Add Note
                </Link>
            </ul>
        )
    }
}