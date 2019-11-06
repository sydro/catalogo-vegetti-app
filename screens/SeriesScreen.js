import React from 'react';
import { ScrollView, StyleSheet, Text, FlatList, View, Image, TouchableOpacity } from 'react-native';
import { Row, Column as Col} from 'react-native-responsive-grid';
import cio from 'cheerio-without-node-native';

class Item extends React.PureComponent {

  render() {
    let title = this.props.item.title.split('(')
    return (
      <View style={styles.item} key={this.props.item.id}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Row>
            <Col style={{padding: 5, alignSelf:'center'}} size={20}>
              <Image
                style={{width: 50, height: 75 }}
                source={{ uri: 'http:' + this.props.item.img }}
              />
            </Col>
            <Col style={{padding: 5, alignSelf:'center'}} size={80}>
              <Text style={styles.title}>{title[0]}</Text>
              <Text style={styles.subtitle}>({title[1]}</Text>
            </Col>
          </Row>
        </TouchableOpacity>
      </View>
    )
  }
}

class SeriesScreen extends React.Component {
  static navigationOptions = {
    title: 'Collane',
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      editorUri: '',
      items: []
    }
  }

  fetchItems = async () => {
    let editorUri = this.props.navigation.getParam('editorUri', '')
    if (editorUri !== '') {
      let test = await fetch(editorUri)
      let $ = cio.load(await test.text())
      let items = []
      $('.lista-collane dt').each(function(i, item) {
        let uri = $(this).find('a').attr('href').indexOf('cover') ? $(this).find('a').last().attr('href') : $(this).find('a').attr('href')
        items[i] = {
          title: $(this).text().trim(),
          id: $(this).attr('id'),
          uri: 'https:' + uri,
          img: $(this).find('img').attr('src')}
      })
      this.setState({ editorUri, items, loading: false })
    } else {
      this.setState({ loading: false })
    }
  }

  componentDidMount = () => {
    this.fetchItems()
  }

  componentDidUpdate = async (prevProps, prevState) => {
    let editorUri = this.props.navigation.getParam('editorUri', '')
    if (editorUri !== prevState.editorUri && !this.state.loading) {
      this.setState({ loading: true })
      await this.fetchItems()
    }
  }

  render() {
    let editorTitle = this.props.navigation.getParam('editorTitle', 'Nessun editore selezionato')
    const {navigate} = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{ editorTitle }</Text>
        { this.state.loading ?
          <View style={styles.contentContainerStyle}><Image style={styles.loading} source={require('../assets/images/loading.gif')} /></View> :
          <FlatList
            data={this.state.items}
            renderItem={({ item }) => <Item item={item} onPress={() => navigate('Volumes', { serieUri: item.uri, serieTitle: item.title.split('(')[0]})} />}
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
    backgroundColor: '#5fba7f',
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

export default SeriesScreen
