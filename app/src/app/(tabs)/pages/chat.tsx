import React, { useCallback, useState, useMemo } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Platform
} from 'react-native';
import { MOCK_USERS } from '../../../utils/mockData';
import { SPACING, RADIUS } from '../../../theme/spacing';
import { TYPOGRAPHY } from '../../../theme/typography';
import { Search, X } from 'lucide-react-native';
import AppText from '../../../components/AppText';
import Avatar from '../../../components/Avatar';
import { useResponsive } from '../../../hooks/useResponsive';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/useTheme';

const NewMatchItem = ({ item }: { item: typeof MOCK_USERS[0] }) => {
    const router = useRouter();
    const theme = useTheme();
    return (
        <TouchableOpacity
            style={styles.newMatchItem}
            activeOpacity={0.8}
            onPress={() => router.push(`/chat/${item.id}`)}
        >
            <View style={styles.newMatchAvatarContainer}>
                <Avatar
                    uri={item.images[0]}
                    size={64}
                    showOnline={true}
                    imageStyle={{ borderWidth: 2, borderColor: theme.primary }}
                />
            </View>
            <AppText variant="tiny" style={[styles.newMatchName, { color: theme.text.primary }]} numberOfLines={1}>
                {item.fullName.split(' ')[0]}
            </AppText>
        </TouchableOpacity>
    );
};

const MessageItem = React.memo(({ item, index }: { item: typeof MOCK_USERS[0], index: number }) => {
    const router = useRouter();
    const theme = useTheme();
    // Simulate dynamic data based on index
    const lastMessages = [
        "Hey! Are we still meeting tomorrow?",
        "That sounds like a great plan!",
        "I just finished work, let's talk?",
        "Did you see that new movie yet?",
        "Haha, you're so funny 😂",
        "Maybe next weekend works better?"
    ];
    const timestamps = ["2:15 PM", "1:05 PM", "Yesterday", "Yesterday", "Monday", "Sunday"];
    const isUnread = index < 2; // Simulate some unread messages

    return (
        <View style={styles.messageItemContainer}>
            <TouchableOpacity
                style={styles.messageItem}
                activeOpacity={0.6}
                onPress={() => router.push(`/chat/${item.id}`)}
            >
                <View style={styles.avatarContainer}>
                    <Avatar
                        uri={item.images[0]}
                        size={60}
                        showOnline={isUnread} // Example logic: online if unread 
                    />
                </View>
                <View style={styles.messageContent}>
                    <View style={styles.messageHeader}>
                        <AppText variant="bodyBold" style={[styles.name, { color: theme.text.primary }]}>
                            {item.fullName}
                        </AppText>
                        <AppText variant="tiny" color={isUnread ? theme.primary : theme.text.tertiary} weight={isUnread ? "bold" : "regular"}>
                            {timestamps[index % timestamps.length]}
                        </AppText>
                    </View>
                    <View style={styles.messageFooter}>
                        <AppText
                            variant="small"
                            color={isUnread ? theme.text.primary : theme.text.secondary}
                            weight={isUnread ? "medium" : "regular"}
                            numberOfLines={1}
                            style={styles.lastMessageText}
                        >
                            {lastMessages[index % lastMessages.length]}
                        </AppText>
                        {isUnread && (
                            <View style={[styles.unreadBadge, { backgroundColor: theme.primary }]}>
                                <AppText variant="tiny" color={theme.text.light} style={styles.unreadCount}>1</AppText>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
            {index < MOCK_USERS.length - 1 && <View style={[styles.separator, { backgroundColor: theme.divider }]} />}
        </View>
    );
});

export default function ChatScreen() {
    const { isTablet } = useResponsive();
    const theme = useTheme();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredChats = useMemo(() => {
        if (!searchQuery.trim()) return MOCK_USERS;
        const query = searchQuery.toLowerCase();
        return MOCK_USERS.filter(user =>
            user.fullName.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const filteredRecent = useMemo(() => {
        return filteredChats.slice(0, 8);
    }, [filteredChats]);

    const renderMessageItem = useCallback(({ item, index }: { item: typeof MOCK_USERS[0], index: number }) => (
        <MessageItem item={item} index={index} />
    ), []);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background.main }]}>
            <View style={styles.header}>
                <AppText variant="h1" style={[styles.title, { color: theme.text.primary }]}>Messages</AppText>
            </View>

            <View style={styles.searchContainer}>
                <View style={[styles.searchBar, { backgroundColor: theme.background.surface, borderColor: theme.divider }]}>
                    <Search color={theme.text.tertiary} size={20} style={{ marginRight: SPACING.sm }} />
                    <TextInput
                        placeholder="Search messages"
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

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={isTablet && styles.tabletContent}>
                {filteredRecent.length > 0 && !searchQuery && (
                    <View style={styles.section}>
                        <AppText variant="h3" style={[styles.sectionTitle, { color: theme.text.primary }]}>Recent Matches</AppText>
                        <FlatList
                            horizontal
                            data={filteredRecent}
                            renderItem={({ item }) => <NewMatchItem item={item} />}
                            keyExtractor={(item) => `new-${item.id}`}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.newMatchesList}
                        />
                    </View>
                )}

                <View style={styles.section}>
                    <AppText variant="h3" style={[styles.sectionTitle, { color: theme.text.primary }]}>
                        {searchQuery ? 'Results' : 'Chats'}
                    </AppText>
                    {filteredChats.length > 0 ? (
                        <FlatList
                            data={filteredChats}
                            renderItem={renderMessageItem}
                            keyExtractor={(item) => `msg-${item.id}`}
                            scrollEnabled={false}
                            contentContainerStyle={styles.messagesList}
                        />
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Search color={theme.text.tertiary} size={40} />
                            <AppText variant="bodyBold" style={{ marginTop: SPACING.sm, color: theme.text.primary }}>No conversations found</AppText>
                            <AppText variant="small" color={theme.text.tertiary}>Try a different name</AppText>
                        </View>
                    )}
                </View>
            </ScrollView>
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
    tabletContent: {
        alignItems: 'center',
    },
    section: {
        paddingVertical: SPACING.md,
        width: '100%',
        maxWidth: 600,
    },
    sectionTitle: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.md,
        fontWeight: TYPOGRAPHY.weight.bold,
    },
    newMatchesList: {
        paddingLeft: SPACING.lg,
        paddingRight: SPACING.md,
    },
    newMatchItem: {
        alignItems: 'center',
        marginRight: SPACING.lg,
        width: 70,
    },
    newMatchAvatarContainer: {
        position: 'relative',
        marginBottom: SPACING.xs,
    },
    newMatchName: {
        fontWeight: TYPOGRAPHY.weight.semibold,
        marginTop: 4,
    },
    messagesList: {
        paddingBottom: SPACING.xl,
    },
    messageItem: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        alignItems: 'center',
    },
    messageContent: {
        flex: 1,
        justifyContent: 'center',
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontWeight: TYPOGRAPHY.weight.black,
    },
    messageFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessageText: {
        flex: 1,
        marginRight: SPACING.md,
    },
    unreadBadge: {
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unreadCount: {
        fontWeight: TYPOGRAPHY.weight.bold,
        fontSize: 10,
    },
    messageItemContainer: {
        width: '100%',
    },
    avatarContainer: {
        position: 'relative',
        marginRight: SPACING.md,
    },
    separator: {
        height: 1,
        marginLeft: 80, // avatar width + margin
        marginRight: SPACING.lg,
    },
    emptyContainer: {
        alignItems: 'center',
        padding: SPACING.xxl,
        marginTop: SPACING.xl,
    },
});
