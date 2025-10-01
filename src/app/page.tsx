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
  // const [skip, setSkip] = useState<number>(0);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [productList, setProductList] = useState<productInterface[] | []>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    getProducts(0);
  }, []);

  useEffect(() => {
    setLoading(true);
    // console.log(currentPage * 10);
    // setSkip(currentPage * 10);
    if (isSearching) {
      getSearchedProduct((currentPage - 1) * 10);
    }
    else {
      getProducts((currentPage - 1) * 10);
    }
  }, [currentPage, isSearching, searchValue])

  const getProducts = async (current_skip: number) => {
    try {
      const result = await getAllProducts(current_skip);
      // console.log(result);
      setTotalProducts(Math.floor(result.total / 10))
      if (Array.isArray(result.products)) {
        setProductList(result.products);
      }
    }
    catch (err) {
      console.log(err);
    }
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

  const getSearchedProduct = async (page: number) => {
    try {
      setLoading(true);
      if (searchValue.trim() != "") {
        const result = await searchProduct(searchValue, page);
        // console.log(result);
        setTotalProducts(Math.floor(result.total / 10))
        if (Array.isArray(result.products)) {
          setProductList(result.products);
        }
        setIsSearching(true);
      }
      else {
        // setSkip(0);
        setCurrentPage(1);
        getProducts(0);
        setIsSearching(false);
      }
    }
    catch (err) {
      console.log(err);
    }
    finally {
      const timer = setInterval(() => {
        clearInterval(timer);
        setLoading(false);
      }, 500);
    }
  }

  return (
    <>
      {children}
      <TextField onChange={(e: any) => { setSearchValue(e.target.value); getSearchedProduct(0); }} placeholder="Search products here"
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
        key={Date.now()}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{ color: 'white', '&.Mui-selected': { color: 'white', }, }}
          />
        )} />
    </>
  );
}