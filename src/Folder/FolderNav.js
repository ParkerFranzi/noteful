import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './FolderNav.css'
import ApiContext from '../ApiContext'


export default class FolderNav extends Component {
    static contextType = ApiContext
    render() {
        return (
            <ul className="folderList">
                
                {this.context.folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink className={folder.id} to={`/folder/${folder.id}`}>
                            {folder.name}

                        </NavLink>
                    </li>
                )}
                <Link className="addFolderLink" to='/addFolder'>
                    Add Folder
                </Link>
            </ul>
        )
    }
}
