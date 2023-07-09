import React, { useState } from 'react';
import css from '../sideNavigation/sideNavigation.module.css';
import { useTranslation } from 'react-i18next';

function SideNavigation({ searchQuery, setSearchQuery }) {

const [showNameSearch, setShowNameSearch] = useState(false);
 const {t}=useTranslation();
 const handleNameSearchClick = () => {
    setShowNameSearch(!showNameSearch);
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
                <a className={css.a} onClick={handleNameSearchClick}>{t("sideNavigation.Search By Name")}</a>
              </li>
              {
                showNameSearch &&
                <form className={css.Searchform_container}>
                  <input className={css.search_input} type="text" placeholder={t("sideNavigation.Search")}
                   value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ paddingLeft: '10px' }} />
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