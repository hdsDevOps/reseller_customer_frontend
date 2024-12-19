import React, { useState, ReactNode } from "react";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

const dottedline = (
  <svg height="4" width="100%" className="mt-4">
    <line
      x1="0"
      y1="0"
      x2="100%"
      y2="0"
      style={{ stroke: "#12A833", strokeWidth: 4, strokeDasharray: "8, 4" }}
    />
  </svg>
);

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  id,
  isOpen,
  onToggle,
}) => {
  return (
    <div>
      <h2 id={`accordion-flush-heading-${id}`}>
        <button
          type="button"
          className={`flex items-center justify-between w-full py-3 pt-5 font-medium rtl:text-right text-gray-500 dark:text-gray-400 gap-3
            ${isOpen ? "border-b-0" : ""}`}
          onClick={() => onToggle(id)}
          aria-expanded={isOpen}
          aria-controls={`accordion-flush-body-${id}`}
        >
          <span className="text-black font-semibold text-2xl">{title}</span>
          <svg
            className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
              isOpen ? "" : "rotate-180"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-flush-body-${id}`}
        className={`${isOpen ? "block" : "hidden"} transition-all duration-200 pb-5 mt-0`}
        aria-labelledby={`accordion-flush-heading-${id}`}
      >
        <div className="text-[#0D121F] font-light text-xl">{children}</div>
      </div>
      {dottedline}
    </div>
  );
};

const Accordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      data-inactive-classes="text-gray-500 dark:text-gray-400"
    >
      <AccordionItem
        title="What is Google Workspace?"
        id="1"
        isOpen={openId === "1"}
        onToggle={toggleAccordion}
      >
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Google Workspace is a cloud-based productivity suite that includes
          everything you need to get work done, like email, calendars, video
          conferencing, online storage, and more. It's a powerful tool that
          makes collaboration easy and efficient, and it's trusted by millions
          of businesses around the world. At Bluehost, we offer Google Workspace
          as a way to help our customers streamline their workflow and focus on
          what they do best. For a more in-depth look, read our introduction to
          Google Workspace.
        </p>
      </AccordionItem>
      <AccordionItem
        title="How much is Google Workspace?"
        id="2"
        isOpen={openId === "2"}
        onToggle={toggleAccordion}
      >
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </AccordionItem>
      <AccordionItem
        title="What is Google Workspace used for?"
        id="3"
        isOpen={openId === "3"}
        onToggle={toggleAccordion}
      >
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </AccordionItem>
      <AccordionItem
        title="What does Google Workspace include?"
        id="4"
        isOpen={openId === "4"}
        onToggle={toggleAccordion}
      >
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </AccordionItem>
    </div>
  );
};

export default Accordion;
