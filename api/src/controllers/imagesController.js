import Image from "../models/Image.js";
import cloudinary from "../helpers/cloudinary.js";
import { default as deleteFilefromFS } from "../helpers/fileManager.js";
import { findAllGames } from "./gamesController.js";

export const imageGet = async (req, res) => {
  console.log(req);
  res.status(200).json({ message: "Images Get" });
};

export const imageGetById = async (req, res) => {
  const { id } = req.params;
  console.log(req);
  res.status(200).json({ message: "Images GetById" });
};

export const imageAdd = async (req, res) => {};
// multiple images
//   try {
//     const files = req.files;
//     const images = [];
//     for (const file of files) {
//       addImage(req, file, `$`)
//       ulrs.push(newPath);
//       fs.unlinkSync(path);
//     }
//     res.status(200).json({ message: "Images uploaded successfully", data: urls });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error uploading images" });
//   }
// };

// export const imageModify = async (req, res) => {
//   const { id } = req.params;
//   console.log(req);
//   res.status(200).json({ message: "Images Modify" });
// };

// export const imageDelete = async (req, res) => {
//   const { id } = req.params;
//   /*cloudinary.v2.uploader.destroy(public_id, options).then(callback);*/
//   console.log(req);
//   res.status(200).json({ message: "Images Delete" });
// };

// /// Eager Transformations:
// // Applied as soon as the file is uploaded, instead of lazily applying them when accessed by your site's visitors.
// var eager_options = {
//   width: 200, height: 150, crop: 'scale', format: 'jpg'
// };
// cloudinary.uploader.upload("lake.jpg", { tags: "basic_sample", public_id: "blue_lake", eager: eager_options }, function (err, image) {
//   // "eager" parameter accepts a hash (or just a single item). You can pass
//   // named transformations or transformation parameters as we do here.
//   console.log();
//   console.log("** Eager Transformations");
//   if (err) { console.warn(err); }
//   console.log("* " + image.public_id);
//   console.log("* " + image.eager[0].url);
//   waitForAllUploads("lake", err, image);
// });

// UPLOAD ON CLOUDINARY ONE FILE

export const addImage = async (req, namePattern, description) => {
  const imagefile = req.file.path;
  try {
    const result = await cloudinary.uploader.upload(imagefile, {
      public_id: namePattern
    });
    console.log(result);
    if (result) {
      const newImage = new Image({
        public_id: result.public_id,
        path: result.url,
        alternativeText: description
      });

      const savedImage = await newImage.save();
      deleteFilefromFS(imagefile, req);
      console.log("saved image", savedImage);
      return { image: { _id: savedImage._id, path: savedImage.path } };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteImage = async id => {
  try {
    const result = await cloudinary.uploader.destroy(id);
    console.log(result);
    return { result };
  } catch (err) {
    console.log(err);
    return err;
  }
};
