let multer = require("multer")
let { v4 } = require("uuid")
const prodmod = require("../models/productmodel")
const cartmodel = require("../models/cartmodel")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './prodimgs')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.mimetype.split("/")[1])
  }
})

const upload = multer({ storage: storage })

let add = async (req, res) => {
  try {
    let data = prodmod({ ...req.body, "pimg": req.file.filename, "_id": v4() })
    await data.save()
    res.json({ "message": "product added  successfully" })
  }
  catch (err) {
    res.json({ "message": "error in adding prod" })
  }
}

let getprod = async (req, res) => {
  try {
    let data = await prodmod.find()
    res.json(data)
  }
  catch (err) {
    res.json({ "message": "error in fetching product details" })
  }
}


let delprod = async (req, res) => {
  try {
    await prodmod.findByIdAndDelete({ "_id": req.params.id })
    res.send({ "message": "product deleted successfully" })
  }
  catch (err) {
    res.json({ "message": "error in product deletion" })
  }
}

let search = async (req, res) => {
  try {
    const sid = req.query.sid; // Get 'sid' from query parameters
    let products;
    if (sid && sid.trim() !== "") {
      products = await prodmod.find({ name: { $regex: sid, $options: "i" } });
    } else {
      products = await prodmod.find();
    }
    res.json(products);
  } catch (err) {
    res.json({ message: "Internal Server Error" });
  }
}

let edit = async (req, res) => {
  try {
    await prodmod.findByIdAndUpdate({ _id: req.body._id }, req.body)
    let data = { ...req.body };
    delete data["_id"];
    await cartmodel.updateMany({ "pid": req.body._id }, data)
    res.json({ message: "product details updated successfully" })
  }
  catch (err) {
    res.json({ message: "Error in updating product details" });
  }
}


let editimg = async (req, res) => {
  try {
    await prodmod.findByIdAndUpdate(
      { _id: req.body._id },
      { pimg: req.file.filename }
    );
    fs.rm(`./prodimgs/${req.body.oldimg}`, () => { });
    await cartmodel.updateMany({ pid: req.body._id }, { pimg: req.file.filename });
    res.json({ msg: "update done" });
  }
  catch (err) {
    res.json({ message: "error in updating image" })
  }
}

module.exports = { upload, add, getprod, delprod, search, edit, editimg }