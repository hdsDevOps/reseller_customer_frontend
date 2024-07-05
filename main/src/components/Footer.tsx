import React from "react";
// import { useAppSelector } from "store/hooks";
export default function Footer() {
  // const token = useAppSelector((state) => state.auth.token);
  return (
    <footer>
      <div className="text-center p-3">
        © 2024 Copyright:
        <a className="text-dark" href="#">
          hordanso
        </a>
      </div>
    </footer>
  );
}
