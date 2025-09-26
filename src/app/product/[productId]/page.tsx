'use client';

import React, { useEffect, useState } from 'react';
import { getProduct } from '@/services/product';
import { Card, Typography, Grid, ImageListItem, ImageList, Divider, Chip } from '@mui/material';
import Image from 'next/image';
import { productInterface } from '@/interfaces/product';

interface ProductPageProps {
    params: { productId: string };
}

const ProductPage = ({ params }: ProductPageProps) => {
    const [product, setProduct] = useState<productInterface | null>(null);

    useEffect(() => {
        getProductDetail();
    }, []);

    async function getProductDetail() {
        const resolvedParams = await params;
        const productId = resolvedParams.productId;
        const result = await getProduct(productId);
        console.log(result)
        setProduct(result);
    }

    if (!product) {
        return <>Error in Product Finding</>
    }

    return (
        <Grid
            container
            spacing={10} direction="column"
            sx={{
                // minHeight: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                p: 2,
            }}
        >
            <Grid columnSpacing={{ xs: 12, md: 6 }} sx={{ textAlign: 'center' }}>
                <Card sx={{ width: "100%", background: 'transparent', boxShadow: 'none', p: 2 }}>
                    <Typography variant="h4" sx={{ marginY: "5px" }}>{product.title}</Typography>
                    <Typography variant='h6'>
                        <Typography sx={{ textDecoration: "underline" }}>
                            Description
                        </Typography>
                        {product.description}
                    </Typography>
                    <Typography variant='h6'>
                        Price: &#8377;
                        {product.price} ({product.discountPercentage}% off)
                    </Typography>
                </Card>
            </Grid>
            <Grid columnSpacing={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center', position: "relative", width: "50%", height: "300px" }}>
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    // width="100"
                    // height={400}
                    fill
                    style={{ borderRadius: '8px' }}
                />
            </Grid>
            <Grid columnSpacing={{ xs: 12, md: 6 }}>
                <Typography variant='h5' sx={{ textAlign: "center", textDecoration: "underline" }}>Image Gallary</Typography>
                <ImageList variant="masonry" cols={3} gap={8}>
                    {product.images.map((item) => (
                        <ImageListItem key={item} >
                            <img
                                src={`${item}?auto=format`}
                                alt="Image description"
                                // fill
                                loading="lazy"
                                //  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
            <Grid columnSpacing={{ xs: 12, md: 6 }}>
                <Typography variant='h5' sx={{ textAlign: "center", textDecoration: "underline" }}>Product Tags</Typography>
                <Divider sx={{ marginY: "10" }}>
                    {
                        product.tags.map((tag) => {
                            return (
                                <Chip label={tag} key={tag} variant="outlined" />
                            )
                        })
                    }
                </Divider>
                <Typography variant='h5' sx={{ textAlign: "center", textDecoration: "underline" }}>Miscllaneous Information</Typography>
                <Typography variant='h5'>Shipping Info: {product.shippingInformation}</Typography>
                <Typography variant='h5'>Warranty Info: {product.warrantyInformation}</Typography>
                <Typography variant='h5'>Return Policy: {product.returnPolicy}</Typography>
            </Grid>
        </Grid>
    );
};

export default ProductPage;
