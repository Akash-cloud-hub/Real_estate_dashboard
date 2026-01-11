import React from 'react';

interface TestingProps {
  id: string| Number;
}

const Testing: React.FC<TestingProps> = ({id}) => {
  if (id==="NEW") {
    return (<div><b>Adding new Business</b></div>)
  }
  else{
    return (<div><b>Updating existing Business</b></div>)
  }
}

export default Testing; 