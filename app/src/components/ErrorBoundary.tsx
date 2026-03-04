import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING } from '../theme/spacing';
import Button from './Button';
import { useTheme } from '../hooks/useTheme';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

const ErrorFallback = ({ error, onReset }: { error: Error | null, onReset: () => void }) => {
    const theme = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.background.main }]}>
            <Text style={[styles.title, { color: theme.text.primary }]}>Something went wrong</Text>
            <Text style={[styles.message, { color: theme.text.secondary }]}>
                {error?.message || 'An unexpected error occurred.'}
            </Text>
            <Button
                title="Try Again"
                onPress={onReset}
                style={styles.button}
            />
        </View>
    );
};

/**
 * Global Error Boundary Component
 * Catches runtime errors and shows a fallback UI.
 */
class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    public render() {
        if (this.state.hasError) {
            return (
                <ErrorFallback
                    error={this.state.error}
                    onReset={this.handleReset}
                />
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.xl,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: SPACING.sm,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: SPACING.xl,
    },
    button: {
        width: '100%',
    },
});

export default ErrorBoundary;
