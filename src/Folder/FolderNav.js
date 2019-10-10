import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './FolderNav.css'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom'


export default class FolderNav extends Component {
    static contextType = ApiContext
    render() {
        return (
            <ul className="folderList">
                
                {this.context.folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink to={`/folder/${folder.id}`}>
                            {folder.name}

                        </NavLink>
                    </li>
                )}
                <Link to='/addFolder'>
                    Add Folder
                </Link>
            </ul>
        )
    }
}
