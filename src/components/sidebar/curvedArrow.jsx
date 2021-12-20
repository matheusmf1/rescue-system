import React from 'react';

export const CurvedArrow = ( props ) => {

  const { id, class_name } = props;

  return (
    <svg id={id} className={class_name} width="20" height="20"
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="10 15 15 20 20 15"></polyline>
      <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>	
    </svg>
  )
}