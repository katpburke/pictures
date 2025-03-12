import { useState } from 'react';
import { downloadData } from 'aws-amplify/storage';

function Display() {
  const [img, updateImg] = useState(null);

  return <div>Image will go here I promise</div>;
}

export default Display;
