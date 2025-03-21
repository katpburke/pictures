import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadData } from 'aws-amplify/storage';
import { generateClient } from 'aws-amplify/data';

function Uploader() {
  const [selectedFile, setFile] = useState(null);
  const [uploaded, updateUpload] = useState(false);
  const [idUrl, updateIdUrl] = useState(null);
  const [idList, updateList] = useState([]);
  const navigate = useNavigate();
  const client = generateClient();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addId = async (id) => {
    console.log('addId called!');
    await client.models.Numbers.create({
      content: id,
    });
  };

  const handleUpload = () => {
    if (!selectedFile) {
      return;
    }

    let imgId = Math.floor(Math.random() * 1000000);
    console.log(imgId);

    uploadData({
      path: `upload/${imgId}`,
      data: selectedFile,
      options: {
        contentType: 'image/jpeg',
      },
    });

    addId(imgId);
    updateUpload(true);
    updateIdUrl(`https://main.d25557zczawwec.amplifyapp.com/images/${imgId}`);
  };

  const handleReset = () => {
    setFile(null);
    updateUpload(false);
  };

  const handleRandom = async () => {
    const { data: items } = await client.models.Numbers.list();
    updateList(items);
  };

  useEffect(() => {
    console.log('idList: ', idList);
    if (idList.length > 0) {
      let rand = Math.floor(Math.random() * idList.length);
      console.log('random index chosen: ', rand);
      navigate(`/images/${idList[rand].content}`);
    }
  }, [idList]);

  return (
    <div>
      {!uploaded && (
        <div>
          <div>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => handleFileChange(e)}
            />
          </div>
          <div>
            <button onClick={handleRandom}>Random</button>
          </div>
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
