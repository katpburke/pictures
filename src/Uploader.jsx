import { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';

function Uploader() {
  const [selectedFile, setFile] = useState(null);
  const [uploaded, updateUpload] = useState(false);
  const [idUrl, updateIdUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      return;
    }

    console.log('selected file: ', selectedFile);

    const imgId = Math.floor(Math.random() * 1000000);
    console.log(imgId);

    uploadData({
      path: `upload/${imgId}`,
      data: selectedFile,
      options: {
        contentType: 'image/jpeg',
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
