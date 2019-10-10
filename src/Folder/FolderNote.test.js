import React from 'react';
import ReactDOM from 'react-dom';
import FolderNote from './FolderNote'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FolderNote noteId={1} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });