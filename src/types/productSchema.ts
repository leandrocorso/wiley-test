import { z } from "zod";

const commonSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(1, { message: "Title is required" }),

  price: z
    .string()
    .min(0.01, { message: "The minimum price is $0.01" })
    .max(999999999.99, {
      message: "The maximum price is $999 bilions and 99 cents",
    }),

  description: z.string().min(1, {
    message: "The description must be at least 3 characters long",
  }),

  category: z.string().min(1, { message: "Category is required" }),
});

export const productSchema = commonSchema.extend({
  imageFile: z.custom<FileList>(
    (fileList) => {
      const file = fileList[0];
      if (!(file instanceof File)) return false;
      const isValidSize = file.size <= 5 * 1024 * 1024;
      const isValidType = ["image/png", "image/jpeg"].includes(file.type);
      return isValidSize && isValidType;
    },
    { message: "PNG or JPG only and cannot exceed 5 MB" }
  ),
});

export const productUpdateSchema = commonSchema.extend({
  image: z.string(),
  imageFile: z
    .custom<FileList>(
      (fileList) => {
        if (!fileList || fileList.length === 0) {
          return true;
        }
        const file = fileList[0];
        if (!(file instanceof File)) return false;
        const isValidSize = file.size <= 5 * 1024 * 1024;
        const isValidType = ["image/png", "image/jpeg"].includes(file.type);
        return isValidSize && isValidType;
      },
      { message: "PNG or JPG only and cannot exceed 5 MB" }
    )
    .optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;

export type ProductUpdateProps = z.infer<typeof productUpdateSchema> & {
  image: string;
};

export type ProductProps = Omit<ProductSchema, "imageFile"> & {
  image: string;
};
