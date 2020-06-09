var admin = require("firebase-admin");

var serviceAccount = require("./../key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "team-falcon-b2727.appspot.com"
});


exports.storage = admin.storage()
exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`

/**
 * Copy file from local to a GCS bucket.
 * Uploaded file will be made publicly accessible.
 *
 * @param {string} localFilePath
 * @param {string} bucketName
 * @param {Object} [options]
 * @return {Promise.<string>} - The public URL of the uploaded file.
 */
exports.copyFileToGCS = (localFilePath, bucketName, options) => {
    options = options || {};
    const bucket = storage.bucket('team-falcon-b2727.appspot.com');

    const fileName = path.basename(localFilePath);
    const file = bucket.file(fileName);

    return bucket.upload(localFilePath, options)
        .then(() => file.makePublic())
        .then(() => exports.getPublicUrl(bucketName, gcsName));

}