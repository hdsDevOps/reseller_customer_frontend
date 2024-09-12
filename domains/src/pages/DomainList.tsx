import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "store/hooks";

const DomainList: React.FC = () => {
  const { userAuthStatus = "" } = useAppSelector((state:any) => state.auth);

  return (
    <div>
      <main>
        <h2>DomainList List</h2>
        <p>This is your Domain where you can manage your account. Status = {userAuthStatus}</p>
        <Link to="/adddomain">Add Domain</Link>
      </main>
    </div>
  );
};

export default DomainList;
