const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, err, (data) => {
      if (err) reject("File not found!!!");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write the file!!");
      resolve("success");
    });
  });
};

readFilePro(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
  console.log("Bread: ", data);

  return superagent.get(`https://dog.ceo/api/breeds/${data}/image/random`);
})
  .then((res) => {
    console.log(res.body.message);

    fs.writeFile("dog-image.text", res.body.message, (err) => {
      if (err) return console.log(err.message);
      console.log("Random dog image saved to file!");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
