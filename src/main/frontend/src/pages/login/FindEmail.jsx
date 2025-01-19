import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../component/Input";
import style from "./findEmail.module.css";

export default function FindEmail() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // 입력값 검증
  function handleBlur() {
    if (!username.trim()) {
      setError("이름을 입력해주세요");
    } else {
      setError("");
    }
    validateForm();
  }

  // 폼 유효성 검증
  function validateForm() {
    setIsButtonDisabled(!username.trim());
  }

  // 입력 변화 감지
  useEffect(() => {
    validateForm();
  }, [username]);

  // 이메일 찾기 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("이름을 입력해주세요");
      return;
    }

    try {
      const response = await axios.post("/api/find-email", { username });
      alert(`${username}님의 이메일주소는 ${response.data}입니다!`);
    } catch (err) {
      console.error("이름 입력 실패: ", err);
      if (err.response && err.response.data) {
        setError(err.response.data); // 서버에서 전달된 에러 메시지 표시
      } else {
        setError("이메일 찾기에 실패했습니다. 다시 시도해주세요.");
      }
    }
  }

  return (
    <div className={style.wrap}>
      <div className={style.container}>
        <h1 className={style.header}>이메일 찾기</h1>
        <p className={style.headerP}>
          사용자 정보에 등록된 이름을 입력해 주세요
        </p>
        <form className={style.phoneForm} onSubmit={handleSubmit}>
          <Input
            className={style.phoneInput}
            label="이름"
            type="text"
            name="username"
            id="username"
            value={username}
            placeholder="이름을 입력해주세요"
            onChange={(e) => setUsername(e.target.value)}
            onBlur={handleBlur}
            required
          />
          <span className={style.valid_text}>{error}</span>
          <div className={style.regit}>
            <button
              className={style.phoneButton}
              type="submit"
              disabled={isButtonDisabled}
              style={{
                backgroundColor: isButtonDisabled ? "#ccc" : "#4169e1",
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
              }}
            >
              이메일 찾기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
