'use client';

import { productInterface } from "@/interfaces/product";
import { Card, Typography, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const Cart = () => {
    const [cartProducts, setCartProducts] = useState<productInterface[] | null>(null);

    useEffect(() => {
        const cartProduct = localStorage.getItem('cart-products');
        if (cartProduct) {
            const processedData = JSON.parse(cartProduct);
            setCartProducts(processedData);
        }
    }, []);

    if (!cartProducts) {
        return (
            <Typography variant="h5" sx={{ textAlign: "center", marginY: "20px" }}>Your Cart List is Empty</Typography>
        );
    }

    const handleRemoveProduct = (productId: number) => {
        const processedData = cartProducts.filter((product) => product.id !== productId);
        setCartProducts(processedData);
        saveLocalStorage(processedData);
    }

    const handleIncrementProduct = (productId: number) => {
        const processedData = cartProducts.map((product) => {
            if (product.id === productId && product.quantity) {
                product.quantity += 1;
            }
            return product;
        });
        setCartProducts(processedData);
        saveLocalStorage(processedData);
    }

    const handleDecrementProduct = (productId: number) => {
        let processedData = cartProducts.map((product) => {
            if (product.id === productId && product.quantity) {
                product.quantity -= 1;
            }
            return product;
        });
        processedData = processedData.filter((item) => item.quantity && item.quantity > 0);
        setCartProducts(processedData);
        saveLocalStorage(processedData);
    }

    const saveLocalStorage = (processedData: productInterface[]) => {
        localStorage.setItem('cart-products', JSON.stringify(processedData))
    }

    return (
        <Grid container spacing={2} justifyContent={"center"}>
            {
                cartProducts?.map((item) => {
                    return (
                        < Card sx={{ padding: "15px", margin: "15px", color: "white", background: "black" }} key={item.id}>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, textAlign: "center" }}>
                                {item.title}
                            </Typography>
                            <Typography variant="h5">
                                {item.brand}
                            </Typography>
                            <img src={item.thumbnail} alt={item.title + " image"} />
                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{item.price}</Typography>
                            <Card sx={{ display: "flex", flexDirection: "row", justifyContent: "center", marginY: "15px", background: "transparent" }}>
                                <Button size="small" variant='outlined' sx={{ marginX: "5px" }} onClick={() => { handleIncrementProduct(item.id); }}>+</Button>
                                <TextField value={item.quantity} sx={{
                                    width: "50px",
                                    marginX: "5px",
                                    textAlign: "center",
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
                                    }
                                }} />
                                <Button size="small" variant='outlined' sx={{ marginX: "5px" }} onClick={() => { handleDecrementProduct(item.id); }}>-</Button>
                            </Card>
                            <Button size="small" variant='outlined' sx={{ marginX: "5px", paddingY: "5px", width: "100%" }} onClick={() => { handleRemoveProduct(item.id); }}>Remove</Button>
                        </Card >
                    )
                })
            }
        </Grid>
    );
};

export default Cart;