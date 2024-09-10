import { ReactNode, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { AppDispatch } from "@/store/store";
import {
  getProduct,
  deleteProduct,
  selectProducts,
  setCurrentProduct,
} from "@/store/productSlice";

import { showError, showSuccess } from "@/store/feedbackSlice";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "@/components/Loading";
import { Confirm } from "@/components/Confirm";
import { LinkButton } from "@/components/LinkButton";

export const Details = (): ReactNode => {
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    error,
    current: product,
    data: products,
  } = useSelector(selectProducts);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && products && !deleteConfirm) {
      const productInStore = products.find((item) => item.id == id);
      if (productInStore) {
        dispatch(setCurrentProduct(productInStore));
      } else {
        dispatch(getProduct(id as string));
      }
    }
  }, [id, products, deleteConfirm, dispatch]);

  const handleDelete = () => {
    if (!id) {
      dispatch(showError("Is not possible to delete a product without #id"));
      return false;
    }

    dispatch(deleteProduct(id))
      .then(() => {
        dispatch(showSuccess("Product deleted successfully"));
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        dispatch(showError("Error on delete product"));
      });
  };

  if (error) dispatch(showError(error));

  if (loading) return <Loading backdrop />;

  if (!product || !id) return <h2>Product not found</h2>;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column-reverse", sm: "row" },
          gap: 2,
        }}
      >
        <Box>
          <h1>{product.title}</h1>
          <h2>{product.category}</h2>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
            }}
          >
            <LinkButton
              to={`/edit-product/${id}`}
              type="button"
              variant="contained"
              sx={{ textWrap: "nowrap" }}
            >
              Update info
            </LinkButton>

            <Button
              type="button"
              color="error"
              variant="contained"
              sx={{ textWrap: "nowrap" }}
              onClick={() => setDeleteConfirm(true)}
            >
              Delete product
            </Button>
          </Box>
        </Box>
      </Box>

      <Confirm
        action={handleDelete}
        open={deleteConfirm}
        cancel={() => setDeleteConfirm(false)}
      >
        Are you sure you want to delete this product?
      </Confirm>

      <Grid container>
        <Grid item>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Box sx={{ maxWidth: { xs: "100%", sm: "40%", md: "30%" } }}>
              <Card sx={{ padding: 2 }}>
                <CardMedia
                  component="img"
                  height="auto"
                  image={product.image}
                  alt={product.title}
                />
              </Card>
            </Box>
            <Box>
              <Typography variant="h6">Description</Typography>
              <Typography>{product.description}</Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography variant="h6">${product.price}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
