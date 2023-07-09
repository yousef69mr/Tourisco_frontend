import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import css from '../UploadPhoto/UploadPhoto.module.css';

function UploadPhoto(props) {
  const [file, setFile] = useState(null);
  const { t } = useTranslation();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    // handle upload logic here
    props.onUpload(file);
    setFile(null);
  };

  return (
    <div className={css.container}>
      <label htmlFor="fileInput" className={css.label}>
        {t('PhotoUpload.UploadPhoto')}
      </label>
      <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} className={css.input} />
      {file && (
        <div className={css.preview}>
          <img src={URL.createObjectURL(file)} alt={file.name} className={css.image} />
        </div>
      )}
      <button onClick={handleUploadClick} disabled={!file} className={css.button}>
        {t('PhotoUpload.Upload')}
      </button>
    </div>
  );
}

export default UploadPhoto;