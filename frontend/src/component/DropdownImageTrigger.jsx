import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import styles from "./DropdownImageTrigger.module.css";
import user from "../img/user.png";
import { checkAuth } from "../util/auth";

export default function DropdownImageTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLogin = checkAuth();
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={styles.dropdown_container} ref={dropdownRef}>
      <motion.img src={user} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <motion.ul
          className={`${styles.list} ${styles.dropdown}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {options.map((option, index) => (
            <motion.li
              key={index}
              onClick={option.onClick}
              className={!option.noHover ? styles.hoverEffect : ""}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.1, delay: index * 0.1 }}
            >
              {option.text}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
