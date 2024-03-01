const footwearModel = require("../../models/footwears");

// find footwears
async function footWear(req, res) {
  try {
    const find = await footwearModel.find();
    res.send(find);
  } catch (err) {
    console.log(err);
  }
}

// add footwears
async function addFootwear(req, res) {
  try {
    const {
      categoryId,
      productId,
      cost,
      image,
      rating,
      productName,
      type,
      offer,
      description,
      details,
      gallery,
    } = req.body;
    const exising = await footwearModel.findOne({ productId });
    if (exising) {
      return res.send({ success: false, message: "Already existing" });
    }
    const create = await footwearModel.create({
      categoryId,
      productId,
      cost,
      image,
      rating,
      productName,
      type,
      offer,
      description,
      details,
      gallery,
    });
    res.send(create);
  } catch (err) {
    res.send({ success: false, message: "server error" });
  }
}

// delete footwears
async function deleteFootwear(req, res) {
  const { productId } = req.body;

  const exising = await footwearModel.findOne({ productId });
  if (!exising) {
    return res.send({ success: false, message: "product not existing" });
  }
  try {
    const deleteFootwear = await footwearModel.deleteOne({ productId });
    res.send({ success: true, message: "product delete success" });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: "server error", err });
  }
}
module.exports = { footWear, addFootwear, deleteFootwear };
