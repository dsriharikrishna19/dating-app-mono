import { db } from '../services/firebaseConfig';
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    serverTimestamp,
    collection,
    query,
    where,
    getDocs
} from 'firebase/firestore';

export const userRepository = {
    /**
     * Save or update a user profile in Firestore
     * @param userData User profile data from onboarding or settings
     */
    async saveUser(userData: any) {
        if (!userData.mobile) {
            throw new Error("Mobile number is required for user identification.");
        }

        const userRef = doc(db, 'users', userData.mobile);
        await setDoc(userRef, {
            ...userData,
            updatedAt: serverTimestamp(),
            // Add createdAt only if it doesn't exist (handled by setDoc with merge or explicit check)
        }, { merge: true });

        // Ensure createdAt exists
        const snap = await getDoc(userRef);
        if (snap.exists() && !snap.data().createdAt) {
            await updateDoc(userRef, {
                createdAt: serverTimestamp()
            });
        }
    },

    /**
     * Get a user profile by mobile number
     * @param mobile User's mobile number
     */
    async getUserByMobile(mobile: string) {
        const userRef = doc(db, 'users', mobile);
        const snap = await getDoc(userRef);
        return snap.exists() ? snap.data() : null;
    },

    /**
     * Get all users (placeholder for discovery/matches)
     */
    async getAllUsers() {
        const usersRef = collection(db, 'users');
        const snap = await getDocs(usersRef);
        return snap.docs.map(doc => doc.data());
    }
};
