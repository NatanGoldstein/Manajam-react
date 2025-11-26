import React, { useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Ionicons } from '@expo/vector-icons';
import Task from './Task';
import { tasks } from '../temp_data/Tasks';
import { people } from '../temp_data/People';
import { getObjectById } from '../utils/DataHandle';

export default function BandTasksTab({ band }) {
  const [collapsed, setCollapsed] = useState(true);
  const [ownersCollapsed, setOwnersCollapsed] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const isInTaskMembers = useCallback(
    memberId => selectedMembers.some(id => id === memberId),
    [selectedMembers]
  );

  const handleMemberSelection = useCallback(
    memberId => {
      if (isInTaskMembers(memberId)) {
        setSelectedMembers(prev => prev.filter(id => id !== memberId));
      } else {
        setSelectedMembers(prev => [...prev, memberId]);
      }
    },
    [isInTaskMembers]
  );

  const handleNewTask = () => {
    alert('New Task Added');
    setSelectedMembers([]);
    setOwnersCollapsed(true);
    setCollapsed(true);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => (collapsed ? setCollapsed(false) : handleNewTask())}
      >
        <Text style={styles.addButtonText}>{collapsed ? '+ New Task' : 'Add Task'}</Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        <View style={styles.newTask}>
          <TextInput style={styles.taskNameInput} placeholder="Task Name" />
          <TextInput
            style={styles.taskDetailsInput}
            placeholder="Details..."
            multiline
            numberOfLines={2}
          />
          <View style={styles.ownersSection}>
            <View style={styles.ownersHeader}>
              <Text style={styles.ownersText}>Owners</Text>
              <TouchableOpacity onPress={() => setOwnersCollapsed(prev => !prev)}>
                <Ionicons name="add-circle" size={30} />
              </TouchableOpacity>
            </View>
            <Collapsible collapsed={ownersCollapsed}>
              <ScrollView style={styles.drawer}>
                {band.membersIds.map(memberId => {
                  const member = getObjectById(memberId, people);
                  if (!member) {
                    return null;
                  }
                  const memberName = `${member.firstName} ${member.lastName}`;
                  const selected = isInTaskMembers(memberId);
                  return (
                    <TouchableOpacity key={memberId} onPress={() => handleMemberSelection(memberId)}>
                      <Text style={styles.memberPickerText}>
                        {selected ? `☑   ${memberName}` : `⬚   ${memberName}`}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </Collapsible>
          </View>
        </View>
      </Collapsible>
      <ScrollView style={styles.sectionContent}>
        {band.taskIds.map(taskId => {
          const task = getObjectById(taskId, tasks);
          if (!task) {
            return null;
          }
          return <Task key={taskId} task={task} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: 120,
    height: 45,
    marginBottom: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  newTask: {
    width: '95%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingBottom: 15,
  },
  taskNameInput: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'justify',
    fontWeight: 'bold',
  },
  taskDetailsInput: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'justify',
    height: 80,
  },
  ownersSection: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  ownersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ownersText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  drawer: {
    width: 320,
  },
  memberPickerText: {
    alignSelf: 'flex-start',
    fontSize: 15,
    margin: 5,
  },
  sectionContent: {
    minHeight: 600,
  },
});

