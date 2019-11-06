import React from 'react';
import { ScrollView, StyleSheet, Text, FlatList, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Row, Column as Col} from 'react-native-responsive-grid';
import cio from '../libs/cheerio';
import Filter from '../components/Filter'

class Item extends React.PureComponent {

  render() {
    if (this.props.item.title !== '') {
      return (
        <View style={styles.item}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Row>
              <Col style={{padding: 5, alignSelf:'center'}} size={20}>
                <Image
                  style={{width: 50, height: 75 }}
                  source={{ uri: 'http:' + this.props.item.img }}
                />
              </Col>
              <Col style={{padding: 5, alignSelf:'center'}} size={80}>
                <Text style={styles.title}>{this.props.item.title}</Text>
                <Text style={styles.subtitle}>{this.props.item.author}</Text>
                {this.props.item.numero !== '-' && <Text style={styles.subtitle}>Numero: {this.props.item.numero}</Text>}
              </Col>
            </Row>
          </TouchableOpacity>
        </View>
      )
    } else {
      return null
    }
  }
}

class VolumesScreen extends React.Component {
  static navigationOptions = {
    title: 'Volumi',
    headerStyle: {
      backgroundColor: '#446fb5',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      serieUri: '',
      items: [],
      allItems: []
    }
  }

  fetchItems = async () => {
    let serieUri = this.props.navigation.getParam('serieUri', '')
    if (serieUri !== '') {
      let test = await fetch(serieUri)
      let $ = cio.load(await test.text())
      let items = []
      $('.lista-volumi-collana li').each(function(i, item) {
          items[i] = {
            id: typeof $(this).attr('id') !== 'undefined' ? $(this).attr('id') : Math.round(Math.random() * 10000).toString(),
            numero: typeof $(this).find('.numero') !== 'undefined' ? $(this).find('.numero').text() : '-',
            title: $(this).find('h4').find('a').text(),
            author: $(this).find('h4').find('.autore').text(),
            uri: 'https:' + $(this).find('h4').find('a').attr('href'),
            img: $(this).find('img').attr('src')}
      })
      this.setState({ serieUri, items, allItems: items, loading: false })
    } else {
      this.setState({ loading: false })
    }
  }

  filterItems = (text) => {
    let items = []
    if (text !== '') {
      let check = text.toLowerCase()
      items = this.state.allItems.filter( item =>
        item.title.toLowerCase().indexOf(check) !== -1 ||
        item.author.toLowerCase().indexOf(check) !== -1)
    } else {
      items = this.state.allItems
    }
    this.setState({ items })
  }

  componentDidMount = () => {
    this.fetchItems()
  }

  componentDidUpdate = async (prevProps, prevState) => {
    let serieUri = this.props.navigation.getParam('serieUri', '')
    if (serieUri !== prevState.serieUri && !this.state.loading) {
      this.setState({ loading: true })
      await this.fetchItems()
    }
  }

  render() {
    let serieTitle = this.props.navigation.getParam('serieTitle', 'Nessuna collana selezionata')

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{ serieTitle !== '' ? serieTitle : '---' }</Text>
        { this.state.loading ?
          <View style={styles.contentContainerStyle}><Image style={styles.loading} source={require('../assets/images/loading.gif')} /></View> :
          <View>
            <Filter onChange={this.filterItems}/>
            <FlatList
              data={this.state.items}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={item => item.id}
              />
          </View>
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
    backgroundColor: '#d4e3fb',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
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

export default VolumesScreen
