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
                            <Card sx={{ display: "flex", flexDirection: "row", background: "transparent" }}>
                                <Button size="small" variant='outlined' sx={{ marginX: "5px" }} onClick={() => { }}>+</Button>
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
                                <Button size="small" variant='outlined' sx={{ marginX: "5px" }} onClick={() => { }}>-</Button>
                            </Card>
                        </Card >
                    )
                })
            }
        </Grid>
    );
};

export default Cart;