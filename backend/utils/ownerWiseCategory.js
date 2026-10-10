let Cat = require("../models/categorySchema");
let SubCat = require("../models/subCategorySchema");

let promiseOwnerCategory = async (id) => {
  // promise start
  let data = await Cat.find({ owner: id }).lean();
  let promise = new Promise(function (resolve, reject) {
    let cat = [];
    data.map(async (item) => {
      try {
        let allData = await SubCat.find({ parentCategory: item._id });
        cat.push({
          ...item,
          subCategory: allData,
        });
        if (data.length == cat.length) {
          resolve(cat);
        }
      } catch (error) {
        reject(error);
      }
    });
  });

  promise
    .then((value) => {
      return res.status(200).json({
        success: true,
        message: "All owner wise category",
        data: value,
      });
    })
    .catch((error) => {
      console.log(error);
    });

  // promise end
};

module.exports = promiseOwnerCategory;
