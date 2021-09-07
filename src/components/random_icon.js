import styled from "styled-components";
import PropTypes from "prop-types";
import { base } from "./size";

import {
  MdAirplanemodeActive,
  MdPieChartOutlined,
  MdColorLens,
  MdCameraAlt,
} from "react-icons/md";

const StyledIcon = styled(RandomIcon)`
  margin-right: ${3 * base}px;
  vertical-align: middle;
  height: ${5 * base}px;
  width: ${5 * base}px;
  background: lightblue;
  border-radius: 50%;
  padding: ${2 * base}px;
`;

function RandomIcon({ className }) {
  const icons = [
    MdAirplanemodeActive,
    MdPieChartOutlined,
    MdColorLens,
    MdCameraAlt,
  ];

  const random = Math.floor(Math.random() * icons.length);

  const Random = icons[random];

  return <Random className={className} />;
}

RandomIcon.propTypes = {
  className: PropTypes.string,
};

export default StyledIcon;
