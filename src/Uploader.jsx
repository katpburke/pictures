import { useState } from 'react';
import { uploadData, downloadData } from 'aws-amplify/storage';
import { exists } from 'fs';

function Uploader() {
  const [selectedFile, setFile] = useState(null);
  const [uploaded, updateUpload] = useState(false);
  const [idUrl, updateIdUrl] = useState(null);
  //   const __dirname = path.resolve();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const existsId = async (id) => {
    const { body } = await downloadData({
      path: `upload/${id}`,
    }).result;

    if (body) return true;
    else return false;
  };

  const handleUpload = () => {
    if (!selectedFile) {
      return;
    }

    let imgId = Math.floor(Math.random() * 1000000);
    console.log(imgId);

    while (existsId(imgId)) {
      imgId = Math.floor(Math.random() * 1000000);
      console.log(imgId);
    }

    uploadData({
      path: `upload/${imgId}`,
      data: selectedFile,
      options: {
        contentType: 'image/jpeg',
      },
    });

    uploadData({
      path: `numbers/`,
      data: imgId,
      options: {
        contentType: 'application/json',
      },
    });

    updateUpload(true);
    updateIdUrl(`https://main.d25557zczawwec.amplifyapp.com/images/${imgId}`);
  };

  const handleReset = () => {
    setFile(null);
    updateUpload(false);
  };

  return (
    <div>
      {!uploaded && (
        <div>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => handleFileChange(e)}
          />
        </div>
      )}
      {selectedFile && (
        <div>
          <p>Selected image: {selectedFile.name}</p>
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
      {uploaded && (
        <div>
          <p>Image uploaded successfully!</p>
          <p>
            Access it <a href={idUrl}>here</a>.
          </p>
          <button onClick={handleReset}>Click to upload another</button>
        </div>
      )}
    </div>
  );
}

export default Uploader;
