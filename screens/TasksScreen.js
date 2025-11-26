import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { Chats } from '../temp_data/Chats'
import ChatHeader from '../components/ChatHeader'

export default function TasksScreen(){
    const [tab, setTab] = useState('messages')

    return(
        <SafeAreaView style={styles.Container}>
            <View style={styles.tabs}>
                <TouchableOpacity onPress={() => setTab('messages')}>
                    <Text style={ tab === 'messages' ? styles.activeTab : styles.tab }>
                        Messages
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab('notifications')}>
                    <Text style={ tab === 'notifications' ? styles.activeTab : styles.tab }>
                        Notifications
                    </Text>
                </TouchableOpacity>
            </View>

            {tab === 'messages' ? (
                <ScrollView>
                    {Chats.map(
                        chat => <ChatHeader key={chat.id} chat={chat} />
                    )}
                </ScrollView>
            ):(
                <View>

                </View>
            )}
        </SafeAreaView>
    );   
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    tabs: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
    },
    tab: {
        flex: 1,
        paddingHorizontal: 60, 
        fontSize: 15,
        paddingVertical: 15,
    },
    activeTab: {
        fontWeight: 'bold',
        borderBottomWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 60, 
    },
});