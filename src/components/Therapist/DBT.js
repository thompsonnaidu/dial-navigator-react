import React from 'react';
import DBTAnalysis from './DBTAnalysis';

// Your JSON data
const jsonData = [/* ... your JSON data ... */];

const DBTComponent = () => {
  // Parse the JSON data here if necessary

  return (
    <div>

      <DBTAnalysis data={jsonData} />
    </div>
  );
};

export default DBTComponent;