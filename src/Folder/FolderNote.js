import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom'

export default class FolderNote extends Component {
    static contextType = ApiContext
    render() {
        console.log(this.props, this.context)
        const { notes, folders } = this.context
        const note = notes.find(note => note.id === this.props.match.params.noteId) || {};
        const folderId = note.folderId;
        const folder = folders.find(folder => folder.id === folderId) || {};
        return (
            <ul className="folderList">
                {folder.name}
                <Link to='/addFolder'>
                    Add Folder
                </Link>
            </ul>
        )
    }
}
