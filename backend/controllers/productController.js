const Product = require("../models/productSchema");
const readSheet = require("read-excel-file/node");

// Create Product
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

// All Products
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

// Delete Product
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

// Category wise product
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

// Sub category wise products
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

// Owner wise products
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

let bulkProductUpload = async (req, res) => {
  console.log("hello", req.file);
  const { objects, errors } = await readSheet(req.file.path, { schema });

  if (errors) {
    return res.status(400).json({
      success: false,
      message: "Please upload valid information",
      errors: errors,
    });
  }
  const products = objects.map((item) => {
    return {
      ...item,
      slug: product.slug
        ? item.slug
        : item.title.toLowerCase().split(" ").join("-"),
      sku: item.sku
        ? item.sku
        : `eco-${item.title.substring(0, 4)}-${Date.now()}`,
      images: [
        {
          url: item.images,
          isMain: false,
        },
      ],
    };
  });

  console.log(products);

  await Product.insertMany(products);

  res.status(201).json({
    success: true,
    message: "All product upload successfully",
  });
};

// Update product controller
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const exProduct = await Product.findOne({ _id: id });

  if (!exProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  if (req.body.sku || req.body.slug) {
    return res.status(400).json({
      success: false,
      message: "SKU or Slug are not update",
    });
  }

  const images = [...exProduct.images];

  if (req.files) {
    req.files.map((item) => {
      images.push({
        url: item.path,
        isMain: false,
      });
    });
  }

  exProduct.images = images;

  await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (req.body.deleteImage) {
    exProduct.images[0].isMain = true;
    exProduct.images.splice(req.body.deleteImage, 1);
  }

  if (req.body.isMain) {
    exProduct.images.map((item) => {
      item.isMain = false;
    });
    exProduct.images[req.body.isMain].isMain = true;
  }

  await exProduct.save();

  res.status(200).json({
    success: true,
    message: "Product updated",
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
  updateProduct,
};
