import React from "react";
import kakaoImg from "../../img/kakao_login_logo.png";
import emailImg from "../../img/email_logo.png";
import { useNavigate } from "react-router-dom";
import styles from "./loginpage.module.css";

export default function LoginPage() {
  const navigation = useNavigate();

  return (
    <main className={styles.container}>
      {/* 로그인영역 */}
      <div className={styles.login}>
        <div className={styles.login_logo}>
          <img src="/src/img/logo.png" alt="Logo" />
        </div>
        {/* 로그인 타이틀 */}
        <div className={styles.login_title}>
          <span className={styles.caption}>로그인/회원가입</span>
          <span className={styles.strikethrough}></span>
        </div>
        {/* 로그인 버튼 */}
        <div className={styles.login_btn_group}>
          {/* 소셜 로그인 */}
          <button
            onClick={() => {
              // window.location.href = "/api/auth/kakao";
              window.open(
                "/api/auth/kakao",
                "KakaoLogin",
                "width=600, height=800, top=" +
                  (window.innerHeight / 2 - 800 / 2) +
                  ", left=" +
                  (window.innerWidth / 2 - 600 / 2) +
                  ", resizable=no, scrollbars=yes"
              );
            }}
          >
            <img src={kakaoImg} />
            카카오로 시작하기
          </button>
          <button
            onClick={() => {
              navigation("/login/email");
            }}
          >
            <img src={emailImg} />
            이메일로 시작하기
          </button>
        </div>
      </div>
    </main>
  );
}
