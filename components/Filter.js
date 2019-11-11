import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class Filter extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  onChange = text => {
    this.setState({ text })
    this.props.onChange(text)
  }

  onClear = () => {
    this.setState({ text: '' })
    this.props.onClear()
  }
  render() {
    return (
      <View>
        <Ionicons name={'ios-search'} size={26} style={styles.icon} />
        <TextInput style={styles.textinput} onChangeText={this.onChange} value={this.state.text} />
        <TouchableOpacity onPress={this.onClear} style={styles.trash}>
          <Ionicons name={'ios-trash'} size={26} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 25,
    top: 11,
    position: 'absolute'
  },
  trash: {
    top: 11,
    marginRight: -5,
    right: 0,
    position: 'absolute',
    width: 50
  },
  textinput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    paddingLeft: 35,
    margin: 15,
    marginTop: 5,
    borderRadius: 5
  }
})
