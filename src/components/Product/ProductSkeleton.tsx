import { Card, CardContent, Skeleton } from "@mui/material";
import { ReactNode } from "react";

export const ProductSkeleton = (): ReactNode => {
  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <Skeleton variant="rectangular" width="100%" height="140px" />
      <CardContent sx={{ height: "100%" }}>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      </CardContent>
    </Card>
  );
};
