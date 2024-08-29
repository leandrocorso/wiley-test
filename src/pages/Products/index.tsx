import { useEffect, lazy, Suspense, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ProductProps } from "@/types/productSchema";
import { AppDispatch } from "@/store/store";
import { getProducts, selectProducts } from "@/store/productSlice";
import { showError } from "@/store/feedbackSlice";
import { ProductSkeleton } from "@/components/Product/ProductSkeleton";
import { Loading } from "@/components/Loading";

const LazyProduct = lazy(() => import("@/components/Product"));

export const Products = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, data: products } = useSelector(selectProducts);

  const [productList, setProductsList] = useState<ProductProps[]>(products);

  useEffect(() => {
    if (!loading && !error && products.length === 0) {
      dispatch(getProducts()).then(({ payload }) => {
        setProductsList(payload as ProductProps[]);
      });
    }
  }, [dispatch, loading, error, products]);

  const handleSearch = (keyword: string) => {
    const keyLower = keyword.toLowerCase();
    const filteredProducts = products.filter((item) =>
      item.title.toLowerCase().includes(keyLower)
    );
    if (filteredProducts) setProductsList(filteredProducts || products);
  };

  if (error) dispatch(showError(error));

  if (loading) return <Loading backdrop />;

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <h1>Products</h1>
        </Grid>
        <Grid item>
          <TextField
            label="Search"
            placeholder="Find a product"
            InputLabelProps={{ shrink: true }}
            fullWidth
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Grid>
      </Grid>

      {!productList.length && (
        <Grid item>
          <Typography>No products found</Typography>
        </Grid>
      )}

      <Grid container spacing={2}>
        {productList.map((product: ProductProps, i: number) => (
          <Grid
            key={`product-item-${i}`}
            item
            xl={2}
            lg={3}
            md={4}
            sm={6}
            xs={12}
          >
            <Suspense fallback={<ProductSkeleton />}>
              <LazyProduct {...product} />
            </Suspense>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
