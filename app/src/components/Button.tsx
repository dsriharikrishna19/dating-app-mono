import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    View,
} from 'react-native';
import { SPACING, RADIUS } from '../theme/spacing';
import { TYPOGRAPHY } from '../theme/typography';
import { useResponsive } from '../hooks/useResponsive';
import { useTheme } from '../hooks/useTheme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    style,
    textStyle,
    fullWidth = true,
    leftIcon,
}) => {
    const { scale } = useResponsive();
    const theme = useTheme();

    const getBackgroundColor = () => {
        if (disabled) return theme.background.surface;
        switch (variant) {
            case 'primary': return theme.primary;
            case 'secondary': return theme.secondary;
            case 'accent': return theme.accent;
            case 'outline':
            case 'ghost': return 'transparent';
            default: return theme.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return theme.text.tertiary;
        switch (variant) {
            case 'outline':
            case 'ghost': return theme.primary;
            case 'accent': return theme.text.primary;
            default: return theme.text.light;
        }
    };

    const getPadding = () => {
        switch (size) {
            case 'sm': return { py: SPACING.sm, px: SPACING.md, h: 40 };
            case 'lg': return { py: SPACING.lg, px: SPACING.xl, h: 60 };
            default: return { py: SPACING.base, px: SPACING.lg, h: 52 };
        }
    };

    const padding = getPadding();

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: getBackgroundColor(),
                    paddingVertical: padding.py,
                    paddingHorizontal: padding.px,
                    minHeight: padding.h,
                    width: fullWidth ? '100%' : 'auto',
                    shadowColor: theme.shadow,
                },
                variant === 'outline' && { borderWidth: 1.5, borderColor: theme.primary },
                disabled && { opacity: 0.7 },
                style,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <View style={styles.content}>
                    {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
                    <Text style={[
                        styles.text,
                        {
                            color: getTextColor(),
                            fontSize: size === 'sm' ? TYPOGRAPHY.size.sm : TYPOGRAPHY.size.base,
                        },
                        textStyle
                    ]}>
                        {title}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginRight: SPACING.sm,
    },
    text: {
        fontWeight: TYPOGRAPHY.weight.bold,
        letterSpacing: 0.2,
    },
});

export default Button;
