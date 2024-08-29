import { Link } from "react-router-dom";
import { Tab, TabProps } from "@mui/material";

interface LinkTabProps extends TabProps {
  to: string;
}

export const LinkTab: React.FC<LinkTabProps> = (props) => {
  return <Tab component={Link} {...props} />;
};
