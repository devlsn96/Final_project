import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./MyPage.module.css";

export default function MyPage() {
  return (
    <div className={styles.mypage_wrap}>
      {/* <h2>마이페이지</h2> */}
      <main className={styles.profile_layout}>
        {/* 좌측 매뉴 */}
        <nav className={styles.profile_layout_navigation}>
          <ul>
            <li>
              {/* 내 정보 관리 */}
              <NavLink
                to="profile-info"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menu_item} ${styles.active}`
                    : styles.menu_item
                }
              >
                내 정보 관리
              </NavLink>
            </li>
            <li>
              {/* 예약내역 */}
              <NavLink
                to="reservation-history"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menu_item} ${styles.active}`
                    : styles.menu_item
                }
              >
                예약 내역
              </NavLink>
            </li>
            <li>
              {/* 찜하기 */}
              <NavLink
                to="wishlist"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menu_item} ${styles.active}`
                    : styles.menu_item
                }
              >
                위시리스트
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* 컨텐츠 영역 */}
        <section className={styles.profile_layout_content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
