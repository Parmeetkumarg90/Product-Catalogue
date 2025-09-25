import { useMemo } from 'react';
import { productInterface } from '@/interfaces/product';
import { Card, Typography, Button, Grid } from '@mui/material';
import Link from 'next/link';

interface productProps {
    data: productInterface[];
    loading?: boolean;
}

function ProductList({ data, loading }: productProps) {
    const processedData = useMemo(() => {
        if (data.length > 0) {
            return data.map((elem, index) => {
                return ({
                    key: (elem as any)?.id ?? String(index),
                    rowIndex: index + 1,
                    ...elem
                });
            });
        }
    }, [data]);

    const setProductToLocalStorage = (product: productInterface) => {
        const alreadyCartProduct = localStorage.getItem('cart-products');
        let processedData = [product];
        if (alreadyCartProduct) {
            processedData = [...processedData,...JSON.parse(alreadyCartProduct)]
        }
        localStorage.setItem('cart-products', JSON.stringify(processedData));
    }

    return (
        <Grid container spacing={2} justifyContent={"center"}>
            {
                processedData?.map((item) => {
                    return (
                        < Card sx={{ padding: "15px", margin: "15px", color: "white", background: "black" }} key={item.key}>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, textAlign: "center" }}>
                                {item.title}
                            </Typography>
                            <Typography variant="h5">
                                {item.brand}
                            </Typography>
                            <img src={item.thumbnail} alt={item.title + " image"} />
                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{item.price}</Typography>
                            <Typography variant="body2">
                                {item.shippingInformation}
                            </Typography>
                            <Button size="small" variant='outlined' sx={{ marginX: "5px" }} onClick={() => { setProductToLocalStorage(item); }}>Add To Cart</Button>
                            <Link href={`/product/${item.id}`}>
                                <Button size="small" variant='outlined'>Show Details</Button>
                            </Link>
                        </Card >
                    )
                })
            }
        </Grid>
    );
}

export default ProductList;