import React from "react";
import Gallery from './gallery'


function GalleryProp() {
    const images = [
        {
          path:
          require('../../assets/img/egy1.jpg'),
          caption: "",
        },
        {
          path:
          require('../../assets/img/alex2.jpg'),
            
         // caption: "Alexandria",
        },
        {
          path:
          require('../../assets/img/aswan4.jpg'),
          //caption: "Aswan",
        },
        {
          path:
          require('../../assets/img/giza.jpg'),
          //caption: "Giza",
        },
        {
          path:
          require('../../assets/img/luxor4.jpg'),
          //caption: "Luxor",
        },
        {
          path:
          require('../../assets/img/fayoum.jpg'),
          //caption: "El Fayoum",
        },
       
      ];
    
      return (
        <div>
          <Gallery images={images} />
        </div>
      );
    }

export default GalleryProp;