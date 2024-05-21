import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Dropdown, Image } from "semantic-ui-react";
import user from "../img/user.png";
import { checkAuth } from "../util/auth";

const trigger = (
  <span>
    <Image avatar src={user} />
  </span>
);

const DropdownImageTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLogin = checkAuth();

  const options = [
    {
      key: "mypage",
      text: "마이페이지",
      icon: "user",
      onClick: () => navigate("/mypage"),
      hidden: !isLogin,
    },
    {
      key: "logout",
      text: "로그아웃",
      icon: "sign-out",
      onClick: () => navigate("/logout"),
      hidden: !isLogin,
    },
    {
      key: "user",
      text: "로그인",
      icon: "user",
      onClick: () => navigate("/user"),
      hidden: isLogin,
    },
  ].filter((option) => !option.hidden);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Container>
      <Dropdown
        trigger={trigger}
        options={options}
        open={isOpen}
        onClick={handleOpen}
        onBlur={handleClose}
        onMouseLeave={handleClose}
      />
    </Container>
  );
};

export default DropdownImageTrigger;
