import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M7.5 10.68 2.865 14 4.65 8.648 0 5.348l5.739.012L7.5 0l1.761 5.36L15 5.348l-4.65 3.3L12.135 14 7.5 10.68Zm0-.726 3.49 2.5-1.344-4.03 3.502-2.486-4.322.01L7.5 1.91 6.174 5.947l-4.322-.009 3.502 2.485-1.345 4.031 3.491-2.5Z"
    />
  </svg>
);
export default SvgComponent;
