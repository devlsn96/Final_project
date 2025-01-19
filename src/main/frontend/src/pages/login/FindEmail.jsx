import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../component/Input";
import style from "./findEmail.module.css";

export default function FindEmail() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [formErrors, setFormErrors] = useState({
    username: "",
    phone: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // 입력값 검증
  function handleBlur(field) {
    let errors = { ...formErrors };
    switch (field) {
      case "username":
        if (!username) {
          errors.username = "※이름을 입력해주세요.※";
        } else {
          errors.username = "";
        }
        break;
      case "phone":
        if (!phone) {
          errors.phone = "휴대폰 번호를 입력해주세요.";
        } else if (!/^\d{10,11}$/.test(phone)) {
          errors.phone = "※휴대폰 번호는 10~11자리 숫자만 가능합니다.※";
        } else {
          errors.phone = "";
        }
        break;
    }
    setFormErrors(errors);
    validateForm(errors);
  }

  // 폼 유효성 검증
  function validateForm(errors) {
    if (errors && typeof errors === "object") {
      const hasErrors = Object.values(errors).some((error) => error !== "");
      setIsButtonDisabled(hasErrors); // 오류가 하나라도 있으면 버튼 비활성화
    }
  }

  // 입력 변화 감지
  useEffect(() => {
    validateForm(formErrors);
  }, [formErrors]);

  // 이메일 찾기 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/find-email", { username, phone });
      alert(`${username}님의 이메일주소는 ${response.data}입니다!`);
    } catch (error) {
    console.error("이름 입력 실패: ", error);
    if (error.response && error.response.data) {
      alert(`${username}님의 이메일주소는 없습니다.`);
      console.log(error.response.data); // 서버에서 전달된 에러 메시지 표시
    } else {
      console.log("이메일 찾기에 실패했습니다. 다시 시도해주세요.");
    }
  }
}

return (
  <div className={style.wrap}>
    <div className={style.container}>
      <h1 className={style.header}>이메일 찾기</h1>
      <p className={style.headerP}>
        사용자 정보에 등록된 이름과 전화번호를 입력해 주세요.
      </p>
      <form className={style.form} onSubmit={handleSubmit}>
        <Input
          className={style.input}
          label="이름"
          type="text"
          name="username"
          id="username"
          value={username}
          placeholder="이름을 입력해주세요"
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => handleBlur("username")}
          required
        />
        <span className={style.valid_text}>{formErrors.username}</span>
        <Input
          className={style.input}
          label="휴대폰 번호"
          type="text"
          name="phone"
          id="phone"
          value={phone}
          placeholder="숫자만 입력 (10~11자리)"
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => handleBlur("phone")}
          required
        />
        <span className={style.valid_text}>{formErrors.phone}</span>
        <button
          className={style.submit_button}
          type="submit"
          disabled={isButtonDisabled}
          style={{
            backgroundColor: isButtonDisabled ? "#ccc" : "#4169e1",
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
          }}
        >
          이메일 찾기
        </button>
      </form>
    </div>
  </div>
);
}
