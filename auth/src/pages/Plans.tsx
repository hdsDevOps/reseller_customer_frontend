import React from "react";
import PlanCard from "../components/PlanCards";

const Plans: React.FC = () => {
  return (
    <div>
      <main className="h-full w-full flex flex-col justify-center items-center">
        <PlanCard />
      </main>
    </div>
  );
};

export default Plans;
