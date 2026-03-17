import { Platform } from "react-native";

// Conditional types for WebRTC
let RTCPeerConnectionNative: any;
let RTCIceCandidateNative: any;
let RTCSessionDescriptionNative: any;
let mediaDevicesNative: any;

if (Platform.OS !== "web") {
    try {
        const WebRTC = require("react-native-webrtc");
        RTCPeerConnectionNative = WebRTC.RTCPeerConnection;
        RTCIceCandidateNative = WebRTC.RTCIceCandidate;
        RTCSessionDescriptionNative = WebRTC.RTCSessionDescription;
        mediaDevicesNative = WebRTC.mediaDevices;
    } catch (e) {
        console.error("Failed to load react-native-webrtc", e);
    }
} else {
    // On web, use global browser APIs
    RTCPeerConnectionNative = (window as any).RTCPeerConnection;
    RTCIceCandidateNative = (window as any).RTCIceCandidate;
    RTCSessionDescriptionNative = (window as any).RTCSessionDescription;
    mediaDevicesNative = navigator.mediaDevices;
}

const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

class WebRTCService {
    private peerConnection: any = null;
    private localStream: any = null;
    private remoteStream: any = null;

    async getLocalStream() {
        try {
            const stream = await mediaDevicesNative.getUserMedia({
                audio: true,
                video: {
                    facingMode: "user",
                },
            });
            this.localStream = stream;
            return stream;
        } catch (error) {
            console.error("Error getting local stream:", error);
            throw error;
        }
    }

    createPeerConnection(
        onIceCandidate: (candidate: any) => void,
        onTrack: (stream: any) => void
    ) {
        this.peerConnection = new RTCPeerConnectionNative(configuration);

        this.peerConnection.onicecandidate = (event: any) => {
            if (event.candidate) {
                onIceCandidate(event.candidate);
            }
        };

        this.peerConnection.ontrack = (event: any) => {
            console.log("On Track event:", event);
            if (event.streams && event.streams[0]) {
                this.remoteStream = event.streams[0];
                onTrack(event.streams[0]);
            } else if (event.track) {
                // Some browsers might provide track instead of streams[0]
                if (!this.remoteStream) {
                    this.remoteStream = new (window as any).MediaStream();
                    onTrack(this.remoteStream);
                }
                this.remoteStream.addTrack(event.track);
            }
        };

        if (this.localStream) {
            this.localStream.getTracks().forEach((track: any) => {
                this.peerConnection?.addTrack(track, this.localStream!);
            });
        }

        return this.peerConnection;
    }

    async createOffer() {
        if (!this.peerConnection) return;
        try {
            const offer = await this.peerConnection.createOffer();
            await this.peerConnection.setLocalDescription(offer);
            return offer;
        } catch (error) {
            console.error("Error creating offer:", error);
        }
    }

    async createAnswer(offer: any) {
        if (!this.peerConnection) return;
        try {
            await this.peerConnection.setRemoteDescription(
                new RTCSessionDescriptionNative(offer)
            );
            const answer = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);
            return answer;
        } catch (error) {
            console.error("Error creating answer:", error);
        }
    }

    async setRemoteDescription(answer: any) {
        if (!this.peerConnection) return;
        try {
            await this.peerConnection.setRemoteDescription(
                new RTCSessionDescriptionNative(answer)
            );
        } catch (error) {
            console.error("Error setting remote description:", error);
        }
    }

    async addIceCandidate(candidate: any) {
        if (!this.peerConnection) return;
        try {
            await this.peerConnection.addIceCandidate(
                new RTCIceCandidateNative(candidate)
            );
        } catch (error) {
            console.error("Error adding ICE candidate:", error);
        }
    }

    close() {
        if (this.localStream) {
            this.localStream.getTracks().forEach((track: any) => track.stop());
            this.localStream = null;
        }
        if (this.peerConnection) {
            this.peerConnection.close();
            this.peerConnection = null;
        }
        this.remoteStream = null;
    }

    toggleMute(isMuted: boolean) {
        this.localStream?.getAudioTracks().forEach((track: any) => {
            track.enabled = !isMuted;
        });
    }

    toggleVideo(isVideoOff: boolean) {
        this.localStream?.getVideoTracks().forEach((track: any) => {
            track.enabled = !isVideoOff;
        });
    }

    switchCamera() {
        if (Platform.OS === "web") {
            console.log("Switch camera not implemented for web yet");
        } else {
            this.localStream?.getVideoTracks().forEach((track: any) => {
                // @ts-ignore
                track._switchCamera?.();
            });
        }
    }
}

export const webRTCService = new WebRTCService();

