import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill}
      d="M31.128 26.198c-.024-.066-2.373-6.64-1.313-9.928a.533.533 0 0 0 .041-.255v-3.404a.582.582 0 0 0-.15-.39.709.709 0 0 0-.242-.173.797.797 0 0 0-.159-.052c-5.578-1.332-11.75-6.317-12.771-7.165v-.678c.697-.345 1.445-.192 2.537.072.69.167 1.412.36 2.161.326 4-.187 3.773-4.163 3.595-4.287-.179-.123-3.55.983-6.058-.12-1.154-.508-3.704.468-3.704.774V4.96c-1.216 1.093-6.713 5.786-12.747 7.03a.83.83 0 0 0-.17.05.714.714 0 0 0-.247.171.584.584 0 0 0-.14.247.518.518 0 0 0-.018.15v3.406a.537.537 0 0 0 .033.233c.991 3.41-1.282 9.888-1.305 9.953a.545.545 0 0 0 .114.549c.139.157.357.25.59.25h29.25a.786.786 0 0 0 .59-.251.544.544 0 0 0 .113-.55ZM16.534 1.358c.447-.128 1.118-.245 1.712-.054 1.693.546 3.155.683 4.947.432-.276.743-.89 1.553-1.994 1.574-.537.009-1.112-.13-1.723-.278-.62-.15-1.315-.319-2.035-.319-.3 0-.603.03-.907.101V1.357Zm11.854 14.561c-.005.024-.012.049-.012.074 0 .1-.078.224-.207.33-.28.229-.729.353-1.243.339-1.095-.029-1.482-.466-1.597-.65v-2.794h3.059v2.701Zm-12.038.078v-2.779h3.388V16.122c0 .165-.64.54-1.694.54-1.034 0-1.67-.357-1.693-.525a.865.865 0 0 0 .005-.071.368.368 0 0 0-.006-.07Zm-1.106.079a.393.393 0 0 0-.003.046c0 .165-.634.54-1.68.54-1.012 0-1.541-.359-1.541-.55a.396.396 0 0 0-.014-.103v-2.79h3.243v2.775a.389.389 0 0 0-.006.071v.01Zm-7.872-2.858h3.533v2.774c-.208.242-.733.684-1.758.67-1.137-.014-1.609-.463-1.775-.688v-2.756Zm13.468 2.894v-2.893h3.387v2.893c0 .137-.617.55-1.74.55-1.07 0-1.647-.38-1.647-.55ZM15.889 6.034a50.398 50.398 0 0 0 3.302 2.448h-6.414a37.56 37.56 0 0 0 3.112-2.448Zm-4.494 3.38h9.216c1.438.906 3.067 1.822 4.762 2.563H6.562c1.78-.738 3.418-1.655 4.833-2.564ZM6.27 13.217v2.875c0 .193-.549.569-1.554.569-.967 0-1.494-.455-1.494-.707l-.011-.23v-2.506H6.27Zm6.315 12.54c1.282-1.327 2.477-3.586 3.202-5.118.75 1.53 1.979 3.79 3.254 5.119h-6.456Zm7.919 0c-1.077-.708-2.928-3.723-4.212-6.563-.082-.18-.287-.3-.515-.3h-.004c-.23.002-.434.123-.513.306-1.228 2.837-3.052 5.85-4.165 6.558H2.141c.513-1.634 1.558-5.424 1.309-8.377.364.132.791.211 1.267.211.943 0 1.742-.25 2.21-.645.433.321 1.129.632 2.203.645 1.063.02 1.77-.314 2.22-.646.465.395 1.266.646 2.211.646.936 0 1.736-.22 2.234-.573.501.353 1.306.573 2.249.573.92 0 1.723-.222 2.229-.575.492.354 1.286.575 2.215.575.891 0 1.802-.226 2.344-.63.446.341 1.123.605 2.06.63l.107.001c.4 0 .781-.06 1.122-.172-.257 2.908.808 6.699 1.332 8.337h-8.948Z"
    />
  </svg>
);
export default SvgComponent;
