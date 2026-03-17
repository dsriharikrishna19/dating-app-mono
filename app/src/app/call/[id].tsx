import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCall } from "../../hooks/useCall";
import { RTCViewContainer } from "../../components/Call/RTCViewContainer";
import {
    Mic,
    MicOff,
    Video as VideoIcon,
    VideoOff,
    PhoneOff,
    RefreshCw,
    Phone,
} from "lucide-react-native";

// Mock current user ID for demonstration
const CURRENT_USER_ID = "1";

export default function CallScreen() {
    const { id, type } = useLocalSearchParams<{ id: string; type?: 'video' | 'audio' }>(); // Target User ID
    const router = useRouter();
    const {
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
    } = useCall(CURRENT_USER_ID, id, type === 'audio');

    useEffect(() => {
        if (status === "idle" && id) {
            startCall();
        }
    }, [status, id, startCall]);

    useEffect(() => {
        if (status === "ended") {
            router.back();
        }
    }, [status, router]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Remote Video Stream */}
            <View style={styles.remoteViewContainer}>
                {status === "connected" ? (
                    remoteStream && !isVideoOff ? (
                        <RTCViewContainer stream={remoteStream} />
                    ) : (
                        <View style={styles.placeholder}>
                            <View style={styles.avatarCircle}>
                                <Text style={styles.avatarText}>?</Text>
                            </View>
                            <Text style={styles.placeholderText}>Audio Call</Text>
                        </View>
                    )
                ) : (
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>
                            {status === "calling" ? "Calling..." : "Waiting for connection..."}
                        </Text>
                    </View>
                )}
            </View>

            {/* Local Video Preview */}
            {!isVideoOff && (
                <View style={styles.localViewContainer}>
                    <RTCViewContainer stream={localStream} isLocal />
                </View>
            )}

            {/* Call Controls */}
            <View style={styles.controlsContainer}>
                {status === "incoming" ? (
                    <View style={styles.incomingCallContainer}>
                        <TouchableOpacity
                            style={[styles.controlButton, styles.acceptButton]}
                            onPress={acceptCall}
                        >
                            <Phone color="white" size={28} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.controlButton, styles.rejectButton]}
                            onPress={rejectCall}
                        >
                            <PhoneOff color="white" size={28} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.activeCallControls}>
                        <TouchableOpacity
                            style={[styles.controlButton, isMuted && styles.activeControl]}
                            onPress={toggleMute}
                        >
                            {isMuted ? (
                                <MicOff color="white" size={24} />
                            ) : (
                                <Mic color="white" size={24} />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.controlButton, isVideoOff && styles.activeControl]}
                            onPress={toggleVideo}
                        >
                            {isVideoOff ? (
                                <VideoOff color="white" size={24} />
                            ) : (
                                <VideoIcon color="white" size={24} />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.controlButton}
                            onPress={switchCamera}
                        >
                            <RefreshCw color="white" size={24} />
                        </TouchableOpacity>

                        {status === "idle" && (
                            <TouchableOpacity
                                style={[styles.controlButton, styles.acceptButton]}
                                onPress={startCall}
                            >
                                <Phone color="white" size={24} />
                            </TouchableOpacity>
                        )}

                        {(status === "connected" || status === "calling") && (
                            <TouchableOpacity
                                style={[styles.controlButton, styles.rejectButton]}
                                onPress={endCall}
                            >
                                <PhoneOff color="white" size={24} />
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1A1A1A",
    },
    remoteViewContainer: {
        flex: 1,
    },
    localViewContainer: {
        position: "absolute",
        top: 60,
        right: 20,
        width: 120,
        height: 180,
        borderRadius: 12,
        overflow: "hidden",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 10,
    },
    placeholder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2C3E50",
    },
    placeholderText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    controlsContainer: {
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    incomingCallContainer: {
        flexDirection: "row",
        gap: 40,
    },
    activeCallControls: {
        flexDirection: "row",
        gap: 20,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 20,
        borderRadius: 40,
    },
    controlButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    activeControl: {
        backgroundColor: "rgba(255,255,255,0.4)",
    },
    acceptButton: {
        backgroundColor: "#2ECC71",
    },
    rejectButton: {
        backgroundColor: "#E74C3C",
    },
    avatarCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "rgba(255,255,255,0.1)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.2)",
    },
    avatarText: {
        color: "white",
        fontSize: 48,
        fontWeight: "bold",
    },
});
