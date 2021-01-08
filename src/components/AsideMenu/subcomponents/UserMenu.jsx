import React from 'react';
import {Link} from 'react-router-dom';

import bemCssModules from 'bem-css-modules';
import {default as AsideMenuStyles} from '../AsideMenu.module.scss';

const style = bemCssModules(AsideMenuStyles);

const UserMenu = ({isUserLogged}) => (
    <>
      <p className={style('title')}>Panel użytkownika</p>
      <nav>
          <ul>
              <li className={style('link')}>
                <Link to="/">Projekt w sprzedaży</Link>
              </li>
              {isUserLogged && <li className={style('link')}><Link to="/my-courses">Moje zakupine projekty</Link></li>}
          </ul>
      </nav>
    </>
);

export default UserMenu;