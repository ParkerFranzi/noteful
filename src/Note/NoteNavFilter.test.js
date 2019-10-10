import React from 'react';
import ReactDOM from 'react-dom';
import NoteNavFilter from './NoteNavFilter'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NoteNavFilter />, div);
    ReactDOM.unmountComponentAtNode(div);
  });