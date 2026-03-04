import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Switch, Modal } from 'react-native';
import {
    User,
    Bell,
    ShieldCheck,
    CreditCard,
    HelpCircle,
    LogOut,
    ChevronRight,
    Moon,
    Globe,
    Smartphone
} from 'lucide-react-native';
import AppText from '../../../components/AppText';
import { SPACING, RADIUS } from '../../../theme/spacing';
import { TYPOGRAPHY } from '../../../theme/typography';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';
import { setIsDarkMode } from '../../../store/slices/themeSlice';
import { useRouter } from 'expo-router';
import { RootState } from '../../../store/store';
import { MOCK_USERS } from '../../../utils/mockData';
import { useTheme } from '../../../hooks/useTheme';

const SettingItem = ({ icon: Icon, label, value, onPress, isSwitchOn, onSwitchChange, color, type = 'link' }: any) => {
    const theme = useTheme();
    const itemColor = color || theme.text.primary;

    return (
        <TouchableOpacity
            style={[styles.settingItem, { borderBottomColor: theme.divider }]}
            onPress={onPress}
            activeOpacity={0.6}
            disabled={type === 'switch'}
        >
            <View style={[styles.settingIconContainer, { backgroundColor: theme.background.surface }]}>
                <Icon color={itemColor} size={20} />
            </View>
            <View style={styles.settingTextContainer}>
                <AppText variant="body" style={{ color: itemColor, fontWeight: TYPOGRAPHY.weight.medium }}>{label}</AppText>
                {value && <AppText variant="small" color={theme.text.tertiary}>{value}</AppText>}
            </View>
            {type === 'link' && <ChevronRight color={theme.text.tertiary} size={18} />}
            {type === 'switch' && (
                <Switch
                    value={isSwitchOn}
                    onValueChange={onSwitchChange}
                    trackColor={{ false: theme.divider, true: theme.primary }}
                />
            )}
        </TouchableOpacity>
    );
};

export default function SettingsScreen() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const router = useRouter();
    const { user: authUser } = useSelector((state: RootState) => state.auth);
    const { isDarkMode } = useSelector((state: RootState) => state.theme);
    const user = authUser || MOCK_USERS[0];

    // In a real app, Language preference would come from global state/context
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        router.replace('/(auth)/login');
    };

    const handleToggleDarkMode = (value: boolean) => {
        dispatch(setIsDarkMode(value));
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background.main }]}>
            <View style={styles.header}>
                <AppText variant="h1" style={{ fontWeight: TYPOGRAPHY.weight.black }}>Settings</AppText>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.section}>
                    <AppText variant="caption" style={[styles.sectionHeader, { color: theme.text.tertiary }]}>ACCOUNT</AppText>
                    <View style={[styles.settingsCard, { backgroundColor: theme.background.card, borderColor: theme.divider }]}>
                        <SettingItem icon={User} label="Edit Profile" onPress={() => router.push('/(tabs)/pages/profile')} />
                        <View style={[styles.divider, { backgroundColor: theme.divider }]} />
                        <SettingItem icon={Smartphone} label="Phone Number" value={user.mobile || "+91 98765 43210"} onPress={() => { }} />
                        <View style={[styles.divider, { backgroundColor: theme.divider }]} />
                        <SettingItem icon={CreditCard} label="Premium Subscription" value="Gold Plan" onPress={() => router.push('/(tabs)/pages/settings/premium')} />
                    </View>
                </View>

                <View style={styles.section}>
                    <AppText variant="caption" style={[styles.sectionHeader, { color: theme.text.tertiary }]}>PREFERENCES</AppText>
                    <View style={[styles.settingsCard, { backgroundColor: theme.background.card, borderColor: theme.divider }]}>
                        <SettingItem icon={Bell} label="Notifications" onPress={() => router.push('/(tabs)/pages/settings/notifications')} />
                        <View style={[styles.divider, { backgroundColor: theme.divider }]} />
                        <SettingItem
                            icon={Moon}
                            label="Dark Mode"
                            type="switch"
                            isSwitchOn={isDarkMode}
                            onSwitchChange={handleToggleDarkMode}
                        />
                        <View style={[styles.divider, { backgroundColor: theme.divider }]} />
                        <SettingItem icon={Globe} label="Language" value={selectedLanguage} onPress={() => router.push('/(tabs)/pages/settings/language')} />
                    </View>
                </View>

                <View style={styles.section}>
                    <AppText variant="caption" style={[styles.sectionHeader, { color: theme.text.tertiary }]}>SAFETY & LEGAL</AppText>
                    <View style={[styles.settingsCard, { backgroundColor: theme.background.card, borderColor: theme.divider }]}>
                        <SettingItem icon={ShieldCheck} label="Privacy Policy" onPress={() => router.push('/(tabs)/pages/settings/privacy')} />
                        <View style={[styles.divider, { backgroundColor: theme.divider }]} />
                        <SettingItem icon={HelpCircle} label="Help Center" onPress={() => router.push('/(tabs)/pages/settings/help')} />
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.logoutButton, { backgroundColor: theme.background.card, borderColor: theme.error + '40' }]}
                    onPress={() => setIsLogoutModalVisible(true)}
                >
                    <LogOut color={theme.error} size={20} />
                    <AppText variant="bodyBold" color={theme.error} style={{ marginLeft: SPACING.sm }}>
                        Logout
                    </AppText>
                </TouchableOpacity>

                <AppText variant="tiny" align="center" color={theme.text.tertiary} style={styles.versionText}>
                    Version 1.0.0 (Build 124)
                </AppText>
            </ScrollView>

            {/* Logout Confirmation Modal */}
            <Modal visible={isLogoutModalVisible} animationType="fade" transparent>
                <View style={[styles.modalOverlay, { backgroundColor: theme.overlay }]}>
                    <View style={[styles.logoutModalContent, { backgroundColor: theme.background.main, shadowColor: theme.shadow }]}>
                        <View style={[styles.logoutIconContainer, { backgroundColor: theme.error + '15' }]}>
                            <LogOut color={theme.error} size={32} />
                        </View>
                        <AppText variant="h2" align="center" style={{ marginBottom: SPACING.sm }}>Log Out</AppText>
                        <AppText variant="body" align="center" color={theme.text.secondary} style={{ marginBottom: SPACING.xl }}>
                            Are you sure you want to log out of your account?
                        </AppText>

                        <View style={styles.logoutModalButtons}>
                            <TouchableOpacity
                                style={[styles.logoutModalButton, styles.logoutCancelButton, { backgroundColor: theme.background.surface }]}
                                onPress={() => setIsLogoutModalVisible(false)}
                            >
                                <AppText variant="bodyBold" color={theme.text.primary}>Cancel</AppText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.logoutModalButton, styles.logoutConfirmButton, { backgroundColor: theme.error + '15', borderColor: theme.error + '30' }]}
                                onPress={() => {
                                    setIsLogoutModalVisible(false);
                                    handleLogout();
                                }}
                            >
                                <AppText variant="bodyBold" color={theme.error}>Logout</AppText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    },
    scrollContent: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionHeader: {
        marginLeft: SPACING.xs,
        marginBottom: SPACING.sm,
    },
    settingsCard: {
        borderRadius: RADIUS.xl,
        overflow: 'hidden',
        borderWidth: 1,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
    },
    settingIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    settingTextContainer: {
        flex: 1,
    },
    divider: {
        height: 1,
        marginLeft: 64,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.md,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        marginTop: SPACING.md,
    },
    versionText: {
        marginTop: SPACING.xxl,
        marginBottom: SPACING.md,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.lg,
    },
    logoutModalContent: {
        borderRadius: RADIUS.xxl,
        padding: SPACING.xl,
        alignItems: 'center',
        width: '100%',
        maxWidth: 340,
        elevation: 10,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    },
    logoutIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    logoutModalButtons: {
        flexDirection: 'row',
        gap: SPACING.md,
        width: '100%',
    },
    logoutModalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: RADIUS.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutCancelButton: {
    },
    logoutConfirmButton: {
        borderWidth: 1,
    }
});
