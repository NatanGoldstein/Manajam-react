import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { appBlue } from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Filter = ({ tabs, options, onChangeFilters }) => {
  // selectedOptions mirrors options: array of arrays
  const [selectedOptions, setSelectedOptions] = useState(
    options.map(tabOptions => [...tabOptions]) // start with all checked
  );
  useEffect(() => {
    setSelectedOptions(options.map(tabOptions => [...tabOptions]));
  }, [options]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const activeIndex = Math.max(0, tabs.indexOf(activeTab));

  const toggleOption = (option) => {
    setSelectedOptions(prev => {
      const updated = [...prev];
      const tabList = updated[activeIndex] || [];
      updated[activeIndex] = tabList.includes(option)
        ? tabList.filter(o => o !== option) // remove
        : [...tabList, option];             // add
      onChangeFilters?.(updated); // send to parent if needed
      return updated;
    });
  };

  const clearAll = () => {
    const reset = options.map(list => [...list]);
    setSelectedOptions(reset);
    onChangeFilters?.(reset);
  };

  const unSelectAll = () => {
    setSelectedOptions(prev => {
      const updated = [...prev];
      updated[activeIndex] = [];
      onChangeFilters?.(updated);
      return updated;
    });
  };

  // Check if ANY tab has a filter applied
  const anyTabHasFilter = selectedOptions.some((sel, i) => sel.length < (options[i]?.length || 0));

  // Check if a specific tab has a filter applied
  const tabHasFilter = (i) => selectedOptions[i]?.length < (options[i]?.length || 0);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons
          name="filter"
          size={40}
          color={anyTabHasFilter ? appBlue : 'black'}
        />
        {anyTabHasFilter && (
          <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
            <Text style={styles.clearButtonText}>×</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Tabs */}
            <View style={styles.tabBar}>
              {tabs.map((tab, i) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tab, activeTab === tab && styles.activeTab]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab && styles.activeTabText,
                      tabHasFilter(i) && { color: appBlue } // mark filtered tabs
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Options list */}
            <ScrollView>
              <TouchableOpacity onPress={unSelectAll}>
                <Text style={styles.unSelectText}>Remove All</Text>
              </TouchableOpacity>

              {(options[activeIndex] || []).map((option) => {
                const isSelected = (selectedOptions[activeIndex] || []).includes(option);
                return (
                  <TouchableOpacity
                    key={option}
                    style={[styles.option, isSelected && styles.optionSelected]}
                    onPress={() => toggleOption(option)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected
                      ]}
                    >
                      {isSelected ? `☑   ${option}` : `⬚   ${option}`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Apply button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  clearButton: {
    position: 'absolute',
    left: -10,
    top: -10,
    backgroundColor: '#000',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    maxHeight: '60%',
    minHeight: '40%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  optionText: {
    color: '#000',
    fontSize: 18
  },
  optionTextSelected: {
    color: 'black'
  },
  closeButton: {
    margin: 20,
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17
  },
  unSelectText: {
    textDecorationLine: 'underline',
    paddingTop: 20
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Filter;
