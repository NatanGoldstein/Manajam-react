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
import { bands } from '../temp_data/Bands'
import BandHeader from '../components/BandHeader'

export default function BandssScreen(){

    return(
        <SafeAreaView style={styles.Container}>
            <Text style={styles.headLine}>My Bands</Text>
            <ScrollView>
                {bands.map(
                    band => <BandHeader key={band.id} band={band} />
                )}
            </ScrollView>
        </SafeAreaView>
    );   
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    headLine: {
        height: 50,
        alignSelf: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        paddingTop: 10,
    },
});