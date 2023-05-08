import './App.css';
import React, { useState, useEffect } from 'react';

import generatePdfThumbnails from 'pdf-thumbnails-generator';

function App() {
  const [thumbnails, setThumbnails] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateThumbnails = async (inputFile) => {
    setLoading(true);
    try {
      const thumbnailsResult = await generatePdfThumbnails(inputFile, 150);
      setThumbnails(thumbnailsResult);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  const handleUpload = async (e) => {
    console.log('Processing ' + e.target.files[0].name)

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      //const base64data = reader.result;
      const file = reader.result;
      generateThumbnails(file);
      //return base64data;
    };
  }

  return (
    <div className="App">
      <header className="App-header">
        <section>
          <input type='file' accept='application/pdf' onChange={handleUpload} />

          <br />

          {
            thumbnails
              ? thumbnails.map(({ thumbnail, page }) =>
                <ImageComp key={page} src={thumbnail} index={page} />)
              : null
          }

          {loading && <h1>Thumbnails aan het genereren...</h1>}
        </section>
      </header>
    </div>
  );
}

export default App;

const ImageComp = ({ src, index }) => (<div style={{ margin: '1rem', display: 'inline-block' }}>
  <img src={src} alt={index} />
  <p>Page Index: {index}</p>
</div>);