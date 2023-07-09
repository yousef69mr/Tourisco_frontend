
import css from './gallery.module.css'
import React, { useState } from "react";

function Gallery(props) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  return (
    <div className={css.gallery_body}>
    <div className={css.container}>
      <div className={css.fullview}>
        <img className={css.imgfullView} src={props.images[selectedTab].path} alt="" />
        <div className={css.caption}>{props.images[selectedTab].caption}</div>
      </div>
      <div className={css.previewlist}>
        <ul className={css.img_ul}>
          {props.images.map((image, index) => (
            <li className={css.img_li} key={index}>
              <input
                type="radio"
                id={`tab-${index}`}
                name="gallery-group"
                checked={selectedTab === index}
                onChange={() => handleTabChange(index)}
              />
              <label htmlFor={`tab-${index}`}>
                <div className={css.tab}>
                  <img className={css.imgtab} src={image.path} alt="" />
                </div>
              </label>
              <div className={css.caption}>{image.caption}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

export default Gallery;