import React from 'react';
import ReactDOM from 'react-dom';
import NoteNav from './NoteNav'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NoteNav />, div);
    ReactDOM.unmountComponentAtNode(div);
  });