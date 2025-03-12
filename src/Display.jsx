import { useState } from 'react';
import { downloadData } from 'aws-amplify/storage';
import { useParams } from 'react-router-dom';

function Display() {
  const [img, updateImg] = useState(null);
  const { id } = useParams();

  return (<div>Image #{id} will go here I promise</div>);
}

export default Display;
