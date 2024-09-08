import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productUpdateSchema, ProductUpdateProps } from "@/types/productSchema";
// Ui
import {
  TextField,
  InputAdornment,
  InputLabel,
  Select,
  FormControl,
  Grid,
  Button,
  MenuItem,
  FormHelperText,
  Card,
  Box,
} from "@mui/material";
import { Loading } from "@/components/Loading";
// Store
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, selectCategories } from "@/store/categoriesSlice";
import { showError, showSuccess } from "@/store/feedbackSlice";
import {
  getProduct,
  selectProducts,
  setCurrentProduct,
  updateProduct,
} from "@/store/productSlice";
// Utils
import { uploadFiles } from "@/utils/uploadFiles";
import { toDecimal } from "@/utils/toDecimal";

export const ProductUpdate = (): ReactNode => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [uploading, setUpload] = useState<boolean>(false);
  const [selectedCategory, setCategory] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { loading, error, current, data } = useSelector(selectProducts);

  useEffect(() => {
    if (id && data) {
      const productInStore = data.find((item) => item.id == id);
      if (productInStore) {
        dispatch(setCurrentProduct(productInStore));
      } else {
        dispatch(getProduct(id as string));
      }
    }
  }, [id, data, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductUpdateProps>({
    resolver: zodResolver(productUpdateSchema),
  });

  const handleSaveProduct = async (formData: ProductUpdateProps) => {
    if (!id && !formData) {
      dispatch(
        showError("Is not possible to save a product without #id or data")
      );
      return false;
    }

    setUpload(true);

    Object.assign(formData, { id });

    if (formData.imageFile && formData.imageFile.length > 0) {
      const image = await uploadFiles(formData.imageFile);
      Object.assign(formData, { image });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { imageFile, ...productToSave } = formData;

    dispatch(updateProduct(formData)).then(() => {
      setUpload(false);
      dispatch(setCurrentProduct(productToSave));
      dispatch(showSuccess("Product updated successfully"));
      navigate("/");
    });
  };

  if (categories.error) dispatch(showError(categories.error));

  if (error) dispatch(showError(error));

  if (loading) return <Loading backdrop />;

  if (!current || !id) return <h2>Product not found</h2>;

  return (
    <>
      <h1>Update Product</h1>

      <form onSubmit={handleSubmit(handleSaveProduct)} autoComplete="off">
        <input type="hidden" value={current.id} {...register("id")} />

        <Grid container item direction="column" spacing={4} md={4} sm={6}>
          <Grid item>
            <TextField
              label="Title"
              placeholder="Product name"
              InputLabelProps={{ shrink: true, required: true }}
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
              disabled={uploading || loading || !current}
              defaultValue={current.title}
              {...register("title")}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Price"
              placeholder="0.00"
              InputLabelProps={{ shrink: true, required: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              fullWidth
              error={!!errors.price}
              helperText={errors.price?.message}
              maxLength={12}
              disabled={uploading || loading}
              defaultValue={toDecimal(current.price.toString())}
              {...register("price", {
                onChange: (e) => {
                  const { value } = e.target;
                  if (value.length <= 12) setValue("price", toDecimal(value));
                },
              })}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Description"
              InputLabelProps={{ shrink: true, required: true }}
              rows={3}
              multiline
              fullWidth
              error={!!errors.description}
              helperText={errors.description?.message}
              disabled={uploading || loading}
              defaultValue={current.description}
              {...register("description")}
            />
          </Grid>

          <Grid item>
            {categories.error}
            {categories.loading && "Loading categories"}

            {!categories.error && !categories.loading && (
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel
                  id="categories"
                  style={{ padding: "0 4px", background: "#fff" }}
                  shrink
                  required
                >
                  Category
                </InputLabel>
                <Select
                  labelId="categories"
                  disabled={
                    uploading ||
                    loading ||
                    !!error ||
                    categories.loading ||
                    !!categories.error
                  }
                  {...register("category")}
                  value={selectedCategory || current.category}
                  defaultValue={current.category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  {categories.data.map((item, index) => (
                    <MenuItem key={`category-${index}`} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category?.message && (
                  <FormHelperText>{errors.category?.message}</FormHelperText>
                )}
              </FormControl>
            )}
          </Grid>

          {current.image && (
            <>
              <Grid item>
                <Card>
                  <Box display="flex" justifyContent="center" sx={{ p: 1 }}>
                    <img
                      width={140}
                      height="auto"
                      src={current.image}
                      alt={current.title}
                    />
                  </Box>
                </Card>
              </Grid>
              <input
                type="hidden"
                value={current.image}
                {...register("image")}
              />
            </>
          )}

          <Grid item>
            <TextField
              type="file"
              label="Image file"
              inputProps={{ accept: "image/jpg, image/png" }}
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.imageFile}
              helperText={errors.imageFile?.message}
              disabled={uploading || loading}
              {...register("imageFile")}
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={uploading || loading}
            >
              {uploading ? "Please wait" : `Update the product`}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
