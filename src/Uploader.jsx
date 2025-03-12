import { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';

function Uploader() {
  const [selectedFile, setFile] = useState(null);
  const [uploaded, updateUpload] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      return;
    }

    const imgId = Math.floor(Math.random() * 1000000);
    console.log(imgId);

    uploadData({
      path: `upload/${imgId}`,
      data: selectedFile,
      option: {
        contentType: 'image/jpeg',
      },
    });
    updateUpload(true);
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
          <button onClick={handleReset}>Click to upload another</button>
        </div>
      )}
    </div>
  );
}

export default Uploader;
