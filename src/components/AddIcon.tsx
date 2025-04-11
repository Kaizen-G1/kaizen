import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";

const AddIcon: React.FC<SvgProps> = (props) => (
  <Svg
    width={props.width || 40}
    height={props.height || 40}
    viewBox="0 0 30 30"
    fill="none"
    {...props}
  >
    <G
      stroke="#753742"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <Path d="M8.017 21.983V5.22L11.181 1h13.656L28 5.219v16.764c0 .797-.645 1.443-1.442 1.443H9.46a1.443 1.443 0 0 1-1.443-1.443ZM9.017 4.885H27" />
      <Path d="M22.893 9.77a4.885 4.885 0 1 1-9.77 0" />
    </G>

    <G stroke="#753742" strokeWidth={2}>
      <Path fill="#fff" d="M17 16a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
      <Path d="M9.082 12.752v6.66M12.412 16.082h-6.66" strokeLinecap="round" />
    </G>

    <Defs>
      <ClipPath id="a">
        <Path
          fill="#fff"
          d="M0 0h21.983v24.426H0z"
          transform="translate(7.017)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export default AddIcon;
