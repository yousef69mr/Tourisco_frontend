
import { FaSuitcase ,FaClock , FaAdjust ,FaTicketAlt} from 'react-icons/fa';
import { TiLocation } from 'react-icons/ti';
import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import api_root from '../../axios';
import css from '../TourPackageInfo/TourPackageInfo.module.css';

const TourPackageInfoPage = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const SpecificTourPackage = location.state;
  const [selectedPackage, setselectedPackage] = useState(null);

  const handleClick = () => {
    
    setIsActive(!isActive);
   
  };
  /*increace_tour_package_views/<int:tour_package_id>/*/
  useEffect(() => {
    const UpdateViews= async()=>{
      try {
        const UpdateViewsPromis=await api_root.api
        .post(`increace_tour_package_views/${SpecificTourPackage.id}/`)
        if (UpdateViewsPromis.state!==202){
          throw new Error(UpdateViewsPromis.statusText);

        }
      } catch (error) {

        console.log(error);
        
      }
      }
      if (SpecificTourPackage) {
        UpdateViews();
        setselectedPackage(SpecificTourPackage);
      
      }
      else {
        setselectedPackage(null);
      }

  }, [SpecificTourPackage]);


  
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substr(0, maxLength) + '...';
    } else {
      return text;
    }
  }


  const navClassName = `${css.nav} ${isActive ? css.active : ''}`;
  

  return (
    <div className={css.contact_area}>
     
    <div className={css.contact}>
      <main className={css.main}>
        <section className={css.section}>
          <div className={css.content}>
            <FaSuitcase className={css.icon} size={80} />
            <aside>
              <div className={css.info}>
              {SpecificTourPackage.tickets.map((ticket) => (
  <div key={ticket.id} className={css.contactContainer}>
    <div className={css.contactName}>{ticket.name}</div>
    <div className={css.contactInfo}>
    {/*  <div className={css.contactField}>
        <FaAdjust size={20} />
        <span>Ticket ID:</span>
        <span>{ticket.id}</span>
      </div>
              */}

      <div className={css.contactField}>
        <FaAdjust size={20} />
        <span>Event name:</span>
        <span>{ticket.event.name}</span>
      </div>

      <div className={css.contactField}>
        <FaTicketAlt size={20} />
        <span>price:</span>
        <span>{ticket.price} EG</span>
      </div>
       <br/>
      <div className={css.contactField}>
        <TiLocation size={20} />
        <span></span>
        <span>{ticket.event.landmark.name}</span>
      </div> 
   

    </div>
  </div>
))}
 </div>
            </aside>
            <button className={css.button} onClick={handleClick}>
              <span className={css.span}>Validation</span>
            </button>
          </div>
       
        </section>
        <nav className={navClassName}>
        <div className={css.container}>
            <div className={css.gmail}>
              <div className={css.clockicon}>  <FaClock  size={20}/></div>
              <div className={css.content}>
                <h1>Start Date</h1>
                {SpecificTourPackage?.start_date? truncateText(SpecificTourPackage.start_date, 10) : ''}
              </div>
            </div>
            <div className={css.facebook}>
              
              <div className={css.clockicon}>
                <FaClock />
            
              </div>
              <div className={css.content}>
                <h1>End Date</h1>
                {SpecificTourPackage?.end_date? truncateText(SpecificTourPackage.end_date, 10) : ''}
              </div>
            </div>
          </div>
        </nav>
      </main>
    </div>
  </div>
  );
};

export default TourPackageInfoPage;