import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
  },
  flex: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  inputBox: {
    flex: 5,
    padding: 5,
    backgroundColor: "#ecf0f1",
    borderRadius: 4,
    fontSize: 25,
  },
  headingText: {
    textAlign: 'center',
    fontSize: 30,
    padding: 10
  },
  itemText: {
    textAlign: 'center',
    fontSize: 30,
    padding: 10
  },
  verCenter:{
    flex:1,
    justifyContent: 'center',
  }
})

const buttons = StyleSheet.create({
  removeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButton: {
    flex: 1,
    backgroundColor: "#c0392b",
    borderRadius: 4,
    width: "90%",
    marginLeft: "10%",
  },
  list: {
    marginBottom: 10,
    paddingVertical:10,
    backgroundColor: '#9b59b6',
    borderRadius: 5,
  },
  textStyle: {
    fontSize:20,
    color: '#ffffff',
    textAlign: 'center'
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  listButtons: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  addItem: {
    paddingVertical:10,
    backgroundColor: '#27ae60',
    borderRadius:5,
    marginBottom: 10,
  },
  saveList: {
    paddingVertical:10,
    backgroundColor: '#2980b9',
    borderRadius:5,
  },
  addList: {
    paddingVertical:10,
    backgroundColor: '#27ae60',
    borderRadius:5,
  },
  generateButton: {
    paddingVertical:10,
    backgroundColor: '#27ae60',
    borderRadius:5,
    marginBottom: 10,
  },
  deleteButton: {
      paddingVertical:10,
      backgroundColor: '#c0392b',
      borderRadius: 5,
  },
  editButton: {
      paddingVertical:10,
      marginBottom: 10,
      backgroundColor: '#2980b9',
      borderRadius: 5,
  },
})

export {styles, buttons }
