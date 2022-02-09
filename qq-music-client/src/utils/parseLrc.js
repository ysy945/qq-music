function parseLrc(string) {
  const obj = {};
  string.split("\n").forEach((section) => {
    const result = section.split("]");
    if (result.length === 1 || result[1] === "") return;
    const key = result[0].slice(1, 6);
    if (obj[key]) {
      obj[key].push(result[1]);
    } else {
      obj[key] = [result[1]];
    }
  });
  delete obj[""];
  return obj;
}

export default parseLrc;
