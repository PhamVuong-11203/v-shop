import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';
// list products

const listProducts = (req, res) => {

}

// get product by id
const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, product });
        console.log(product);
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
 }


// add product
const addProduct = async (req, res) => {

    try {
        const { name, price, description, category,
            subCategory, sizes, bestseller
        } = req.body;
        const image1 = req.files.images1 && req.files.images1[0]
        const image2 = req.files.images2 && req.files.images2[0]
        const image3 = req.files.images3 && req.files.images3[0]
        const image4 = req.files.images4 && req.files.images4[0]

        const images = [image1, image2, image3, image4].filter(image => image !== undefined)

        let imageUrls = await Promise.all(
            images.map(async (image) => {
                const result = await cloudinary.uploader.upload(image.path, {
                    folder: 'products',
                    resource_type: 'image'
                });
                return result.secure_url;
            })
        );

        const productData = new productModel({
            name,
            price: Number(price),
            description,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === 'true' ? true : false,
            image: imageUrls
        });

        const product = await productData.save();
        res.json({ success: true, message: "Product added successfully", product });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}

// remove product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await productModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update product
const updateProduct = (req, res) => { }


export { listProducts, addProduct, removeProduct, updateProduct, getProductById };