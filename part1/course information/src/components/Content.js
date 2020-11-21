import React from 'react';

const Content = ({ parts }) => {
  return (
  	<div>
      {parts ?
        (parts.map(part => {
          return (
            <p>
            	{part.name}{' '}
            	{part.exercises}
            </p>
          );
        })) : null 
    }
    </div>
  );
};

export default Content;