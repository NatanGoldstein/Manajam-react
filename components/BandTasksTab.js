import React, { useState, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { Ionicons } from "@expo/vector-icons";
import Task from "./Task";
import { tasks } from "../temp_data/Tasks";
import { people } from "../temp_data/People";
import { getObjectById } from "../utils/DataHandle";
import { appBlue } from "../constants/colors";
export default function BandTasksTab({ band }) {
  const [collapsed, setCollapsed] = useState(true);
  const [ownersCollapsed, setOwnersCollapsed] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDetails, setTaskDetails] = useState("");

  const resetNewTaskForm = useCallback(() => {
    setSelectedMembers([]);
    setOwnersCollapsed(true);
    setCollapsed(true);
    setTaskName("");
    setTaskDetails("");
  }, []);

  const isInTaskMembers = useCallback(
    (memberId) => selectedMembers.some((id) => id === memberId),
    [selectedMembers],
  );

  const handleMemberSelection = useCallback(
    (memberId) => {
      if (isInTaskMembers(memberId)) {
        setSelectedMembers((prev) => prev.filter((id) => id !== memberId));
      } else {
        setSelectedMembers((prev) => [...prev, memberId]);
      }
    },
    [isInTaskMembers],
  );

  const handleNewTask = () => {
    resetNewTaskForm();
    alert("New Task Added");
  };

  const confirmCancelNewTask = () => {
    Alert.alert(
      "Discard new task?",
      "You have unsaved changes.",
      [
        { text: "Continue editing", style: "cancel" },
        {
          text: "Discard",
          style: "destructive",
          onPress: resetNewTaskForm,
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => (collapsed ? setCollapsed(false) : confirmCancelNewTask())}
      >
        <Text style={styles.addButtonText}>
          {collapsed ? "+ New Task" : "Cancel"}
        </Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        <View style={styles.newTask}>
          <TextInput 
            style={styles.taskNameInput} 
            placeholder="Task Name" 
            multiline
            numberOfLines={1}
            value={taskName} onChangeText={setTaskName} />
          <TextInput
            style={styles.taskDetailsInput}
            placeholder="Details..."
            multiline
            numberOfLines={2}
            value={taskDetails} onChangeText={setTaskDetails}
          />
          <View style={styles.ownersSection}>
            {selectedMembers.length > 0 ? (
              <View style={styles.ownersHeader}>
                <TouchableOpacity onPress={() => setSelectedMembers([])}>
                  <Ionicons name="close-circle" size={30} />
                </TouchableOpacity>
                <Text style={styles.ownersSelectedText}>Owners ({selectedMembers.length})</Text>
                <TouchableOpacity
                  onPress={() => setOwnersCollapsed((prev) => !prev)}
                >
                  <Ionicons name="add-circle" size={30} />
                </TouchableOpacity>
              </View>
            ) : (
                <View style={styles.ownersHeader}>
                  <Text style={styles.ownersText}>Owners</Text>
                  <TouchableOpacity
                    onPress={() => setOwnersCollapsed((prev) => !prev)}
                  >
                    <Ionicons name="add-circle" size={30} />
                  </TouchableOpacity>
                </View>
            )}
          </View>
          <Collapsible collapsed={ownersCollapsed}>
            <ScrollView style={styles.drawer}>
              {band.membersIds.map((memberId) => {
                const member = getObjectById(memberId, people);
                if (!member) {
                  return null;
                }
                const memberName = `${member.firstName} ${member.lastName}`;
                const selected = isInTaskMembers(memberId);
                return (
                  <TouchableOpacity
                    key={memberId}
                    onPress={() => handleMemberSelection(memberId)}
                  >
                    <Text style={styles.memberPickerText}>
                      {selected ? `☑   ${memberName}` : `⬚   ${memberName}`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Collapsible>
          
          <TouchableOpacity style={styles.submitButton} onPress={handleNewTask}>
            <Text style={styles.submitButtonText}>Submit Task</Text>
          </TouchableOpacity>
        </View>
      </Collapsible>
      <ScrollView style={styles.sectionContent}>
        {band.taskIds.map((taskId) => {
          const task = getObjectById(taskId, tasks);
          if (!task) {
            return null;
          }
          return <Task key={taskId} task={task} 
            setTaskName={setTaskName} setTaskDetails={setTaskDetails} 
            setSelectedMembers={setSelectedMembers} setCollapsed={setCollapsed} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    width: 120,
    height: 45,
    marginBottom: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  newTask: {
    width: "95%",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "grey",
    paddingBottom: 15,
  },
  taskNameInput: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    textAlign: "justify",
    fontWeight: "bold",
  },
  taskDetailsInput: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    textAlign: "justify",
    height: 80,
  },
  ownersSection: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  ownersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ownersText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  ownersSelectedText: {
    fontSize: 15,
    fontWeight: "bold",
    color: `${appBlue}`,
  },
  drawer: {
    width: 320,
    marginBottom: 10,
  },
  memberPickerText: {
    alignSelf: "flex-start",
    fontSize: 15,
    margin: 5,
  },
  sectionContent: {
    minHeight: 600,
  },
  submitButton: {
    backgroundColor: "black",
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
