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

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    // console.log(currentPage * 10);
    setSkip(currentPage * 10);
    getProducts();
  }, [currentPage])

  const getProducts = async () => {
    const result = await getAllProducts(skip);
    // console.log(result);
    setTotalProducts(Math.floor(result.total / 10))
    if (Array.isArray(result.products)) {
      setProductList(result.products);
    }
  };

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  }

  const getSearchedProduct = async (e: any) => {
    if (e.target.value.trim() != "") {
      const result = await searchProduct(e.target.value);
      console.log(result);
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
      <TextField variant="outlined" sx={{ width: "100%", border: "2px solid white" }} onChange={getSearchedProduct} />
      <ProductList data={productList} />
      <Pagination count={totalProducts} page={currentPage} onChange={handlePageChange} color="primary" variant="outlined" shape="rounded"
        sx={{ position: "sticky", bottom: 20, margin: "auto" }}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{ color: 'white', '&.Mui-selected': { color: 'white', }, }}
          />
        )} />
    </>
  );
}
