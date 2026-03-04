import React from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../../schemas/authSchema';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { useRouter } from 'expo-router';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import AppText from '../../components/AppText';
import { SPACING } from '../../theme/spacing';
import { useTheme } from '../../hooks/useTheme';

export default function LoginScreen() {
    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const { control, handleSubmit } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            mobile: '',
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        // For demo purposes, we'll just navigate if API fails or mock it
        router.replace('/pages/home');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.background.main }]}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <AppText variant="h1" style={{ color: theme.text.primary }}>Welcome Back</AppText>
                    <AppText variant="body" style={{ color: theme.text.secondary, marginTop: SPACING.xs }}>Sign in to continue</AppText>
                </View>

                <View style={styles.form}>
                    <FormInput
                        control={control}
                        name="mobile"
                        label="Mobile Number"
                        placeholder="Enter your mobile number"
                        keyboardType="numeric"
                    />

                    {error && <AppText variant="small" style={[styles.errorText, { color: theme.error }]}>{error}</AppText>}

                    <Button
                        title="Login"
                        onPress={handleSubmit(onSubmit)}
                        loading={loading}
                        style={styles.button}
                    />

                    <View style={styles.footer}>
                        <AppText variant="body" color={theme.text.secondary}>Don't have an account? </AppText>
                        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                            <AppText variant="bodyBold" color={theme.primary}>Register</AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: SPACING.lg,
    },
    header: {
        marginBottom: SPACING.xl,
        alignItems: 'center',
    },
    form: {
        width: '100%',
    },
    button: {
        marginTop: SPACING.md,
    },
    errorText: {
        textAlign: 'center',
        marginBottom: SPACING.sm,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SPACING.lg,
    },
});
