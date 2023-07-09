import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGovernorateContext } from '../../contexts/GovernorateContext';
import { backendBaseURL } from '../../axios';
import { filtergov } from '../filters/govFilter';
import GovernmentInfo from '../GovernmentInfo/GovernmentInfo';
import Search from '../Search/GovSearch';
import GalleryProp from '../gallery/galleryProps';
import css from "./govCard.module.css";


function GovernmentCards() {
  
  const [selectedGovernment, setSelectedGovernment] = useState({ id: null });
  const navigate = useNavigate();
  const { governorates } = useGovernorateContext();
  const [searchQuery, setSearchQuery] = useState('');


  {console.log(governorates)}
  const {t} = useTranslation();


  const handleGovernmentClick = (government) => {
    setSelectedGovernment(government.id);
    navigate(`/government/${government.id}`, { state: government });
  };
  
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substr(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  const filteredGov = filtergov(governorates,searchQuery);
  return (
    <div className={css.govbodyy}>
       <GalleryProp />
      <div className={css.page_title}>
      <h1 >{t("GovernmentCards.Governorates")}</h1>
      </div>
      {filteredGov && filteredGov.length > 0 ? (
      <div className={css.cards_container}>
     
        {filteredGov.map((government, index) => (
          <React.Fragment key={government.id}>
            <div className={css.flip_card} >
              <div className={css.flip_card_inner}>
                <div className={css.flip_card_front}>
                  <img className='card_img' src={backendBaseURL+government.governorate.emblem} alt={government.title} style={{width: "100%", height: "73%" }} />
                 
                  <div className={css.flip_card_text}>
                   <h2>{government?.title}</h2>
                  </div>
                </div>
                <div className={css.flip_card_back}> 
                  <h3 className={css.govTitleBack}>{government?.title}</h3>
                  <blockquote>
                  <p className={css.govdesc}>
                    {government?.description ? truncateText(government.description, 300) : ''}
                          </p>
                  </blockquote>
                  <a  class={css.read_more} onClick={() => handleGovernmentClick(government)}>  {t('GovernmentCards.Read More')} 
                  <svg xmlns="http://www.w3.org/2000/svg" class={css.icon} viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  </a>
                </div>
              </div>
            </div>
           
            {(index + 1) % 4 === 0 && <div className={css.clearfix} />}
          </React.Fragment>    


        )
        )}

        
      </div>
      ) : (
        <p>no gov match the search.</p>
      )}

      <Search
       searchQuery={searchQuery}
       setSearchQuery={setSearchQuery}
     />
    </div>
  );
}

export default GovernmentCards;