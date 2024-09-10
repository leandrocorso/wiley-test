import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { Layout } from "@/pages/Layout";
import { List } from "@/pages/Products/List";
import { Add } from "@/pages/Products/Add";
import { Update } from "@/pages/Products/Update";
import { Details } from "@/pages/Products/Details";
import { NotFound } from "@/pages/NotFound";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<List />}></Route>
            <Route path="add-product" element={<Add />}></Route>
            <Route path="edit-product/:id" element={<Update />}></Route>
            <Route path="product/:id" element={<Details />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
