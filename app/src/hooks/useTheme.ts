import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { LIGHT_COLORS, DARK_COLORS, ThemeColors } from '../theme/colors';
import { RootState } from '../store/store';

export const useTheme = (): ThemeColors => {
    const systemColorScheme = useColorScheme();
    const { themeMode } = useSelector((state: RootState) => state.theme);

    const isDark = themeMode === 'system'
        ? systemColorScheme === 'dark'
        : themeMode === 'dark';

    return isDark ? DARK_COLORS : LIGHT_COLORS;
};

export const useIsDark = (): boolean => {
    const systemColorScheme = useColorScheme();
    const { themeMode } = useSelector((state: RootState) => state.theme);

    return themeMode === 'system'
        ? systemColorScheme === 'dark'
        : themeMode === 'dark';
};
