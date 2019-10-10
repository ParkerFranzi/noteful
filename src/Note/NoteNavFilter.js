import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom'
import './NoteNav.css'

export default class NoteNavFilter extends Component {
    static contextType = ApiContext
    render() {
        const filter = this.context.notes.filter(note => note.folderId === this.props.match.params.folderId);
        return (
            <ul className="noteList">
                {filter.map(note =>
                    <li key={note.id}>
                        <NavLink to={`/note/${note.id}`}>
                            <h2>{note.name}</h2>
                        </NavLink>
                        <p>{note.modified}</p>
                        <button onClick={(e) => this.context.handleDeleteClick(note.id, this.props, e)}>Delete Note</button>
                    </li>
                )}
                <Link to='/addNote'>
                    Add Note
                </Link>
            </ul>
        )
    }
}