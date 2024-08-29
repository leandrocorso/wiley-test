import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ProductLink } from "./ProductLink";
import { ProductProps } from "@/types/productSchema";

const Product = ({ id, title, price, image }: ProductProps): ReactNode => {
  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <ProductLink
        LinkComponent={Link}
        to={`/product/${id}`}
        sx={{ height: "100%" }}
      >
        <CardMedia component="img" height="140" image={image} alt={title} />
        <CardContent sx={{ height: "100%" }}>
          <Typography gutterBottom component="h4" variant="h6">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            $ {price}
          </Typography>
        </CardContent>
      </ProductLink>
    </Card>
  );
};

export default Product;
