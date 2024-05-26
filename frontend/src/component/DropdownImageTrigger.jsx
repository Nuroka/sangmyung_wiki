import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./DropdownImageTrigger.module.css";
import user from "../img/user.png";
import { checkAuth } from "../util/auth";

export default function DropdownImageTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLogin = checkAuth();

  const options = [
    {
      key: "User",
      text: "User",
      hidden: !isLogin,
      noHover: true,
    },
    {
      key: "mypage",
      text: "마이페이지",
      onClick: () => {
        navigate("/mypage");
        setIsOpen(false);
      },
      hidden: !isLogin,
    },
    {
      key: "logout",
      text: "로그아웃",
      onClick: () => {
        navigate("/logout");
        setIsOpen(false);
      },
      hidden: !isLogin,
    },
    {
      key: "비로그인 사용자",
      text: "비로그인 사용자",
      hidden: isLogin,
      noHover: true,
    },
    {
      key: "user",
      text: "로그인",
      onClick: () => {
        navigate("/user");
        setIsOpen(false);
      },
      hidden: isLogin,
    },
  ].filter((option) => !option.hidden);

  return (
    <div className={styles.dropdown_container}>
      <img src={user} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <ul className={`${styles.list} ${styles.dropdown}`}>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={option.onClick}
              className={!option.noHover ? styles.hoverEffect : ""}
            >
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
