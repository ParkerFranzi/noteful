import React from 'react';
import ReactDOM from 'react-dom';
import FolderNav from './FolderNav'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FolderNav />, div);
    ReactDOM.unmountComponentAtNode(div);
  });