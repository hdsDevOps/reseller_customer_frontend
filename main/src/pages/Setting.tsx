import React from "react";
import { useAppSelector } from "store/hooks";
const Setting: React.FC = () => {
  const { userAuthStatus = "" } = useAppSelector((state) => state.auth);
  return (
    <div>
      <main>
        <h2>Welcome to the Setting = {userAuthStatus}</h2>
        <p>This is your Setting where you can manage your account.</p>
      </main>
    </div>
  );
};

export default Setting;
