const Share = require("../models/Share");
const Content = require("../models/Content");
const { v4: uuidv4 } = require("uuid");

exports.createShare = async (req, res) => {
  const { id } = req.params;

  const shareId = uuidv4();

  await Share.create({
    contentId: id,
    shareId,
  });

  res.json({ shareUrl: `/share/${shareId}` });
};

exports.getSharedContent = async (req, res) => {
  const { id } = req.params;

  const share = await Share.findOne({ shareId: id });
  if (!share) return res.status(404).json({ message: "Not found" });

  const content = await Content.findById(share.contentId);

  res.json(content);
};
