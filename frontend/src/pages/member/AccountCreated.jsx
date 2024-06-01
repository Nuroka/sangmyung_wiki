import { useLocation } from "react-router-dom";

import CreateAccountResult from "../../component/member/CreateAccountResult";

export default function AccountCreated() {
  const { state } = useLocation();

  return (
    <>
      <CreateAccountResult username={state.username} />
    </>
  );
}
