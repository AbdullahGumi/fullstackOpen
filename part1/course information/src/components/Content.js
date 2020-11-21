import React from 'react';
import Part from './Part.js';
const Content = ({ parts }) => {
  return (
  	<div>
      {parts ?
        (parts.map(part => (
            <Part part={part.name} exercise={part.exercise} />
        ))) : null 
    }
    </div>
  );
};

export default Content;