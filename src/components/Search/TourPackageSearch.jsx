/*import React, {useState} from "react";

import SideNavigation from "../sideNavigation/TourPackageside_nav";

import {FaSearch  } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import css from "../Search/search.module.css";
import { useTranslation } from "react-i18next";


const Search = ({categories,
    selectedCategory,
    setSelectedCategory,
    selectedLandmark,
    setSelectedLandmark,
    selectedGov,
    setSelectedGov,
    activeOnly,
    setActiveOnly,
    searchQuery,
    setSearchQuery,
    BudgetRange,
    setBudgetRange}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [showSideNavigation, setShowSideNavigation] = useState(false);

  const handleSearchDisplay = () => {
    if (!showSideNavigation) {
      setShowSideNavigation(true);
    }
    setOpen((prev) => !prev);
  };

  return (
    <div className={css.main}>
      <button className={css.btn} onClick={handleSearchDisplay}>
        <FaSearch  className="icon" />
      </button>

      <div className={`${css.chatbot_container} ${open ? css.open : ""}`}>
        <div className={css.close}>
          <button className={css.close_btn} onClick={handleSearchDisplay}>
            <AiOutlineClose className="icon" />
          </button>
        </div>
       
        {showSideNavigation && (
      <div className={css.sideNavigation_container}>
        <SideNavigation
         categories={categories}
         selectedCategory={selectedCategory}
         setSelectedCategory={setSelectedCategory}
         selectedLandmark={selectedLandmark}
         setSelectedLandmark={setSelectedLandmark}
         selectedGov={selectedGov}
         setSelectedGov={setSelectedGov}
         activeOnly={activeOnly}
         setActiveOnly={setActiveOnly}
         searchQuery={searchQuery}
         setSearchQuery={setSearchQuery}
         BudgetRange={BudgetRange}
         setBudgetRange={setBudgetRange}
        
          
        />
      </div>
    )}
        
       </div>
      </div>

  );
};


export default Search;*/
