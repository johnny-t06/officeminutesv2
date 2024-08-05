"use client";

import React from "react";

interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      {!visible && (
        <div className="sticky lg:hidden block z-50 right-0 top-1/2 -translate-y-1/2">
          <button onClick={() => setVisible(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                fill="#393939"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="sticky overflow-x-hidden overflow-y-scroll lg:block hidden">
        {children}
      </div>
      {visible && (
        <div className="absolute w-full h-full z-50 lg:hidden block shadow-tile">
          {/* <div className="w-96">hi</div> */}
          {children}
          {/* <div className="w-32">{children}</div> */}
        </div>
      )}
    </>
  );
};

export default Sidebar;
