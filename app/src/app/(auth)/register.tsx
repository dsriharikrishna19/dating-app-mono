import React from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '../../schemas/authSchema';
import { setRegistrationMobile } from '../../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { useRouter } from 'expo-router';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import AppText from '../../components/AppText';
import { SPACING, RADIUS } from '../../theme/spacing';
import { useResponsive } from '../../hooks/useResponsive';
import { Phone } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';

export default function RegisterScreen() {
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.auth);
    const { isTablet, scale } = useResponsive();

    const { control, handleSubmit } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            mobile: '',
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        dispatch(setRegistrationMobile(data.mobile));
        router.push('/(auth)/onboarding');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background.main }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContent,
                        isTablet && styles.tabletScrollContent
                    ]}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={[styles.content, isTablet && styles.tabletContent, isTablet && { backgroundColor: theme.background.card, shadowColor: theme.shadow }]}>
                        <View style={styles.header}>
                            <AppText variant="h1" align="center" style={[styles.title, { color: theme.text.primary }]}>
                                Get Started
                            </AppText>
                            <AppText variant="body" align="center" style={{ color: theme.text.secondary }}>
                                Enter your mobile number to continue
                            </AppText>
                        </View>

                        <View style={styles.form}>
                            <FormInput
                                control={control}
                                name="mobile"
                                label="Mobile Number"
                                placeholder="9876543210"
                                keyboardType="numeric"
                                leftIcon={<Phone size={20} color={theme.text.tertiary} />}
                                maxLength={10}
                            />

                            <Button
                                title="Continue"
                                onPress={handleSubmit(onSubmit)}
                                loading={loading}
                                style={styles.button}
                                size="lg"
                            />

                            <View style={styles.footer}>
                                <AppText variant="body" color={theme.text.secondary}>
                                    Already have an account?{' '}
                                </AppText>
                                <TouchableOpacity onPress={() => router.back()}>
                                    <AppText variant="bodyBold" color={theme.primary}>Login</AppText>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.termsContainer}>
                            <AppText variant="caption" align="center" style={[styles.termsText, { color: theme.text.tertiary }]}>
                                By continuing, you agree to our Terms of Service and Privacy Policy.
                            </AppText>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: SPACING.lg,
    },
    tabletScrollContent: {
        alignItems: 'center',
    },
    content: {
        width: '100%',
        maxWidth: 400, // For larger screens
    },
    tabletContent: {
        width: 450,
        padding: SPACING.xl,
        borderRadius: RADIUS.xl,
        elevation: 4,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    header: {
        marginBottom: SPACING.xxl,
    },
    title: {
        marginBottom: SPACING.xs,
    },
    form: {
        width: '100%',
    },
    button: {
        marginTop: SPACING.md,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SPACING.xl,
    },
    termsContainer: {
        marginTop: SPACING.xxl,
    },
    termsText: {
        lineHeight: 18,
    },
});
