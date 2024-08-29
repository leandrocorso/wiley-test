import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { Layout } from "@/pages/Layout";
import { Products } from "@/pages/Products";
import { ProductAdd } from "@/pages/ProductAdd";
import { ProductUpdate } from "@/pages/ProductUpdate";
import { ProductDetails } from "@/pages/ProductDetails";
import { NotFound } from "@/pages/NotFound";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Products />}></Route>
            <Route path="add-product" element={<ProductAdd />}></Route>
            <Route path="edit-product/:id" element={<ProductUpdate />}></Route>
            <Route path="product/:id" element={<ProductDetails />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
