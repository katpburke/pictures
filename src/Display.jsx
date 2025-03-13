import { useState, useEffect } from 'react';
import { downloadData } from 'aws-amplify/storage';
import { useParams } from 'react-router-dom';
import { StorageImage } from '@aws-amplify/ui-react-storage';

function Display() {
  //   const [img, updateImg] = useState(null);
  const { id } = useParams();

  //   async function download() {
  //     const { body } = await downloadData({
  //       path: `upload/${id}`,
  //     }).result;
  //     updateImg(body);
  //   }

  //   useEffect(() => {
  //     console.log('Download results: ', img);
  //   }, [img]);

  //   useEffect(() => {
  //     download();
  //   }, []);

  return (
    <div>
      <div>Image #{id}</div>
      <div>
        {/* <img src={img} /> */}
        <StorageImage path={`upload/${id}`} />
      </div>
    </div>
  );
}

export default Display;
