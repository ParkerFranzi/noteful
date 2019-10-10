import React from 'react';
import ReactDOM from 'react-dom';
import Note from './Note'
import config from '../config'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Note config={config}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  