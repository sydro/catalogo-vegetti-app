import React from 'react';
import { ScrollView, StyleSheet, Text, FlatList, View, Image, TouchableOpacity } from 'react-native';
import cio from '../libs/cheerio';

class Item extends React.PureComponent {

  render() {
    let title = this.props.item.title.split('(')
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Text style={styles.title}>{title[0]}</Text>
          <Text style={styles.subtitle}>({title[1]}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class EditorsScreen extends React.Component {
  static navigationOptions = {
    title: 'Editori e collane',
  }

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true
    }
  }

  componentDidMount = async () => {
    let test = await fetch('https://www.fantascienza.com/catalogo/editori/')
    let $ = cio.load(await test.text())
    let items = []
    $('.elenco-editori dt').each(function(i, item) {
      items[i] = { title: $(this).text().trim(), id: $(this).attr('id'), uri: 'https:' + $(this).find('a').attr('href')}
    })
    this.setState({ items, loading: false })
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
      { this.state.loading ?
        <View style={styles.contentContainerStyle}><Image style={styles.loading} source={require('../assets/images/loading.gif')} /></View> :
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => <Item item={item} onPress={() => navigate('Series', { editorUri: item.uri, editorTitle: item.title.split('(')[0]})} />}
          keyExtractor={item => item.id}
          />
       }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 15,
    marginTop: 10,
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#5fba7d',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
  loading: {
    height: 150,
    width: 150,
  }
});

export default EditorsScreen
