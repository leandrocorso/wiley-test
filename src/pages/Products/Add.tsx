import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductSchema } from "@/types/productSchema";
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
} from "@mui/material";
import { Loading } from "@/components/Loading";
// Store
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getCategories, selectCategories } from "@/store/categoriesSlice";
import { createProduct, setCurrentProduct } from "@/store/productSlice";
import { showError, showSuccess } from "@/store/feedbackSlice";
// Utils
import { toDecimal } from "@/utils/toDecimal";
import { uploadFiles } from "@/utils/uploadFiles";

export const Add = (): ReactNode => {
  const navigate = useNavigate();
  const [uploading, setUpload] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
  });

  const handleSaveProduct = async (formData: ProductSchema) => {
    if (!formData) {
      dispatch(showError("Is not possible to save a product without data"));
      return false;
    }

    setUpload(true);

    const image = await uploadFiles(formData.imageFile);
    Object.assign(formData, { image });

    dispatch(createProduct(formData))
      .then(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { imageFile, ...savedProduct } = formData;
        setUpload(false);
        reset();
        dispatch(setCurrentProduct(savedProduct));
        dispatch(showSuccess("Product saved successfully"));
        navigate("/");
      })
      .catch((error) => {
        setUpload(false);
        console.error(error);
        dispatch(showError("Error saving product"));
      });
  };

  if (categories.error) dispatch(showError(categories.error));

  return (
    <>
      {uploading && <Loading backdrop />}
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit(handleSaveProduct)} autoComplete="off">
        <Grid container item direction="column" spacing={4} md={4} sm={6}>
          <Grid item>
            <TextField
              label="Title"
              placeholder="Product name"
              InputLabelProps={{ shrink: true, required: true }}
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
              disabled={uploading}
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
              disabled={uploading}
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
              disabled={uploading}
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
                    uploading || categories.loading || !!categories.error
                  }
                  defaultValue=""
                  {...register("category")}
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

          <Grid item>
            <TextField
              type="file"
              label="Image file"
              inputProps={{ accept: "image/jpg, image/png" }}
              InputLabelProps={{ shrink: true, required: true }}
              fullWidth
              error={!!errors.imageFile}
              helperText={errors.imageFile?.message}
              disabled={uploading}
              {...register("imageFile")}
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={uploading}
            >
              {uploading ? "Please wait" : `Save the product`}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
