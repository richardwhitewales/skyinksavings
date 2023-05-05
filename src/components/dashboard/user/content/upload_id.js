import styles from '@/components/dashboard/Content.module.css'
import { uploadIDImage } from '@/components/upload_id_image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { auth, db } from "@/firebase/fire_config";
import { doc, getDoc } from 'firebase/firestore';

export default function UploadID() {
    const [user, setUser] = useState(null);
    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const user = auth.currentUser;

        if (user) {
            const profileRef = doc(db, 'users', user.email);
            getDoc(profileRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        setUser(docSnapshot.data());
                    } else {
                        console.log('Profile not found');
                    }
                })
                .catch((error) => {
                    console.log('Error getting profile:', error);
                });
        }
    }, []);

    if (!user) {
        return <div className={styles.process} />
    }

    const handleFrontImageChange = (event) => {
        setFrontImage(event.target.files[0]);
    };

    const handleBackImageChange = (event) => {
        setBackImage(event.target.files[0]);
    };

    const handleUpload = event => {
        event.preventDefault();

        uploadIDImage(user.email, frontImage, backImage).then(() => { setDone(true); });
    };

    return (
        <div className={styles.content}>
            <form onSubmit={handleUpload}>
                <div className="row justify-content-center mt-5">
                    {done && <div className="alert alert-success">ID Added!</div>}

                    <div className="col-sm-6 text-center">
                        <p>Upload Front ID Image</p>
                        <div >
                            <label htmlFor="fileInput" >
                                <span className={styles.file_input_icon}>
                                    <FontAwesomeIcon icon={faCloudUploadAlt} size="4x" />
                                </span>
                            </label>
                            <input type="file" id="fileInput" required className={styles.file_input} onChange={handleFrontImageChange} />
                        </div>
                    </div>
                    <div className="col-sm-6 text-center">
                        <p>Upload Back ID Image</p>
                        <div >
                            <label htmlFor="fileInput2" >
                                <span className={styles.file_input_icon}>
                                    <FontAwesomeIcon icon={faCloudUploadAlt} size="4x" />
                                </span>
                            </label>
                            <input type="file" id="fileInput2" required className={styles.file_input} onChange={handleBackImageChange} />
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center position-relative" style={{ marginTop: "10rem" }}>
                    <div className="col-12 text-center position-absolute">
                        <button className="btn btn-lg btn-dark">Upload</button>
                    </div>
                </div>
            </form>

            <div style={{ marginBottom: "150px" }}></div>
        </div>
    )
}
