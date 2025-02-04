import React, { useEffect } from "react";


const AI = () => {
  useEffect(() => {
    const section = document.getElementById("ai-top");
    if(section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, [])
  return (
    <div id="ai-top">
      AI 
    </div>
  );
};
export default AI;
