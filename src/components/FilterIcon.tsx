import * as React from "react";
import Svg, { Rect, G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";

const FilterIcon: React.FC<SvgProps> = (props) => (
  <Svg
    width={props.width || 25}
    height={props.height || 25}
    viewBox="0 0 25 25"
    fill="none"
    {...props}
  >
    <Rect
      opacity="0.01"
      x="0.5"
      y="0.5"
      width="24"
      height="24"
      fill="white"
      stroke="#707070"
    />
    <G clipPath="url(#clip0_0_9793)">
      <G clipPath="url(#clip1_0_9793)">
        <Path d="M12.4951 4.41016V21" stroke="#231F20" />
        <Path
          d="M12.4951 11.3916C13.8731 11.3916 14.9902 10.2745 14.9902 8.89648C14.9902 7.51847 13.8731 6.40137 12.4951 6.40137C11.1171 6.40137 10 7.51847 10 8.89648C10 10.2745 11.1171 11.3916 12.4951 11.3916Z"
          fill="white"
          stroke="#231F20"
        />
      </G>
      <G clipPath="url(#clip2_0_9793)">
        <Path d="M19.4287 4.41016V21" stroke="#231F20" />
        <Path
          d="M19.4951 18.9902C20.8731 18.9902 21.9902 17.8731 21.9902 16.4951C21.9902 15.1171 20.8731 14 19.4951 14C18.1171 14 17 15.1171 17 16.4951C17 17.8731 18.1171 18.9902 19.4951 18.9902Z"
          fill="white"
          stroke="#231F20"
        />
      </G>
      <G clipPath="url(#clip3_0_9793)">
        <Path d="M5.49512 4.41016V21" stroke="#231F20" />
        <Path
          d="M5.49511 18.9902C6.87313 18.9902 7.99022 17.8731 7.99022 16.4951C7.99022 15.1171 6.87313 14 5.49511 14C4.1171 14 3 15.1171 3 16.4951C3 17.8731 4.1171 18.9902 5.49511 18.9902Z"
          fill="white"
          stroke="#231F20"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="clip0_0_9793">
        <Rect
          width="18.9902"
          height="16.5898"
          fill="white"
          transform="translate(3 4.41016)"
        />
      </ClipPath>
      <ClipPath id="clip1_0_9793">
        <Rect
          width="4.99022"
          height="16.5898"
          fill="white"
          transform="translate(10 4.41016)"
        />
      </ClipPath>
      <ClipPath id="clip2_0_9793">
        <Rect
          width="4.99022"
          height="16.5898"
          fill="white"
          transform="translate(17 4.41016)"
        />
      </ClipPath>
      <ClipPath id="clip3_0_9793">
        <Rect
          width="4.99022"
          height="16.5898"
          fill="white"
          transform="translate(3 4.41016)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export default FilterIcon;
