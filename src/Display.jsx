import { useState, useEffect } from 'react';
import { downloadData, getUrl } from 'aws-amplify/storage';
import { useParams } from 'react-router-dom';
import { StorageImage } from '@aws-amplify/ui-react-storage';

function Display() {
  const { id } = useParams();
  const [displayUrl, updateUrl] = useState('');

  useEffect(() => {
    createUrl();
  }, []);

  async function createUrl() {
    const tempUrl = await getUrl({
      path: `upload/${id}`,
    });
    console.log('tempUrl: ', tempUrl.url);
    updateUrl(tempUrl.url);
  }

  return (
    <div>
      <div>Image #{id}</div>
      <div>
        <StorageImage path={`upload/${id}`} />
      </div>
      <div>
        <a href={displayUrl}>Temporary Download Link</a>
      </div>
    </div>
  );
}

export default Display;
