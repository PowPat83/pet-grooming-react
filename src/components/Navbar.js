import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { GiRocketThruster } from 'react-icons/gi';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../login/loginSlice';

function Navbar() {
  const [click, setClick] = useState(false);

  const dispatch = useDispatch();

  const { userID } = useSelector(({ login }) => login);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              <GiRocketThruster className='navbar-icon' />
              PetGrooM
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    'nav-links' + (isActive ? ' activated' : '')
                  }
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              {userID ? (
                <li className='nav-item'>
                  <NavLink
                    to='/'
                    className={({ isActive }) =>
                      'nav-links' + (isActive ? ' activated' : '')
                    }
                    onClick={onLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              ) : (
                // add this cause only can have 1 element
                <>
                  <li className='nav-item'>
                    <NavLink
                      to='/register'
                      className={({ isActive }) =>
                        'nav-links' + (isActive ? ' activated' : '')
                      }
                      onClick={closeMobileMenu}
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink
                      to='/login'
                      className={({ isActive }) =>
                        'nav-links' + (isActive ? ' activated' : '')
                      }
                      onClick={closeMobileMenu}
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
