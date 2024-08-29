import { Link } from "react-router-dom";
import { CardActionArea, CardActionAreaProps } from "@mui/material";

interface ProductLinkProps extends CardActionAreaProps {
  to: string;
}

export const ProductLink: React.FC<ProductLinkProps> = (props) => {
  return <CardActionArea component={Link} {...props} />;
};
