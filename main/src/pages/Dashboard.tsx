import React from "react";
//import { useAppSelector } from "store/hooks";

const Dashboard: React.FC = () => {
  //const { userAuthStatus = "" } = useAppSelector((state) => state.auth);

  return (
    <div>
      <main className="min-h-screen">
        <h2 className="text-2xl text-green-500">Welcome to your Dashboard</h2>
        <p>This is your dashboard where you can manage your account.</p>
      </main>
    </div>
  );
};

export default Dashboard;
