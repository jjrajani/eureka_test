import tmp from "tmp";
import fs from "node:fs";
import path from "path";
import moment from "moment";

const createTempFile = (fileContent) => {
  return new Promise((resolve, reject) => {
    try {
      const date = moment().format("MM_DD_YYYY");
      const tmpdir = path.join(__dirname, "..", "..", "..", "..", "/tmp", date);
      if (!fs.existsSync(tmpdir)) {
        fs.mkdirSync(tmpdir);
      }
      tmp.file(
        {
          postfix: ".pdf",
          tmpdir,
        },
        function _tempFileCreated(err, path, fd, cleanupCallback) {
          if (err) throw err;
          console.log("File: ", path);
          console.log("Filedescriptor: ", fd);
          fs.appendFile(path, fileContent);
          resolve(path);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

export default createTempFile;
