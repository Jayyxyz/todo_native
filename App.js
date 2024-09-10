import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editKey, setEditKey] = useState(null);

  const addTask = () => {
    if (task.length > 0) {
      if (isEditing) {
        const updatedTasks = taskList.map((item) => (item.key === editKey ? { ...item, task } : item));
        setTaskList(updatedTasks);
        setIsEditing(false);
        setEditKey(null);
      } else {
        setTaskList([...taskList, { key: Math.random().toString(), task }]);
      }
      setTask('');
      setShowInput(false);
    }
  };

  const removeTask = (key) => {
    setTaskList(taskList.filter((item) => item.key !== key));
  };

  const editTask = (item) => {
    setTask(item.task);
    setShowInput(true);
    setIsEditing(true);
    setEditKey(item.key);
  };

  return (
    <SafeAreaView style={styles.cont}>
      <ImageBackground style={styles.background} source={require('./assets/planet-background.jpg')}>
        <View style={styles.container}>
          <Text style={styles.title}>iTaskme</Text>

          {!showInput ? (
            <TouchableOpacity style={styles.addButton} onPress={() => setShowInput(true)}>
              <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter a task"
                onChangeText={(text) => setTask(text)}
                value={task}
              />
              <TouchableOpacity style={styles.saveButton} onPress={addTask}>
                <Text style={styles.saveButtonText}>{isEditing ? 'Update' : 'Add'}</Text>
              </TouchableOpacity>
            </View>
          )}

          <FlatList
            data={taskList}
            renderItem={({ item }) => (
              <View style={styles.taskItemContainer}>
                <Text style={styles.taskItem}>{item.task}</Text>
                <View style={styles.taskButtons}>
                  <TouchableOpacity style={styles.editButton} onPress={() => editTask(item)}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => removeTask(item.key)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
  container: {
    marginTop: 120,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  title: {
   
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#33ffcc',
    
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#33ffcc',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingHorizontal: 15,
    backgroundColor: '#2d2d30',
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
    shadowColor: '#33ffcc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  },
  addButton: {
    backgroundColor: '#33ffcc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#33ffcc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'transparent',
    borderColor: '#33ffcc',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
  },
  taskItem: {
    flex: 1,
    fontSize: 16,
    color: '#33ffcc'
    
  },
  taskButtons: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#33ffcc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  editButtonText: {
    color: 'black',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#33ffcc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  background: {
    width: '100%',
    height: '100%',
  },
});
