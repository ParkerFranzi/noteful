import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import ValidationError from '../ValidationError'


class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteName: {
                value: '',
                touched: false
            },
            noteContent: {
                value: '',
                touched: false
            },
            noteFolder: {
                value: '',
                touched: false
            },
            noteModified: new Date()
        }
    }
    updateNoteName(noteName) {
        this.setState({noteName: {value: noteName, touched: true}})
    }
    updateNoteContent(noteContent) {
        this.setState({noteContent: {value: noteContent, touched: true}})
    }
    updateNoteModified(date) {
        this.setState({noteModified: date})
    }
    updateNoteFolder(folder) {
        this.setState({noteFolder: {value: folder}})
    }
    static contextType = ApiContext

    state = {
        error: null,
    };
    handleSubmit = e => {
        e.preventDefault()
        const { noteName, noteContent, noteFolder, noteModified } = this.state
        const note = {
            name: noteName.value,
            modified: noteModified,
            folderId: noteFolder.value,
            content: noteContent.value
        }
        console.log(note)
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(note => {
            this.context.addNote(note)
            this.props.history.push(`/note/${note.id}`)
        })
        .catch(error => {
            console.error({ error })
        })
    }
    validateName() {
        const noteName = this.state.noteName.value.trim()
        if (noteName.length === 0) {
            return 'Note must have a name'
        }
        else if (noteName.length < 3) {
            return 'Note name must have at least 3 characters'
        }
    }
    validateFolder() {
        const noteFolder = this.state.noteFolder.value
        if (noteFolder.length === 0) {
            return 'Please select a folder for your note'
        }
    }

    render() {
        const nameError = this.validateName();
        console.log(this.state)
        return (
            <section className="addNote">
                <h2>Add Note</h2>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor="noteName">Note Name *</label>
                    <input 
                        type="text" 
                        className="noteName" 
                        name="noteName" 
                        id="noteName"
                        onChange={e => this.updateNoteName(e.target.value)}
                    />
                    {this.state.noteName.touched && (<ValidationError message={nameError} />)}
                    <label htmlFor="noteFolder">Note Folder *</label>
                    <select 
                        type="text" 
                        className="noteFolder" 
                        name="noteFolder" 
                        id="noteFolder"
                        defaultValue="default"
                        onChange={e => this.updateNoteFolder(e.target.value)}
                    >
                        <option value="default" disabled>Select a folder</option>
                        {this.context.folders.map(folder =>
                            <option key={folder.id} value={folder.id}>{folder.name}</option>
                        )}
                    </select>
                    <label htmlFor="noteContent">Note Content</label>
                    <textarea
                        type="text" 
                        className="noteContent" 
                        name="noteContent" 
                        id="noteContent"
                        onChange={e => this.updateNoteContent(e.target.value)}
                    />
                    <button 
                        type="submit"
                        className="noteName_registration_button"
                        disabled={
                            this.validateName() ||
                            this.validateFolder()
                        }
                        onSubmit={() => this.updateNoteModified(new Date())}
                    >
                        Add Note
                    </button>
                </form>
            </section>
        )
    }
}

export default AddNote
