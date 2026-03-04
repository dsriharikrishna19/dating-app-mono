import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Modal,
    Dimensions
} from 'react-native';
import {
    Search as SearchIcon,
    Filter,
    MapPin,
    Music,
    Plane,
    Utensils,
    Dumbbell,
    Palette,
    Film,
    X
} from 'lucide-react-native';
import AppText from '../../../components/AppText';
import { SPACING, RADIUS } from '../../../theme/spacing';
import { TYPOGRAPHY } from '../../../theme/typography';
import { useResponsive } from '../../../hooks/useResponsive';
import { MOCK_USERS } from '../../../utils/mockData';
import Avatar from '../../../components/Avatar';
import { useTheme } from '../../../hooks/useTheme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const INTEREST_ICONS: Record<string, any> = {
    'Music': Music,
    'Travel': Plane,
    'Food': Utensils,
    'Fitness': Dumbbell,
    'Art': Palette,
    'Movies': Film,
};

export default function SearchScreen() {
    const theme = useTheme();
    const { isTablet, width } = useResponsive();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isFilterVisible, setIsFilterVisible] = React.useState(false);
    const [filters, setFilters] = React.useState({
        distance: 10,
        ageRange: [18, 30],
        gender: 'both' as 'male' | 'female' | 'both'
    });

    const filteredResults = React.useMemo(() => {
        if (!searchQuery.trim()) return MOCK_USERS;
        const query = searchQuery.toLowerCase();
        return MOCK_USERS.filter(user =>
            user.fullName.toLowerCase().includes(query) ||
            user.interests.some(i => i.toLowerCase().includes(query))
        );
    }, [searchQuery]);

    const handleInterestPress = (interest: string) => {
        setSearchQuery(interest);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background.main }]}>
            <View style={styles.header}>
                <AppText variant="h1" style={[styles.title, { color: theme.text.primary }]}>Discovery</AppText>
                <TouchableOpacity
                    style={[styles.filterButton, { backgroundColor: theme.background.surface, borderColor: theme.divider }]}
                    onPress={() => setIsFilterVisible(true)}
                >
                    <Filter color={theme.primary} size={20} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <View style={[styles.searchBar, { backgroundColor: theme.background.surface, borderColor: theme.divider }]}>
                    <SearchIcon color={theme.text.tertiary} size={20} style={{ marginRight: SPACING.sm }} />
                    <TextInput
                        placeholder="Search by name or interest"
                        placeholderTextColor={theme.text.tertiary}
                        style={[styles.searchInput, { color: theme.text.primary }]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <X color={theme.text.tertiary} size={18} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <AppText variant="h3" style={{ color: theme.text.primary }}>{searchQuery ? 'Search Results' : 'Nearby You'}</AppText>
                        {!searchQuery && (
                            <TouchableOpacity>
                                <AppText variant="link" color={theme.primary}>See All</AppText>
                            </TouchableOpacity>
                        )}
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                        {filteredResults.length > 0 ? (
                            filteredResults.map((user) => (
                                <TouchableOpacity key={user.id} style={[styles.userCard, { backgroundColor: theme.background.surface }]}>
                                    <Avatar
                                        uri={user.images[0]}
                                        size={width * 0.4}
                                        showOnline={true}
                                        imageStyle={{ borderRadius: RADIUS.xl }}
                                        style={styles.userImageContainer}
                                    />
                                    <View style={styles.cardGradient} />
                                    <View style={styles.userOverlay}>
                                        <View style={styles.nameRow}>
                                            <AppText variant="small" style={{ color: theme.text.light }} weight="bold">{user.fullName}, {user.age}</AppText>
                                        </View>
                                        <View style={styles.locationRow}>
                                            <MapPin size={10} color={theme.text.light} />
                                            <AppText variant="tiny" style={{ color: theme.text.light, marginLeft: 2 }}>2.5 km</AppText>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View style={[styles.emptyResults, { width: width - SPACING.lg * 2, borderColor: theme.divider }]}>
                                <SearchIcon color={theme.text.tertiary} size={40} />
                                <AppText variant="bodyBold" style={{ marginTop: SPACING.sm, color: theme.text.primary }}>No users found</AppText>
                                <AppText variant="small" color={theme.text.tertiary}>Try a different search term</AppText>
                            </View>
                        )}
                    </ScrollView>
                </View>

                {!searchQuery && (
                    <View style={styles.section}>
                        <AppText variant="h3" style={[styles.sectionTitle, { color: theme.text.primary }]}>Shared Interests</AppText>
                        <View style={styles.interestGrid}>
                            {['Music', 'Travel', 'Food', 'Fitness', 'Art', 'Movies'].map((interest) => {
                                const Icon = INTEREST_ICONS[interest];
                                return (
                                    <TouchableOpacity
                                        key={interest}
                                        style={[
                                            styles.interestItem,
                                            {
                                                backgroundColor: theme.background.card,
                                                borderColor: theme.divider,
                                                shadowColor: theme.shadow,
                                            }
                                        ]}
                                        onPress={() => handleInterestPress(interest)}
                                    >
                                        <View style={[styles.interestIconCircle, { backgroundColor: theme.primaryAlpha(0.1) }]}>
                                            {Icon && <Icon color={theme.primary} size={22} />}
                                        </View>
                                        <AppText variant="bodyBold" color={theme.text.primary}>{interest}</AppText>
                                        <AppText variant="tiny" color={theme.text.secondary}>1.2k people</AppText>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                )}
            </ScrollView>

            <Modal
                visible={isFilterVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsFilterVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsFilterVisible(false)}
                >
                    <TouchableOpacity
                        style={[styles.modalContent, { backgroundColor: theme.background.main }]}
                        activeOpacity={1}
                    >
                        <View style={styles.modalHeader}>
                            <AppText variant="h2" style={{ color: theme.text.primary }}>Filters</AppText>
                            <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
                                <X color={theme.text.primary} size={24} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalBody}>
                            <View style={styles.filterSection}>
                                <AppText variant="bodyBold" style={{ color: theme.text.primary }}>Gender Preference</AppText>
                                <View style={styles.genderRow}>
                                    {['male', 'female', 'both'].map((g) => (
                                        <TouchableOpacity
                                            key={g}
                                            style={[
                                                styles.genderOption,
                                                { backgroundColor: theme.background.surface, borderColor: theme.divider },
                                                filters.gender === g && [styles.genderOptionActive, { backgroundColor: theme.primary, borderColor: theme.primary }]
                                            ]}
                                            onPress={() => setFilters({ ...filters, gender: g as any })}
                                        >
                                            <AppText
                                                variant="bodyBold"
                                                color={filters.gender === g ? theme.text.light : theme.text.primary}
                                                style={{ textTransform: 'capitalize' }}
                                            >
                                                {g}
                                            </AppText>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.filterSection}>
                                <View style={styles.filterLabelRow}>
                                    <AppText variant="bodyBold" style={{ color: theme.text.primary }}>Distance</AppText>
                                    <AppText variant="bodyBold" color={theme.primary}>{filters.distance} km</AppText>
                                </View>
                                <View style={styles.fakeSlider}>
                                    <View style={[styles.sliderTrack, { backgroundColor: theme.primary, width: `${filters.distance}%` }]} />
                                    <View style={[styles.sliderThumb, { backgroundColor: theme.background.main, borderColor: theme.primary, left: `${filters.distance}%`, shadowColor: theme.shadow }]} />
                                </View>
                            </View>

                            <View style={styles.filterSection}>
                                <View style={styles.filterLabelRow}>
                                    <AppText variant="bodyBold" style={{ color: theme.text.primary }}>Age Range</AppText>
                                    <AppText variant="bodyBold" color={theme.primary}>{filters.ageRange[0]} - {filters.ageRange[1]}</AppText>
                                </View>
                                <View style={styles.fakeSlider}>
                                    <View style={[styles.sliderTrack, { backgroundColor: theme.primary, left: '10%', width: '50%' }]} />
                                    <View style={[styles.sliderThumb, { backgroundColor: theme.background.main, borderColor: theme.primary, left: '10%', shadowColor: theme.shadow }]} />
                                    <View style={[styles.sliderThumb, { backgroundColor: theme.background.main, borderColor: theme.primary, left: '60%', shadowColor: theme.shadow }]} />
                                </View>
                            </View>
                        </ScrollView>

                        <TouchableOpacity
                            style={[styles.applyButton, { backgroundColor: theme.primary, shadowColor: theme.primary }]}
                            onPress={() => setIsFilterVisible(false)}
                        >
                            <AppText variant="bodyBold" color={theme.text.light}>Apply Filters</AppText>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    },
    title: {
        fontWeight: TYPOGRAPHY.weight.black,
    },
    filterButton: {
        width: 44,
        height: 44,
        borderRadius: RADIUS.md,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    searchContainer: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.md,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        height: 52,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
    scrollContent: {
        paddingBottom: SPACING.xxl,
    },
    section: {
        paddingVertical: SPACING.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.md,
    },
    sectionTitle: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.md,
    },
    horizontalList: {
        paddingLeft: SPACING.lg,
        paddingRight: SPACING.md,
        gap: SPACING.md,
    },
    userCard: {
        width: 140,
        height: 190,
        borderRadius: RADIUS.lg,
        overflow: 'hidden',
    },
    userImageContainer: {
        width: '100%',
        height: '100%',
    },
    cardGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        backgroundColor: 'rgba(0,0,0,0.6)', // Simple gradient alternative
    },
    userOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: SPACING.sm,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    interestGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: SPACING.lg,
        gap: SPACING.md,
    },
    interestItem: {
        width: '47%',
        padding: SPACING.lg,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        elevation: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        alignItems: 'center',
    },
    interestIconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    emptyResults: {
        height: 190,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: RADIUS.lg,
        marginHorizontal: SPACING.lg,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: RADIUS.xxl,
        borderTopRightRadius: RADIUS.xxl,
        padding: SPACING.xl,
        maxHeight: SCREEN_HEIGHT * 0.8,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    modalBody: {
        marginBottom: SPACING.xl,
    },
    filterSection: {
        marginBottom: SPACING.xl,
    },
    filterLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    genderRow: {
        flexDirection: 'row',
        gap: SPACING.sm,
        marginTop: SPACING.sm,
    },
    genderOption: {
        flex: 1,
        height: 44,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    genderOptionActive: {
    },
    fakeSlider: {
        height: 40,
        justifyContent: 'center',
    },
    sliderTrack: {
        height: 6,
        borderRadius: 3,
        position: 'absolute',
        left: 0,
    },
    sliderThumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        position: 'absolute',
        marginTop: -12,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    applyButton: {
        height: 56,
        borderRadius: RADIUS.full,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
});
