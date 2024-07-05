import React from "react";
import { useAppSelector } from "store/hooks";

const Dashboard: React.FC = () => {
  const { userAuthStatus = "" } = useAppSelector((state) => state.auth);

  return (
    <div>
      <main>
        <h2>Welcome to the Dashboard = {userAuthStatus}</h2>
        <p>This is your About where you can manage your account.</p>
      </main>
    </div>
  );
};

export default Dashboard;
