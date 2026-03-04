import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { SPACING, RADIUS } from '../theme/spacing';
import { useTheme } from '../hooks/useTheme';

interface FormSelectProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    required?: boolean;
    options: string[] | { label: string; value: string }[];
}

const FormSelect = <T extends FieldValues>({
    control,
    name,
    label,
    required,
    options
}: FormSelectProps<T>) => {
    const theme = useTheme();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.container}>
                    {label && (
                        <Text style={[styles.label, { color: theme.text.primary }]}>
                            {label}{required && <Text style={{ color: theme.error }}> *</Text>}
                        </Text>
                    )}
                    <View style={[
                        styles.pickerContainer,
                        {
                            backgroundColor: theme.background.card,
                            borderColor: error ? theme.error : theme.border
                        }
                    ]}>
                        <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                            style={[styles.picker, { color: theme.text.primary }]}
                            dropdownIconColor={theme.primary}
                        >
                            <Picker.Item label={`Select ${label}...`} value="" color={theme.text.secondary} />
                            {options.map((option) => {
                                const labelText = typeof option === 'string' ? option : option.label;
                                const valueText = typeof option === 'string' ? option : option.value;
                                return (
                                    <Picker.Item
                                        key={valueText}
                                        label={labelText}
                                        value={valueText}
                                        color={theme.text.primary}
                                    />
                                );
                            })}
                        </Picker>
                    </View>
                    {error && <Text style={[styles.errorText, { color: theme.error }]}>{error.message}</Text>}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.md,
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: SPACING.xs,
    },
    pickerContainer: {
        borderWidth: 1,
        borderRadius: RADIUS.md,
        overflow: 'hidden',
        minHeight: 48,
        justifyContent: 'center',
    },
    picker: {
        width: '100%',
        height: 48,
    },
    errorText: {
        fontSize: 12,
        marginTop: 4,
    },
});

export default FormSelect;
