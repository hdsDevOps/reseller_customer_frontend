import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { authenticatedRoutes, unauthenticatedRoutes } from "../router";
import { getUserAuthTokenFromLSThunk } from "store/user.thunk";

interface UserAuthProps {
  children: React.ReactNode;
}

export default function UserAuth({ children }: UserAuthProps): JSX.Element {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    const getUserAuthToken = async () => {
      try {
        const result = await dispatch(getUserAuthTokenFromLSThunk()).unwrap();
        if (result) {
          console.log("Token fetched:", result);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserAuthToken();
  }, [dispatch]);

  useEffect(() => {
    if (loading) return; // Wait until loading is finished
    const checkUserAuthStatus = () => {
      const currentPath = location.pathname;
      console.log("Current path:", currentPath);
      console.log("Token:", token);

      if (!token) {
        if (unauthenticatedRoutes.includes(currentPath)) {
          console.log("Unauthenticated user on allowed path:", currentPath);
          return; // Allow access to the unauthenticated page
        } else {
          console.log("Unauthenticated user redirected to /home");
          navigate("/home"); // Redirect unauthenticated users to the login page
        }
      } else {
        if (authenticatedRoutes.includes(currentPath)) {
          console.log("Authenticated user on allowed path:", currentPath);
          return; // Allow access to authenticated paths
        } else if (!currentPath.startsWith("/dashboard")) {
          console.log("Authenticated user redirected to /dashboard");
          navigate("/dashboard"); // Redirect authenticated users to the dashboard
        }
      }
    };

    checkUserAuthStatus();
  }, [token, location.pathname, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading state while fetching token
  }

  return <div>{children}</div>;
}
