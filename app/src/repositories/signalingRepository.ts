import { db } from '../services/firebaseConfig';
import {
    doc,
    setDoc,
    deleteDoc,
    onSnapshot,
    collection,
    addDoc,
    serverTimestamp,
    getDoc,
    updateDoc,
    query,
    where,
    QuerySnapshot,
    DocumentChange
} from 'firebase/firestore';

export interface SignalingData {
    from: string;
    to: string;
    offer?: any;
    answer?: any;
    status: 'idle' | 'calling' | 'connected' | 'ended' | 'rejected';
}

export const signalingRepository = {
    /**
     * Start a call by creating a call document
     */
    async initiateCall(fromId: string, toId: string, offer: any) {
        // Use a consistent ID for the call session between these two users
        // or a random ID. For simplicity, we can use callerId_calleeId
        const callId = `${fromId}_${toId}`;
        const callRef = doc(db, 'calls', callId);

        await setDoc(callRef, {
            from: fromId,
            to: toId,
            offer,
            status: 'calling',
            updatedAt: serverTimestamp()
        });

        // Clear any old candidates
        await this.clearCandidates(callId);

        return callId;
    },

    /**
     * Accept a call by providing an answer
     */
    async acceptCall(callId: string, answer: any) {
        const callRef = doc(db, 'calls', callId);
        await updateDoc(callRef, {
            answer,
            status: 'connected',
            updatedAt: serverTimestamp()
        });
    },

    /**
     * Reject or end a call
     */
    async updateCallStatus(callId: string, status: 'rejected' | 'ended') {
        const callRef = doc(db, 'calls', callId);
        await updateDoc(callRef, {
            status,
            updatedAt: serverTimestamp()
        });
    },

    /**
     * Add ICE candidate
     */
    async addIceCandidate(callId: string, senderId: string, candidate: any) {
        const candidatesRef = collection(db, 'calls', callId, 'candidates');
        await addDoc(candidatesRef, {
            ...candidate,
            senderId,
            createdAt: serverTimestamp()
        });
    },

    /**
     * Listen for incoming calls
     */
    subscribeToIncomingCalls(userId: string, onCall: (callId: string, data: SignalingData) => void) {
        const callsRef = collection(db, 'calls');
        const q = query(callsRef, where('to', '==', userId), where('status', '==', 'calling'));

        return onSnapshot(q, (snapshot: QuerySnapshot) => {
            snapshot.docChanges().forEach((change: DocumentChange) => {
                if (change.type === 'added' || change.type === 'modified') {
                    const data = change.doc.data() as SignalingData;
                    onCall(change.doc.id, data);
                }
            });
        });
    },

    /**
     * Listen for updates on a specific call (answer, status)
     */
    subscribeToCallUpdates(callId: string, onUpdate: (data: SignalingData) => void) {
        const callRef = doc(db, 'calls', callId);
        return onSnapshot(callRef, (doc) => {
            if (doc.exists()) {
                onUpdate(doc.data() as SignalingData);
            }
        });
    },

    /**
     * Listen for new ICE candidates
     */
    subscribeToIceCandidates(callId: string, userId: string, onCandidate: (candidate: any) => void) {
        const candidatesRef = collection(db, 'calls', callId, 'candidates');
        return onSnapshot(candidatesRef, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const data = change.doc.data();
                    // Don't listen to our own candidates
                    if (data.senderId !== userId) {
                        onCandidate(data);
                    }
                }
            });
        });
    },

    async clearCandidates(callId: string) {
        // Implementation for clearing subcollection if needed
        // For simple demo, we can just rely on new call sessions
    }
};
