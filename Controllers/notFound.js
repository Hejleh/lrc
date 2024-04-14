const notFound = (req, res) => {
  console.log("404 Not Found");
  res.status(404).json({ error: "404 Not Found" });
};

module.exports = {
  notFound,
};
