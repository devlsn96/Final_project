import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import styles from "./Payment.module.css";
import { UserContext } from "../../UserContext";

export default function FailPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className={styles.failWrap}>
      <div className={styles.box_section} id={styles.box_after}>
        <img
          width="100px"
          src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
          alt="에러 이미지"
        />
        <h2 className={styles.title_after}>
          결제를 실패했어요.
          <br />
          <br />
          결제를 다시 시도해주세요.
        </h2>
        <div className={styles.button_container}>
          <Link to="/">
            <button id="homeButton" className={styles.button}>
              홈으로
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
