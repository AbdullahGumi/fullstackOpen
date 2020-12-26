import React from 'react';

interface course {
  courseName: string
}

const Header = ({ courseName }: course): JSX.Element => {
  return <h1>{courseName}</h1>;
}

export default Header;
