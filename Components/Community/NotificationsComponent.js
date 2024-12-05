import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

// Sample notifications data
const NotificationsComponent = [
  { id: '1', title: 'New message from John', description: 'Hey, are you available for a meeting tomorrow?', time: '2 hours ago' },
  { id: '2', title: 'New comment on your post', description: 'Anna commented on your post: "Great photo!"', time: '3 hours ago' },
  { id: '3', title: 'Friend request from Mike', description: 'Mike has sent you a friend request.', time: '1 day ago' },
  { id: '4', title: 'Reminder: Meeting at 2 PM', description: 'Don’t forget about your meeting today.', time: '1 hour ago' },
  { id: '5', title: 'New like on your photo', description: 'You received a like from Sarah on your recent post.', time: '5 minutes ago' },
];

const NotificationScreen = () => {
  // State to keep track of selected notification
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Render individual notification item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationCard}
      onPress={() => setSelectedNotification(item)}
    >
      <View style={styles.notificationContent}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://via.placeholder.com/50' }}
        />
        <View style={styles.notificationText}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationDescription}>{item.description}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      {/* Notifications List */}
      <FlatList
        data={notificationsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Display selected notification details */}
      {selectedNotification && (
        <View style={styles.selectedNotificationContainer}>
          <Text style={styles.selectedNotificationTitle}>{selectedNotification.title}</Text>
          <Text style={styles.selectedNotificationDescription}>{selectedNotification.description}</Text>
          <Text style={styles.selectedNotificationTime}>{selectedNotification.time}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 80, // For safe area
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
  },
  selectedNotificationContainer: {
    position: 'absolute',
    bottom: 30,
    left: 15,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedNotificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedNotificationDescription: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  selectedNotificationTime: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
});

export default NotificationsComponent;
