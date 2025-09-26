import { useMemo } from 'react';
import { productInterface } from '@/interfaces/product';
import { Card, Typography, Button, Grid, Snackbar, Alert, SnackbarCloseReason, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

interface productProps {
    data: productInterface[];
    loading?: boolean;
}

function ProductList({ data, loading }: productProps) {
    const [open, setOpen] = useState<boolean>(false);

    const processedData = useMemo(() => {
        if (data.length > 0) {
            // console.log(data)
            return data.map((elem, index) => {
                return ({
                    key: (elem as any)?.id ?? String(index),
                    rowIndex: index + 1,
                    ...elem
                });
            });
        }
    }, [data]);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const setProductToLocalStorage = (product: productInterface) => {
        const alreadyCartProduct = localStorage.getItem('cart-products');
        product.quantity = 1;
        let processedData = [];
        if (alreadyCartProduct) {
            let cartProducts = JSON.parse(alreadyCartProduct);
            let isProductPresent = false;
            cartProducts = cartProducts.map((cartproduct: productInterface) => {
                if (product.id === cartproduct.id && cartproduct.quantity) {
                    cartproduct.quantity += 1;
                    isProductPresent = true;
                }
                return cartproduct;
            })
            processedData = [...cartProducts];
            if (!isProductPresent) {
                processedData.push(product);
            }
        }
        else {
            processedData = [product];
        }
        localStorage.setItem('cart-products', JSON.stringify(processedData));
        setOpen(true);
    }

    return (
        <>
            < Grid container spacing={2} justifyContent={"center"} sx={{ margin: "10px" }} >
                {loading && <CircularProgress size="3rem" />}
                {!loading &&
                    <>
                        {
                            processedData?.map((item) => {
                                return (
                                    < Card sx={{ padding: "15px", margin: "15px", color: "white", background: "black", border: "1px solid white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} key={item.key}>
                                        <Typography variant='h5' gutterBottom sx={{ textAlign: "center" }}>
                                            {item.title}
                                        </Typography>
                                        <Typography>
                                            Brand: {item.brand}
                                        </Typography>
                                        <img src={item.thumbnail} alt={item.title + " image"} />
                                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{item.price}</Typography>
                                        <Typography variant="body2">
                                            {item.shippingInformation}
                                        </Typography>
                                        <Button size="small" variant='outlined' sx={{ marginY: "15px" }} onClick={() => { setProductToLocalStorage(item); }}>Add To Cart</Button>
                                        <Link href={`/product/${item.id}`}>
                                            <Button size="small" variant='outlined'>Show Details</Button>
                                        </Link>
                                    </Card >
                                )
                            })
                        }
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert
                                onClose={handleClose}
                                severity="success"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                Product Added To Cart
                            </Alert>
                        </Snackbar>
                    </>
                }
            </Grid >
        </>
    );
}

export default ProductList;