import MailComposer from "nodemailer/lib/mail-composer";
import { DRESS_PDF_FILE_NAME } from "utils/constants";

export interface composeRawUserMessageArgs {
  fileLink: string;
  folderLink: string;
  userName: string;
}

const composeRawUserMessage = async ({
  fileLink,
  folderLink,
  userName,
}: composeRawUserMessageArgs) => {
  const mail = new MailComposer({
    from: "D.R.E.S.S. Planner <eurekanutrition@gmail.com>",
    to: `New Submission <jjrajani@gmail.com>`,
    text: `
      New D.R.E.S.S. Submission

      ${userName} has completed the D.R.E.S.S. form.

      Follow this link to view the user's google drive folder: ${folderLink}

      Follow this link to view the user's summary PDF: ${fileLink}
    `,
    subject: `New D.R.E.S.S. Submission - ${userName}`,
    textEncoding: "base64",
  });

  const message = await new Promise((resolve, reject) => {
    return mail.compile().build(async (error, msg) => {
      if (error) {
        console.log("error", error.message);
        reject(error);
      } else {
        const encodedMessage = Buffer.from(msg)
          .toString("base64")
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");
        resolve(encodedMessage);
      }
    });
  });

  return message;
};

export default composeRawUserMessage;