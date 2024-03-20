const conf = {
    appwriteUrl: String(process.env.REACT_APP_APPWRITE_URL),
    appwriteProjectId: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(process.env.REACT_APP_APPWRITE_BUCKET_ID),
    tinymceapikey:String(process.env.REACT_APP_TINYMCE_KEY),
}
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf