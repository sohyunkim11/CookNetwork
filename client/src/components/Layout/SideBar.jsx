/** SideBar.jsx
 * 네비게이션 메뉴 버튼을 클릭했을 때 왼쪽에 나타나는 사이드바 입니다.
 */

import React, { useState } from 'react';
import { Offcanvas, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../../assets/styles/SideBar.module.css'
import { FaUser, FaUserPlus, FaUserCog, FaBookmark, FaCrown, FaCookieBite, FaListUl, FaPen, FaChessKing } from "react-icons/fa";


function LeftSidebar({ show, handleClose, user }) {
  const [profileImgDBbase64, setProfileImgDBbase64] = useState(user?.user_img || 'basic_profile_img.jpg');

  
  // 로그인 상태에 따라 유저에게 보여줄 메뉴
  const commonLoggedInMenu = [
    { to: "/mypage", text: "마이페이지", icon: <FaUserCog /> },
    { to: "/mybookmark", text: "북마크한 레시피", icon: <FaBookmark /> },
    { to: "/best", text: "인기 레시피", icon: <FaCrown /> },
    { to: "/about", text: "서비스 소개", icon: <FaCookieBite /> },
  ];

  const chefMenu = [
    { to: "/writerecipe", text: "나만의 레시피 등록", icon: <FaPen />},
    { to: `/myrecipe/${user && user.user_id}`, text: "나만의 레시피 관리", icon: <FaListUl /> },
  ]

  const loggedOutMenu = [
    { to: "/login", text: "로그인", icon: <FaUser /> },
    { to: "/signup", text: "회원가입", icon: <FaUserPlus /> },
    { to: "/mypage", text: "마이페이지", icon: <FaUserCog /> },
    { to: "/mybookmark", text: "북마크한 레시피", icon: <FaBookmark />},
    { to: "/best", text: "인기 레시피", icon: <FaCrown /> },
    { to: "/about", text: "서비스 소개", icon: <FaCookieBite /> },
  ];

  // 사용자의 로그인 상태와 user_code(셰프 여부)에 따라 메뉴 표시
  const currentMenu = user 
  ? user.chef_code === 1    // 셰프 회원
  // ? loggedInMenu 
    ? [...commonLoggedInMenu, ...chefMenu]
    : commonLoggedInMenu    // 일반 회원
  : loggedOutMenu;

  return (
    <Offcanvas show={show} onHide={handleClose} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className={styles.menuTitle}>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className={`d-flex flex-column ${styles.offcanvasBody}`}>
        <Nav className="flex-column flex-grow-1">

          {currentMenu.map((item, index) => (
            <Nav.Link
              key={index}
              as={Link}
              to={item.to}
              onClick={handleClose}
              className={styles.navLink}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              {item.text}
            </Nav.Link>
          ))}
          
        </Nav>
          
          {user ? (
            <Nav.Link to="/mypage" onClick={handleClose} className={styles.profileSection}>
              <div className={styles.profileInfo}>
                <Image 
                  src={user.user_img || profileImgDBbase64} 
                  alt="회원 프로필 이미지" 
                  className={styles.profileImage}
                />
                <span className={styles.profileName}>{user.username}</span>
              </div>
              {user.chef_code && user.chef_code === 1 ? (
                <div className={styles.chefBadge}>
                  <span className={styles.chefText}>셰프등급</span>
                  <FaChessKing />
                </div>
              ) : null}
            </Nav.Link>
        ) : (
          <Nav.Link as={Link} to="/login" onClick={handleClose} className={styles.profileSection}>
            <img 
              src="/basic_profile_img.jpg" 
              alt="회원 프로필 이미지" 
              className={styles.profileImage}
            />
            <span className={styles.profileInfo}>로그인 후 이용하실 수 있습니다.</span>
          </Nav.Link>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default LeftSidebar;