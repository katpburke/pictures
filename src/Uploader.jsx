import { useState } from 'react';

function Uploader() {
  const [selectedFile, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    //here is where a fetch request goes, uploading the file
    //for now:

    console.log('File uploaded');
  };

  return (
    <div>
      <input type='file' onChange={(e) => handleFileChange(e)} />
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
