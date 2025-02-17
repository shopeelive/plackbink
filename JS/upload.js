export const onUpload = (file, storageRef, progressCallback) => {
    return new Promise((resolve, reject) => {
        try {
            const uploadTask = storageRef.put(file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    progressCallback(progress);
                },
                (error) => {
                    console.error("Upload failed:", error);
                    reject(error);
                },
                async () => {
                    const link = await uploadTask.snapshot.ref.getDownloadURL();
                    const size = (file.size / 1024).toFixed(2);
                    const fileName = file.name; // File name is here
                    progressCallback("DONE");
                    resolve({ link, size, fileName });
                }
            );
        } catch (error) {
            console.error("Upload failed:", error);
            reject(error);
        }
    });
};
