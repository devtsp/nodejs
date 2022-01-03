const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf-8"
    );
    console.log(data);
    await fsPromises.unlink(
      path.join(__dirname, "files", "starter.txt")
    );
    
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nNice to be here."
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseComplete.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseComplete.txt"),
      "utf-8"
    );
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
};

fileOps();

// fs.readFile(
//   path.join(__dirname, 'files', 'starter.txt'),
//   'utf8',
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });
