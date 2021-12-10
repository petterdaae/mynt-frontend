import { Avatar } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

function CategoryIcon({ color, ...props }) {
  return (
    <Avatar
      bg={color}
      icon={<ViewIcon fontSize="1.5rem" color={color} {...props} />}
    />
  );
}

CategoryIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

export default CategoryIcon;
