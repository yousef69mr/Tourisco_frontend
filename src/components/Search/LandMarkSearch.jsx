import React, { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
import SideNavigation from "../sideNavigation/LandMarkSide_nav";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import api_root, { token } from "../../axios";
import {FaSearch  } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import css from "../Search/search.module.css";
import { useTranslation } from "react-i18next";
import { useLanguageContext } from "../../contexts/LanguageContext";

const Search = ({ categories, selectedCategory, setSelectedCategory, 
  activeOnly, setActiveOnly, ratingRange, setRatingRange, searchQuery,
   setSearchQuery,  searchQuerycategory
   ,setSearchQuerycategory }) => {
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
        <FaSearch className="icon" />
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
              activeOnly={activeOnly}
              setActiveOnly={setActiveOnly}
              ratingRange={ratingRange}
              setRatingRange={setRatingRange}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchQuerycategory={searchQuerycategory}
              setSearchQuerycategory={setSearchQuerycategory}
            
              
            />
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Search;