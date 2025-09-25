interface productInterface {
    id: number,
    title: string,
    description: string,
    category: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    tags: string[],
    brand: string,
    sku: string,
    weight: number,
    dimensions: { width: number, height: number, depth: number },
    warrantyInformation: string,
    shippingInformation: string,
    availabilityStatus: string,
    reviews: reviewInterface[],
    returnPolicy: string,
    minimumOrderQuantity: number,
    meta: {
        createdAt: string,
        updatedAt: string,
        barcode: string,
        qrCode: string
    },
    images: string[],
    thumbnail: string,
    quantity?: number,
}

interface reviewInterface {
    rating: number,
    comment: string,
    date: string,
    reviewerName: string,
    reviewerEmail: string
}

export type { productInterface, reviewInterface };