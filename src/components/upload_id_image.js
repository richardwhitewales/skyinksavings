export async function uploadIDImage(email, frontImage, backImage) {
    if (frontImage && backImage) {

        try {
            const frontRef = ref(storage, `id/${frontImage.name}`);
            const backRef = ref(storage, `id/${backImage.name}`);

            await uploadBytes(frontRef, frontImage);
            await uploadBytes(backRef, backImage);

            const frontUrl = await getDownloadURL(frontRef);
            const backUrl = await getDownloadURL(backRef);

            const docRef = doc(db, 'users', email);

            await updateDoc(docRef, { "frontID": frontUrl, "backID": backUrl });

        } catch (error) {
            console.error("Error uploading ID images: ", error);
        }
    } else {
        console.error("Error");
    }
}
