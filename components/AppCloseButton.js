import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const AppCloseButton = ({color, onPress}) => {
  const navigation = useNavigation()
  if (color == undefined){
    color = colors.black;
  }
  function handleClose() {
    if (onPress != undefined){
      onPress()
    }
    else{
      navigation.goBack()
    }
  };

  return(
    <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          handleClose()
        }}
        >
        <Text style={[styles.backText,{ color: color }]}>X</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  backText: {
    fontSize: 25,
    padding: 15,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    right: 10,
    zIndex: 999,
  },
});

export default AppCloseButton;