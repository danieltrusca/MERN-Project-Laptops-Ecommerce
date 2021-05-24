const Sub = require("../models/Sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const sub = await new Sub({
      name,
      slug: slugify(name),
      parent,
    }).save();
    res.json(sub);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create sub-category failed");
  }
};

exports.list = async (req, res) => {
  try {
    const subs = await Sub.find({}).sort({ createdAt: -1 }).exec();
    res.json(subs);
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to load sub-categories list");
  }
};

exports.update = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), parent },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to update the sub-category");
  }
};

exports.read = async (req, res) => {
  try {
    let sub = await Sub.findOne({ slug: req.params.slug }).exec();
    res.json(sub);
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to show the sub-category");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to delete the sub-category");
  }
};
