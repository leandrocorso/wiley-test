import { useEffect, lazy, Suspense, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ProductProps } from "@/types/productSchema";
import { AppDispatch } from "@/store/store";
import { getProducts, selectProducts } from "@/store/productSlice";
import { showError } from "@/store/feedbackSlice";
import { ProductSkeleton } from "@/components/Product/ProductSkeleton";
import { Loading } from "@/components/Loading";
import { ApiResponse } from "@/services/fakeStore";

const LazyProduct = lazy(() => import("@/components/Product"));

export const List = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, data } = useSelector(selectProducts);

  const [products, setProducts] = useState<ProductProps[]>(data);

  useEffect(() => {
    if (!loading && !error && data.length === 0) {
      dispatch(getProducts()).then(({ payload }) => {
        const { data } = payload as ApiResponse<ProductProps[]>;
        setProducts(data as ProductProps[]);
      });
    }
  }, [dispatch, loading, error, data]);

  const handleSearch = (keyword: string) => {
    const keyLower = keyword.toLowerCase();
    const filteredProducts = data.filter((item) =>
      item.title.toLowerCase().includes(keyLower)
    );
    if (filteredProducts) setProducts(filteredProducts || data);
  };

  if (error) dispatch(showError(error));

  if (loading) return <Loading backdrop />;

  if (!products) return <h2>No products</h2>;

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

      <Grid container spacing={2}>
        {products.map((product: ProductProps, i: number) => (
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
