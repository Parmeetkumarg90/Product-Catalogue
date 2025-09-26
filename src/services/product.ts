// get paginated products
const getAllProducts = async (skip: number) => {
    try {
        const result = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`);
        // console.log(result);
        const processedData = await result.json();
        return processedData;
    }
    catch (err) {
        console.log("Error in searching product: ", err);
        return [];
    }
}

// get specific product
const getProduct = async (productId: string) => {
    try {
        const result = await fetch(`https://dummyjson.com/products/${productId}`);
        const processedData = await result.json();
        return processedData;
    }
    catch (err) {
        console.log("Error in searching product: ", err);
        return {};
    }
}

// get category product
const searchProduct = async (productName: string, skip: number) => {
    try {
        const result = await fetch(`https://dummyjson.com/products/search?q=${productName}&limit=10&skip=${skip}`);
        const processedData = await result.json();
        return processedData;
    }
    catch (err) {
        console.log("Error in searching product: ", err);
        return [];
    }
}

export { getAllProducts, getProduct, searchProduct };