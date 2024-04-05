import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <circle cx={15} cy={15} r={15} fill="#54C1FF" />
    <path
      fill="#fff"
      d="M8 14.5c0-.449.364-.813.813-.813h9.059l-3.961-3.96a.819.819 0 0 1 1.158-1.158l5.867 5.867a.091.091 0 0 1 0 .128L15.07 20.43a.806.806 0 0 1-1.143-1.137l3.945-3.98h-9.06A.813.813 0 0 1 8 14.5Z"
    />
  </svg>
);
export default SvgComponent;
