const ProductModel = require("../model/Product");
const Rating=require("../model/Rating")
exports.createProduct = async (req, res, next) => {
  let { name, category, description, price, quantity, imageUrl } =
    req.body;
  try {
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    const product = await ProductModel.create({
      name,
      description,
      category,
      price,
      quantity,
      imageUrl,
    });
    res.status(201).json({
      message: "product create successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.find();
    res.status(200).json( product );
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      const error = new Error("product does not exits");
      error.statusCode = 400;
      throw error;
    }
    const ratings=await Rating.find({id})
    let averageRating = 0;
    if (ratings.length > 0) {
      const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
      averageRating = sum / ratings.length;
    }
    const response = {
      ...product.toObject(),
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalRatings: ratings.length,
      outOf5: 5,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.updateProductById = async (req, res, next) => {
  const { id } = req.params;
  const { name, category, description, price, quantity, imageurl } = req.body;
  try {
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    const product = await ProductModel.findById(id);
    if (!product) {
      const error = new error("product does not exits");
      error.statusCode = 400;
      throw error;
    }
    const updateProduct = await ProductModel.updateone(
      { _id: id },
      {
        $set: {
          name,
          category,
          description,
          price,
          quantity,
          imageurl,
        },
      }
    );
    res
      .status(202)
      .json({ message: "product:updated", product: updatedProduct });
  } catch (error) {
    next(error);
  }
};
exports.deleteProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteProduct = await ProductModel.findByIdAndDelete(id);
    if (!deleteProduct) {
      const error = new Error("product does not found");
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
