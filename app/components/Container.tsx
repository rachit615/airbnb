"useclient";

import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}
// container have to make responsive
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-[2520px] xl: md: px-8 sm: xs:">
      {children}
    </div>
  );
};

export default Container;
