const defaultResponse = ({ res, success, message, data }) => {
  if (!res) {
    return console.error("Error: response object can't be falsy", res);
  }
  if (success === undefined) {
    return console.error("Error: success can't be undefined");
  }
  if (success === false && !message) {
    return console.error(
      "Error: when response isn't success, message can't be falsy",
      message
    );
  }
  if (success === false && message) {
    return res.json({ success, message });
  }
  if (success && data) {
    return res.json(success, data);
  }
  if (success && message) {
    return res.json({ success, message });
  }
  return "Something wrong on defaultResponse function";
};

module.exports = { defaultResponse };
