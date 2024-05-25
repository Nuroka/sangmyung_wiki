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
      key: "mypage",
      text: "마이페이지",
      icon: "mypage",
      onClick: () => {
        navigate("/mypage");
        setIsOpen(false);
      },
      hidden: !isLogin,
    },
    {
      key: "logout",
      text: "로그아웃",
      icon: "logout",
      onClick: () => {
        navigate("/logout");
        setIsOpen(false);
      },
      hidden: !isLogin,
    },
    {
      key: "user",
      text: "로그인",
      icon: "user",
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
            <li key={index} onClick={option.onClick}>
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
