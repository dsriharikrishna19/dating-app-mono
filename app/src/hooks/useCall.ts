import { useState, useCallback, useEffect, useRef } from "react";
import { webRTCService } from "../services/webrtc.service";
import { signalingRepository, SignalingData } from "../repositories/signalingRepository";

export type CallStatus = "idle" | "calling" | "incoming" | "connected" | "ended";

export const useCall = (userId: string, targetUserId?: string, initialVideoOff: boolean = false) => {
    const [status, setStatus] = useState<CallStatus>("idle");
    const [localStream, setLocalStream] = useState<any | null>(null);
    const [remoteStream, setRemoteStream] = useState<any | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(initialVideoOff);
    const [incomingOffer, setIncomingOffer] = useState<any | null>(null);

    const callIdRef = useRef<string | null>(null);
    const remoteUserIdRef = useRef<string | null>(targetUserId || null);
    const subscriptionsRef = useRef<(() => void)[]>([]);

    useEffect(() => {
        // Subscribe to incoming calls
        const unsubscribeIncoming = signalingRepository.subscribeToIncomingCalls(userId, (callId, data) => {
            if (status !== "idle") return; // Already in a call

            console.log("Receiving call from:", data.from);
            callIdRef.current = callId;
            remoteUserIdRef.current = data.from;
            setIncomingOffer(data.offer);
            setStatus("incoming");

            // Start listening for call updates and candidates
            setupCallListeners(callId);
        });

        subscriptionsRef.current.push(unsubscribeIncoming);

        return () => {
            cleanup();
        };
    }, [userId]);

    const setupCallListeners = useCallback((callId: string) => {
        // Listen for call updates (answer, etc.)
        const unsubscribeUpdates = signalingRepository.subscribeToCallUpdates(callId, async (data) => {
            if (data.status === "ended" || data.status === "rejected") {
                console.log("Call status updated:", data.status);
                cleanup();
                return;
            }

            if (data.answer && status === "calling") {
                console.log("Call answered");
                await webRTCService.setRemoteDescription(data.answer);
                setStatus("connected");
            }
        });

        // Listen for ICE candidates
        const unsubscribeCandidates = signalingRepository.subscribeToIceCandidates(callId, userId, async (candidate) => {
            console.log("Received ICE candidate");
            await webRTCService.addIceCandidate(candidate);
        });

        subscriptionsRef.current.push(unsubscribeUpdates, unsubscribeCandidates);
    }, [userId, status, webRTCService]);

    const cleanup = useCallback(() => {
        webRTCService.close();

        // Unsubscribe all Firestore listeners
        subscriptionsRef.current.forEach(unsubscribe => unsubscribe());
        subscriptionsRef.current = [];

        setLocalStream(null);
        setRemoteStream(null);
        setStatus("idle");
        setIncomingOffer(null);
        callIdRef.current = null;
    }, []);

    const onIceCandidate = useCallback((candidate: any) => {
        if (callIdRef.current) {
            signalingRepository.addIceCandidate(callIdRef.current, userId, candidate);
        }
    }, [userId]);

    const onTrack = useCallback((stream: any) => {
        setRemoteStream(stream);
    }, []);

    const startCall = useCallback(async () => {
        if (!remoteUserIdRef.current) return;

        setStatus("calling");
        try {
            const stream = await webRTCService.getLocalStream();
            setLocalStream(stream);

            webRTCService.createPeerConnection(onIceCandidate, onTrack);
            const offer = await webRTCService.createOffer();

            const callId = await signalingRepository.initiateCall(userId, remoteUserIdRef.current, offer);
            callIdRef.current = callId;
            setupCallListeners(callId);
        } catch (error) {
            console.error("Failed to start call:", error);
            setStatus("idle");
        }
    }, [userId, onIceCandidate, onTrack, setupCallListeners]);

    const acceptCall = useCallback(async () => {
        if (!callIdRef.current || !incomingOffer) return;

        try {
            const stream = await webRTCService.getLocalStream();
            setLocalStream(stream);

            webRTCService.createPeerConnection(onIceCandidate, onTrack);
            const answer = await webRTCService.createAnswer(incomingOffer);

            await signalingRepository.acceptCall(callIdRef.current, answer);
            setStatus("connected");
        } catch (error) {
            console.error("Failed to accept call:", error);
            cleanup();
        }
    }, [incomingOffer, onIceCandidate, onTrack, cleanup]);

    const rejectCall = useCallback(async () => {
        if (callIdRef.current) {
            await signalingRepository.updateCallStatus(callIdRef.current, 'rejected');
        }
        cleanup();
    }, [cleanup]);

    const endCall = useCallback(async () => {
        if (callIdRef.current) {
            await signalingRepository.updateCallStatus(callIdRef.current, 'ended');
        }
        cleanup();
    }, [cleanup]);

    const toggleMute = useCallback(() => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        webRTCService.toggleMute(newMuted);
    }, [isMuted]);

    const toggleVideo = useCallback(() => {
        const newVideoOff = !isVideoOff;
        setIsVideoOff(newVideoOff);
        webRTCService.toggleVideo(newVideoOff);
    }, [isVideoOff]);

    const switchCamera = useCallback(() => {
        webRTCService.switchCamera();
    }, []);

    return {
        status,
        localStream,
        remoteStream,
        isMuted,
        isVideoOff,
        startCall,
        acceptCall,
        rejectCall,
        endCall,
        toggleMute,
        toggleVideo,
        switchCamera,
    };
};

