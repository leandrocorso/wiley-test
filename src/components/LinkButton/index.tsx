import { Link } from "react-router-dom";
import { Button, ButtonProps } from "@mui/material";

interface LinkButtonProps extends ButtonProps {
  to: string;
}

export const LinkButton: React.FC<LinkButtonProps> = (props) => {
  return <Button LinkComponent={Link} {...props} />;
};
