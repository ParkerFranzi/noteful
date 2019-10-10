import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import ValidationError from '../ValidationError'


class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            folderName: {
                value: '',
                touched: false
            }
        }
    }
    
    updateFolderName(folderName) {
        this.setState({folderName: {value: folderName, touched: true}})
        console.log(this.props)
    }
    static contextType = ApiContext

    state = {
        error: null,
    };
    handleSubmit = e => {
        e.preventDefault()
        const { folderName } = this.state
        const folder = {
            name: folderName.value
        }
        console.log(folderName)
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder)
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(folder => {
            this.context.addFolder(folder)
            this.props.history.push(`/folder/${folder.id}`)
        })
        .catch(error => {
            console.error({ error })
        })
    }
    validateName() {
        const folderName = this.state.folderName.value.trim()
        if (folderName.length === 0) {
            return 'Folder must have a name'
        }
        else if (folderName.length < 3) {
            return 'Folder must have at least 3 characters'
        }
    }
    render() {
        console.log(this.props)
        const nameError = this.validateName();
        return (
            <section className="addFolder">
                <h2>Add Folder</h2>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor="folderName">Folder Name *</label>
                    <input 
                        type="text" 
                        className="folderName" 
                        name="folderName" 
                        id="folderName"
                        onChange={e => this.updateFolderName(e.target.value)}
                    />
                    {this.state.folderName.touched && (<ValidationError message={nameError} />)}
                    <button 
                        type="submit"
                        className="folderName_registration_button"
                        disabled={
                            this.validateName()
                        }
                    >
                        Add Folder
                    </button>
                </form>
            </section>
        )
    }
}

export default AddFolder