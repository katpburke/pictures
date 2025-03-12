import { useState, useEffect } from 'react';
import { downloadData } from 'aws-amplify/storage';
import { useParams } from 'react-router-dom';

function Display() {
  const [img, updateImg] = useState(null);
  const { id } = useParams();

  async function download() {
    const result = await downloadData({
      path: `upload/${id}`,
    }).result;
    updateImg(result);
  }

  useEffect(() => {
    console.log('Download results: ', img);
  }, [img]);

  useEffect(() => {
    download();
  }, []);

  return (
    <div>
      <div>Image #{id} will go here I promise</div>
      {/* <div>{img}</div> */}
    </div>
  );
}

export default Display;
