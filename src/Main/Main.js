import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import NoteNav from '../Note/NoteNav'
import FolderNav from '../Folder/FolderNav'
import Folder from '../Folder/Folder'
import NoteNavFilter from '../Note/NoteNavFilter'
import Note from '../Note/Note'
import FolderNote from '../Folder/FolderNote'
import AddFolder from '../Folder/AddFolder'
import AddNote from '../Note/AddNote'
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types';
import './Main.css'


export default class Main extends Component {
    state = {
        folders: [],
        notes: [],
    }
    setNotes = notes => {
        this.setState({
            notes: notes
        })
    }
    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
        
        .then(([notesRes, folderRes]) => {
            if(!notesRes.ok)
                return notesRes.json().then(e => Promise.reject(e));
            if (!folderRes.ok)
                return folderRes.json().then(e => Promise.reject(e));
            return Promise.all([notesRes.json(), folderRes.json()])
        })
        .then(([notes, folders]) => {
            this.setState({notes, folders})
        })
        .catch(error => {console.log({ error })
        })
    }
    addFolder = (folder) => {
        this.setState({
            folders: [
                folder,
                ...this.state.folders,
                
            ]
        })
    }
    addNote = (note) => {
        console.log(note)
        this.setState({
            notes: [
                note,
                ...this.state.notes,
            ]
        })
    }
    deleteNote = (noteId, props) => {
        const newNotes = this.state.notes.filter(note => note.id !== noteId)
        if (props.match.path === "/note/:noteId") {
            props.history.push('/')
        }
        this.setState({
            notes: newNotes
        })
    }
    handleDeleteClick = (noteId, props, event) => {
        event.preventDefault()
        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(() => {
            this.deleteNote(noteId, props)
        })
        .catch(error => {
            console.error(error)
        })
    
    }
    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            addFolder: this.addFolder,
            addNote: this.addNote,
            deleteNote: this.deleteNote,
            handleDeleteClick: this.handleDeleteClick
        }
        return (
            <ApiContext.Provider value={value}>
            <div className="main">
                <Link to="/"><header><h1>Noteful</h1></header></Link>
                <div className="sideBar">
                    <Route
                        exact path='/'
                        component={FolderNav}
                    />
                    <Route
                        path='/folder/:folderId'
                        component={Folder}
                    />
                    <Route
                        path='/note/:noteId'
                        component={FolderNote}
                    />

                </div>
                <div className="notes">
                    <Route
                        exact path='/'
                        component={NoteNav}
                    />
                    <Route
                        path='/folder/:folderId'
                        component={NoteNavFilter}
                    />
                    <Route
                        path='/note/:noteId'
                        component={Note}
                    />
                </div>
                <div className="addItem">
                    <Route
                        exact path='/addFolder'
                        component={AddFolder}
                    />
                    <Route 
                        exact path='/addNote'
                        component={AddNote}
                    />
                </div>
            </div>
            </ApiContext.Provider>
        )
    }
}
ApiContext.Provider.propTypes = {
    value: PropTypes.shape({
        notes: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string,
            content: PropTypes.string,
            modified: PropTypes.string
        })),
        folders: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string
        })),
        addNote: PropTypes.function,
        addFolder: PropTypes.function,
        deleteNote: PropTypes.function,
        handleDeleteClick: PropTypes.function
    }),


}