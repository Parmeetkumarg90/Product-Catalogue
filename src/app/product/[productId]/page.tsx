'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { productInterface } from '@/interfaces/product';
import { getProduct } from '@/services/product';

const ProductPage = () => {
    // const processedParams = 
    // const product = JSON.parse(params.value);
    const url = useParams();
    const [productData, setProductData] = useState<productInterface | {}>({});

    useEffect(() => {
        getProductDetail();
    }, []);

    async function getProductDetail() {
        const result = await getProduct(toString(url.productId));
        console.log(result);
    }

    return (
        <div>Product Page {url.productId}</div>
    )
}

export default ProductPage;