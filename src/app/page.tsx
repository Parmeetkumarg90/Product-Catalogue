'use client'
import React, { useEffect, useState } from "react";
import ProductList from "@/component/product-list/productList";
import { Pagination, PaginationItem, TextField } from "@mui/material";
import { productInterface } from "@/interfaces/product";
import { getAllProducts, searchProduct } from '@/services/product';
import Error from "@/component/error/error";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const [productList, setProductList] = useState<productInterface[] | []>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setLoading(true);
    // console.log(currentPage * 10);
    setSkip(currentPage * 10);
    getProducts();
  }, [currentPage])

  const getProducts = async () => {
    try {
      const result = await getAllProducts(skip);
      // console.log(result);
      setTotalProducts(Math.floor(result.total / 10))
      if (Array.isArray(result.products)) {
        setProductList(result.products);
      }
    }
    catch (err) { }
    finally {
      const timer = setInterval(() => {
        clearInterval(timer);
        setLoading(false);
      }, 500);
    }
  };

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  }

  const getSearchedProduct = async (e: any) => {
    if (e.target.value.trim() != "") {
      const result = await searchProduct(e.target.value);
      // console.log(result);
      setTotalProducts(Math.floor(result.total / 10))
      if (Array.isArray(result.products)) {
        setProductList(result.products);
      }
    }
    else {
      getProducts();
    }
  }

  return (
    <>
      {children}
      <TextField onChange={getSearchedProduct} placeholder="Search products here"
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
            color: "white",
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
        }}
      />
      <ProductList data={productList} loading={isLoading} />
      <Pagination count={totalProducts} page={currentPage} onChange={handlePageChange} color="primary" variant="outlined" shape="rounded"
        sx={{ position: "fixed", zIndex: 1000, bottom: 20, margin: "auto", background: "black", border: "1px solid white", display: "inline-flex" }}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{ color: 'white', '&.Mui-selected': { color: 'white', }, }}
          />
        )} />
    </>
  );
}