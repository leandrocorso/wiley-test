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
} from "@/store/productSlice";

import { showError, showSuccess } from "@/store/feedbackSlice";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "@/components/Loading";
import { Confirm } from "@/components/Confirm";
import { LinkButton } from "@/components/LinkButton";
import { ProductProps } from "@/types/productSchema";

export const ProductDetails = (): ReactNode => {
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
  const [current, setCurrent] = useState<ProductProps>();

  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    error,
    current: currentProduct,
    data,
  } = useSelector(selectProducts);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && data && !deleteConfirm) {
      const productInStore = data.find((item) => item.id == id);
      if (productInStore) {
        setCurrent(productInStore);
      } else {
        dispatch(getProduct(+id));
      }
    }
  }, [id, data, currentProduct, deleteConfirm, dispatch]);

  const handleDelete = () => {
    if (!id) {
      dispatch(showError("Is not possible to delete a product withou #id"));
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

  if (!current) return <h2>Product not found</h2>;

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
          <h1>{current.title}</h1>
          <h2>{current.category}</h2>
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
                  image={current.image}
                  alt={current.title}
                />
              </Card>
            </Box>
            <Box>
              <Typography variant="h6">Description</Typography>
              <Typography>{current.description}</Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography variant="h6">${current.price}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
