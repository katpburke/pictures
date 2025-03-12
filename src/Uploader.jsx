import { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';

function Uploader() {
  const [selectedFile, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      return;
    }

    const imgId = Math.floor(Math.random * 1000000);
    selectedFile.name = imgId;

    // const formData = new FormData();
    // formData.append('file', selectedFile);

    //here is where a fetch request goes, uploading the file
    //for now:

    // console.log('File uploaded: ', formData);

    uploadData({
      path: `upload/${imgId}`,
      data: selectedFile,
    });
  };

  return (
    <div>
      <input
        type='file'
        accept='image/*'
        onChange={(e) => handleFileChange(e)}
      />
      {selectedFile && (
        <div>
          <p>Selected file: {selectedFile.name}</p>
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
}

export default Uploader;
