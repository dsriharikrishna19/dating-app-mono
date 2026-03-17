import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Platform } from "react-native";

let RTCView: any;
if (Platform.OS !== "web") {
    try {
        RTCView = require("react-native-webrtc").RTCView;
    } catch (e) {
        console.error("Failed to load RTCView", e);
    }
}

interface Props {
    stream: any | null;
    isLocal?: boolean;
}

export const RTCViewContainer: React.FC<Props> = ({ stream, isLocal }) => {
    const videoRef = useRef<any>(null);

    useEffect(() => {
        if (Platform.OS === "web" && stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    if (!stream) return <View style={styles.placeholder} />;

    if (Platform.OS === "web") {
        return (
            <View style={isLocal ? styles.localPreview : styles.remoteStream}>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted={isLocal}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: isLocal ? "scaleX(-1)" : "none",
                    }}
                />
            </View>
        );
    }

    return (
        <RTCView
            streamURL={stream.toURL()}
            style={isLocal ? styles.localPreview : styles.remoteStream}
            objectFit="cover"
            mirror={isLocal}
        />
    );
};

const styles = StyleSheet.create({
    placeholder: {
        flex: 1,
        backgroundColor: "#2C3E50",
    },
    localPreview: {
        width: 120,
        height: 180,
        borderRadius: 12,
        backgroundColor: "#000",
    },
    remoteStream: {
        flex: 1,
        backgroundColor: "#000",
    },
});
