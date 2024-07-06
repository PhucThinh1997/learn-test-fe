import React, { useId, useState } from 'react';

export const FormWrapper = ({ title, children }) => (
  <>
    {/* <h2 style={{textAlign: "center", margin:0, marginBottom:"2rem"}}>{title}</h2> */}
    <div
      style={{
        display: 'grid',
        gap: '1rem .5rem',
        justifyContent: 'space-between',
        gridTemplateColumns: 'auto auto auto',
        gridGap: '10px',
        // gridTemplateColumns: "autp minmax(auto, 400px)"
      }}
    >
      {children}
    </div>
  </>
);
