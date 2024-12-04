// // twiller/src/context/firebaseHelpers.js
// import { getFirestore, doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';

// const db = getFirestore();

// export const canRequestPasswordReset = async (email) => {
//     const docRef = doc(db, "passwordResets", email);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//         const data = docSnap.data();
//         const lastRequest = data.timestamp.toDate();
//         const now = new Date();
//         const oneDay = 24 * 60 * 60 * 1000;
//         return (now - lastRequest) > oneDay;
//     } else {
//         return true;
//     }
// };

// export const logPasswordResetRequest = async (email) => {
//     await setDoc(doc(db, "passwordResets", email), {
//         timestamp: Timestamp.fromDate(new Date())
//     });
// };
import mongoose from "mongoose";

// MongoDB Password Reset Schema
const passwordResetSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    timestamp: { type: Date, required: true },
});

const PasswordReset = mongoose.model("PasswordReset", passwordResetSchema);

// Check if a user can request a password reset (24-hour restriction)
export const canRequestPasswordReset = async (email) => {
    const record = await PasswordReset.findOne({ email });
    if (record) {
        const lastRequest = new Date(record.timestamp);
        const now = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        return now - lastRequest > oneDay;
    }
    return true;
};

// Log a password reset request
export const logPasswordResetRequest = async (email) => {
    const now = new Date();
    const existingRecord = await PasswordReset.findOne({ email });

    if (existingRecord) {
        existingRecord.timestamp = now;
        await existingRecord.save();
    } else {
        await PasswordReset.create({ email, timestamp: now });
    }
};
