import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "store/hooks";

const AddDomain: React.FC = () => {
  const { userAuthStatus = "" } = useAppSelector((state: any) => state.auth);

  return (
    <div>
      <main>
        <h2>Add Domain</h2>
        <p>
          This is your Domain where you can manage your account ={" "}
          {userAuthStatus}
        </p>
        <Link to="/domain">Domain</Link>
        <br />
        {/* <button onClick={onLogoutHandler}>Logout</button> */}
      </main>
    </div>
  );
};

export default AddDomain;
