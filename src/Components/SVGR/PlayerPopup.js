import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={42}
    height={38}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="m20.859 23.029.072-.062.072.062 7.834-6.703c2.163-1.851 2.163-4.852 0-6.703-1.082-.926-2.5-1.389-3.917-1.389-1.417 0-2.835.463-3.917 1.389l-.072.061-.072-.061c-1.082-.926-2.5-1.389-3.917-1.389-1.417 0-2.835.463-3.917 1.389-2.163 1.85-2.163 4.851 0 6.703l7.834 6.703Zm-.99-12.56.073.063.989.847.99-.847.072-.062c.782-.67 1.821-1.038 2.927-1.038 1.105 0 2.145.369 2.926 1.038.782.669 1.213 1.559 1.213 2.505s-.43 1.835-1.213 2.504l-6.842 5.856-.073-.062-.072.062-6.844-5.856c-1.614-1.381-1.614-3.628 0-5.01.782-.668 1.822-1.037 2.927-1.037 1.106 0 2.145.369 2.927 1.038ZM27.835 25.424c-1.475.694-2.868 1.349-3.779 2.952-.793 1.388-1.134 3.054-1.075 5.245l-.2 3.518h1.4l.199-3.482a.423.423 0 0 0 0-.043c-.056-2.002.24-3.499.933-4.713.718-1.262 1.81-1.777 3.195-2.428.299-.14.607-.285.92-.442 1.475-.74 2.732-1.86 3.842-2.848.219-.195.434-.387.646-.572a88.202 88.202 0 0 1 1.684-1.349c.43-.367 1.186-.367 1.616 0 .447.383.448 1.004.003 1.386l-5.953 5.094a.536.536 0 0 0-.101.737c.044.062.115.154.232.254a.786.786 0 0 0 .989 0 .554.554 0 0 0 .205-.432l5.617-4.806c.99-.849.99-2.23-.003-3.079a2.642 2.642 0 0 0-1.147-.555v-4.568c0-.661.552-1.224 1.257-1.282.394-.03.774.077 1.068.305.291.227.458.548.458.88v10.466c0 .285-.167.536-.42.689l.06.052-.004.004-6.72 5.751c-.254.218-.483.408-.724.536a.6.6 0 0 0-.323.43l-.606 4.015H32.5l.557-3.598c.246-.162.468-.346.69-.536l6.72-5.751c.19-.162.386-.33.567-.521a.53.53 0 0 0 .122-.557 1.74 1.74 0 0 0 .087-.514V15.196c0-.669-.335-1.313-.916-1.765-.58-.452-1.362-.675-2.141-.612-1.416.115-2.525 1.201-2.525 2.474v4.592c-.389.101-.745.27-1.028.513a89.181 89.181 0 0 0-1.714 1.374c-.215.188-.434.383-.657.581-1.098.978-2.233 1.989-3.54 2.644-.302.152-.599.29-.887.427ZM8.185 33.542l.558 3.597h1.411l-.622-4.015a.6.6 0 0 0-.323-.43c-.24-.128-.47-.318-.724-.535l-6.72-5.751a.038.038 0 0 1-.005-.004l.061-.052c-.254-.153-.421-.404-.421-.69V15.198c0-.333.167-.653.458-.88a1.512 1.512 0 0 1 1.068-.305c.705.057 1.256.62 1.256 1.282v4.567c-.428.097-.825.28-1.146.555-.993.85-.994 2.23-.003 3.079l5.62 4.809c0 .153.07.307.207.425a.794.794 0 0 0 .995-.005 1.35 1.35 0 0 0 .221-.244c.17-.237.128-.542-.1-.738l-5.953-5.094c-.446-.381-.445-1.003.002-1.385.43-.367 1.166-.385 1.638.017.382.3 1.425 1.125 1.663 1.332.211.185.426.376.645.571 1.11.988 2.368 2.108 3.843 2.848.313.157.62.302.92.443 1.383.65 2.477 1.165 3.194 2.429.693 1.213.99 2.71.933 4.711v.044l.215 3.481h1.385l-.2-3.518c.06-2.19-.282-3.857-1.074-5.243-.912-1.605-2.304-2.26-3.779-2.954-.289-.136-.585-.275-.887-.426-1.308-.656-2.443-1.667-3.54-2.644a75.638 75.638 0 0 0-.657-.58 86.944 86.944 0 0 0-1.693-1.358 2.627 2.627 0 0 0-1.05-.53v-4.592c0-1.273-1.108-2.36-2.524-2.474-.78-.066-1.561.16-2.141.611C.334 13.884 0 14.528 0 15.197v10.466c0 .179.035.349.086.514a.532.532 0 0 0 .123.556c.181.192.376.36.565.521l6.721 5.751c.223.191.445.375.69.537ZM21.125 4.431c.78 0 1.421-.549 1.421-1.216v-2C22.546.55 21.904 0 21.126 0c-.78 0-1.421.549-1.421 1.216v2c0 .666.641 1.215 1.42 1.215ZM29.323 6.386c.458 0 .87-.196 1.145-.51l1.375-1.607c.23-.275.32-.589.275-.902-.046-.314-.275-.588-.55-.785-.641-.392-1.512-.274-1.97.275l-1.375 1.608c-.458.549-.32 1.294.32 1.686.184.157.459.235.78.235ZM10.809 5.876c.275.314.687.51 1.146.51.32 0 .595-.078.824-.235.642-.392.78-1.137.321-1.686l-1.375-1.608c-.458-.549-1.329-.667-1.97-.275-.642.393-.78 1.138-.32 1.687l1.374 1.607Z"
    />
  </svg>
);
export default SvgComponent;
