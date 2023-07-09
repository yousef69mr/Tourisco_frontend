import React, { useState } from 'react';
import css from '../sideNavigation/sideNavigation.module.css';
import { useTranslation } from 'react-i18next';

function SideNavigation({ categories, selectedCategory, setSelectedCategory, 
  activeOnly, setActiveOnly, ratingRange, setRatingRange, searchQuery, setSearchQuery, searchQuerycategory
  ,setSearchQuerycategory}) {
  const [showCategorySearch, setShowCategorySearch] = useState(false);
  const [showNameSearch, setShowNameSearch] = useState(false);
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [showRatingRange, setShowRatingRange] = useState(false);
  const [showTypeCategory, setShowTypeCategory] = useState(false);
  const [selectAllRatings, setSelectAllRatings] = useState(false);


  const {t}=useTranslation();

  const handleCategoryClick = () => {
    setShowCategorySearch(!showCategorySearch);
  };

  const handleNameSearchClick = () => {
    setShowNameSearch(!showNameSearch);
  };

  const handleTypeCategoryClick = () => {
    setShowTypeCategory(!showTypeCategory);
  };


  const handleActiveClick = () => {
    setShowActiveOnly(!showActiveOnly);
  };

  const handleRatingClick = () => {
    setShowRatingRange(!showRatingRange);
    setSelectAllRatings(false);
  };
  
  const handleSelectAllRatings = () => {
    setRatingRange(null);
    setSelectAllRatings(true);
  };
  return (
    <div className={css.navbody}>
      <section className={css.navsection} role="banner">
        
        <h1 className={css.logo}>
          {t("sideNavigation.Filters")}
        </h1>
        <div className={css.nav_wrap}>
          <nav className={css.main_nav} role="navigation">
            <ul className={` ${css.NavUl}  ${css.unstyled} ${css.list_hover_slide}`}>
              <li className={css.li}> 
                <a className={css.a} onClick={handleCategoryClick}>{t("sideNavigation.Category")}</a>
              </li>
              {showCategorySearch &&
                <form className={css.form_container}>
                  <select className={css.category_select} value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                    <option value="">{t("sideNavigation.All Categories")}</option>
                    {categories.map(category => (
                      <option className={css.option_value} key={category.category.id} value={category.category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </form>
                
              }
          { console.log("selectedCategory",selectedCategory)}
              <li className={css.li}>
                <a className={css.a} onClick={handleNameSearchClick}>{t("sideNavigation.Search By Name")}</a>
              </li>
              {
                showNameSearch &&
                <form className={css.Searchform_container}>
                  <input className={css.search_input} type="text" placeholder={t("sideNavigation.Search")}
                   value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ paddingLeft: '10px' }} />
                </form>
              }

              
               <li className={css.li}>
                <a className={css.a} onClick={handleTypeCategoryClick}>{t("sideNavigation.Type Category")}</a>
              </li>
              {
                showTypeCategory &&
                <form className={css.Searchform_container}>
                  <input className={css.search_input} type="text" placeholder={t("sideNavigation.Search")}
                   value={searchQuerycategory} onChange={e => setSearchQuerycategory(e.target.value)} style={{ paddingLeft: '10px' }} />
                </form>
              }

              <li className={css.li}>
                <a className={css.a}  onClick={handleRatingClick}>{t("sideNavigation.Rate")}</a>
              </li>

              {
                showRatingRange &&
                <form className={css.form_container}>
                 <select className={css.category_select} value={selectAllRatings ? "" : ratingRange} onChange={e => setRatingRange(e.target.value)}>
                      <option value="" onClick={handleSelectAllRatings}>All Ratings</option>
                      <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
               </select>
                </form>
              }

            
              <li className={css.li}>
              <div className={css.active_container}>
                <a className={css.a}  onClick={handleActiveClick}>{t("sideNavigation.Is Active")}</a>
                </div>
              </li>
            
              {showActiveOnly &&
                <form className={css.form_container}>
                  {/*<label className={css.checkbox_label} htmlFor="active-checkbox">{t("sideNavigation.Active Only")}: </label>*/}
                  <input className={css.active_checkbox} type="checkbox" checked={activeOnly} onChange={e => setActiveOnly(e.target.checked)} />
                </form>

              }

            
         
            </ul>
          </nav>

        </div>
      </section>
    </div>
  );
}

export default SideNavigation;