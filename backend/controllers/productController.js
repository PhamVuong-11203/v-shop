
// list products

const listProducts = (req, res) => {

}

// add product
const addProduct = (req, res) => {

    try {
        const { name, price, description, category,
            subcategory, sizes, bestseller
        } = req.body;
        const image1 = req.files.images1[0]
        const image2 = req.files.images2[0]
        const image3 = req.files.images3[0]
        const image4 = req.files.images4[0]

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}

// remove product
const removeProduct = (req, res) => { }

// update product
const updateProduct = (req, res) => { }

// get product by id
const getProductById = (req, res) => { }

export { listProducts, addProduct, removeProduct, updateProduct, getProductById };