import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useTourPackageContext } from '../../contexts/TourPackageContext';
import { FaSuitcase  } from 'react-icons/fa';
import { backendBaseURL } from '../../axios';
import { useTranslation } from 'react-i18next';
import Search from '../Search/TourPackageSearch';
import css from './TourPackagesCards.module.css';


function TourPackagesCards() {
  const { tourPackages } = useTourPackageContext();
  const { t } = useTranslation();
  const [selectedPackage, setSelectedPackage] = useState('');
  
{console.log(tourPackages)}
  const navigate = useNavigate();
  const handleTourPackageClick = (Tourpackage) => {
    setSelectedPackage(Tourpackage.id);
    navigate(`/TourPackage/${Tourpackage.id}`, { state: Tourpackage });
  };

  

  if (!tourPackages) {
    return null;
  }

  
  
  return (
    <div className={css.landmarkbodyy}>

      <div className={css.page_title}>
        <h1>Tour Packages</h1>
      </div>
    
       <div className={css.cards_container}>
          {tourPackages?.map((TourPackages, index) => (
            <React.Fragment key={TourPackages.id}>
              <div className={css.flip_card}>
                <div className={css.flip_card_inner}>
                  <div className={css.flip_card_front}>
                    <FaSuitcase className={css.icon} size={40} />
                    <div className={css.flip_card_text}>
                      <h2 >{TourPackages.title} Package</h2>
                      <h2 >Created From {TourPackages.days} days</h2>
                      <h2 >Max Budget {TourPackages.package_maximium_budget} EG</h2>
                      <a className={css.read_more} onClick={() => { handleTourPackageClick(TourPackages); }}>
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" className={css.icon} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                    </div>
                  </div>
                </div>
              </div>
              {index + 1 % 4 === 0 && <br className={css.clearfix} />}
            </React.Fragment>
          ))}
        </div>
     
     
   
          </div>
  )}
  export default TourPackagesCards;