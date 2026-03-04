import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    ViewStyle,
    TextInputProps,
} from 'react-native';
import { SPACING, RADIUS } from '../theme/spacing';
import { TYPOGRAPHY } from '../theme/typography';
import { useTheme } from '../hooks/useTheme';
import AppText from './AppText';

interface InputProps extends TextInputProps {
    label?: string;
    required?: boolean;
    error?: string;
    containerStyle?: ViewStyle;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
    label,
    required,
    error,
    containerStyle,
    leftIcon,
    rightIcon,
    onFocus,
    onBlur,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const theme = useTheme();

    const handleFocus = (e: any) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <AppText variant="caption" style={[styles.label, { color: theme.text.secondary }]}>
                    {label}{required && <AppText color={theme.error}> *</AppText>}
                </AppText>
            )}
            <View
                style={[
                    styles.inputContainer,
                    {
                        backgroundColor: theme.background.card,
                        borderColor: isFocused ? theme.primary : theme.border,
                        shadowColor: isFocused ? theme.primary : 'transparent',
                    },
                    isFocused && styles.inputFocused,
                    error ? { borderColor: theme.error } : null,
                    props.multiline && styles.multilineContainer,
                ]}
            >
                {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
                <TextInput
                    style={[
                        styles.input,
                        { color: theme.text.primary },
                        props.multiline && styles.multilineInput,
                    ]}
                    placeholderTextColor={theme.text.tertiary}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />
                {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
            </View>
            {error && (
                <AppText variant="caption" color={theme.error} style={styles.errorText}>
                    {error}
                </AppText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.base,
        width: '100%',
    },
    label: {
        marginBottom: SPACING.xs,
        marginLeft: SPACING.xs,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.md,
        minHeight: 52,
    },
    inputFocused: {
        elevation: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    input: {
        flex: 1,
        fontSize: TYPOGRAPHY.size.base,
        paddingVertical: SPACING.sm,
        fontWeight: TYPOGRAPHY.weight.medium,
    },
    multilineContainer: {
        alignItems: 'flex-start',
        minHeight: 120,
        paddingVertical: SPACING.sm,
    },
    multilineInput: {
        textAlignVertical: 'top',
        height: '100%',
    },
    iconLeft: {
        marginRight: SPACING.sm,
    },
    iconRight: {
        marginLeft: SPACING.sm,
    },
    errorText: {
        marginTop: 4,
        marginLeft: SPACING.xs,
        textTransform: 'none',
    },
});

export default Input;
