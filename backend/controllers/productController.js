const Product = require("../models/productSchema");
const readSheet = require("read-excel-file/node");

// create product
const createProduct = async (req, res) => {
  let {
    title,
    description,
    shortDescription,
    price,
    discount,
    brand,
    category,
    subCategory,
    isMain,
    owner,
  } = req.body;

  if (
    !title ||
    !description ||
    !shortDescription ||
    !price ||
    !discount ||
    !brand ||
    !category ||
    !subCategory
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }

  let images = [];

  req.files.map((item, index) => {
    images.push({
      url: item.path,
      isMain: index == isMain ? true : false,
    });
  });

  let slug = title.toLowerCase().split(" ").join("-");

  let existingProductSlug = await Product.findOne({ slug });
  if (existingProductSlug) {
    return res.status(400).json({
      success: false,
      message: "This product already exist",
    });
  }

  let sku = `eco-${Date.now()}`;

  let existingSku = await Product.findOne({ sku });
  if (existingSku) {
    return res.status(400).json({
      success: false,
      message: "This product already exist",
    });
  }

  let product = await new Product({
    title,
    description,
    shortDescription,
    price,
    discount,
    brand,
    category,
    subCategory,
    slug,
    sku,
    images,
    owner,
  }).save();

  res.status(201).json({
    success: true,
    message: "Product Created",
    product: product,
  });
};

// all products
const allProducts = async (req, res) => {
  let allProducts = await Product.find({}).populate([
    "category",
    "subCategory",
    "owner",
  ]);

  return res.status(200).json({
    success: true,
    message: "All products",
    count: allProducts.length,
    product: allProducts,
  });
};

// delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Product deleted",
    data: deletedProduct,
  });
};

// category wise product
const categoryWiseProduct = async (req, res) => {
  const { id } = req.params;

  let products = await Product.find({ category: id });

  return res.status(200).json({
    success: true,
    message: "Category wise product",
    count: products.length,
    product: products,
  });
};

// sub category wise products
const subCategoryWiseProduct = async (req, res) => {
  const { id } = req.params;

  let products = await Product.find({ subCategory: id });

  return res.status(200).json({
    success: true,
    message: "Subcategory wise product",
    count: products.length,
    product: products,
  });
};

// owner wise products
const ownerWiseProduct = async (req, res) => {
  const { id } = req.params;

  let products = await Product.find({ owner: id });

  return res.status(200).json({
    success: true,
    message: "Owner wise product",
    count: products.length,
    product: products,
  });
};

// Bulk product upload
const schema = {
  title: {
    column: "title",
    type: String,
  },
  description: {
    column: "description",
    type: String,
  },
  shortDescription: {
    column: "shortDescription",
    type: String,
  },
  price: {
    column: "price",
    type: Number,
  },
  images: {
    url: {
      column: "images.url",
      type: String,
    },
    isMain: {
      column: "images.isMain",
      type: Boolean,
    },
  },
  discount: {
    column: "discount",
    type: Number,
  },
  stock: {
    column: "stock",
    type: Number,
  },
  status: {
    column: "status",
    type: String,
  },
  sku: {
    column: "sku",
    type: String,
  },
  slug: {
    column: "slug",
    type: String,
  },
};

const bulkProductUpload = async (req, res) => {
  const { objects, errors } = await readSheet(req.file.path, { schema });

  let products = [];

  objects.map((product) => {
    products.push({
      ...product,
      slug: product.slug
        ? product.slug
        : product.title.toLowerCase().split(" ").join("-"),
      sku: product.sku
        ? product.sku
        : `eco-${product.title.substring(0, 4)}-${Date.now()}`,
      images: [{ url: product.images, isMain: true }],
    });
  });

  await Product.insertMany(products);

  res.status(200).json({
    success: true,
    message: "All product upload done",
  });
};

module.exports = {
  createProduct,
  allProducts,
  deleteProduct,
  categoryWiseProduct,
  subCategoryWiseProduct,
  ownerWiseProduct,
  bulkProductUpload,
};
