import React from 'react';
import { ScrollView, StyleSheet, Text, FlatList, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Row, Column as Col} from 'react-native-responsive-grid';
import cio from '../libs/cheerio';
import Filter from '../components/Filter'

class BookScreen extends React.Component {
  static navigationOptions = {
    title: 'Book',
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
      books: [],
    }
  }

  fetchBook = async () => {
    let bookUri = this.props.navigation.getParam('bookUri', '')
    if (bookUri !== '') {
      let test = await fetch(bookUri)
      let $ = cio.load(await test.text())
      let books = []
      $('#main').each(function(i, item) {
          books[i] = {
            id: typeof $(this).find('reference').find('label') !== 'undefined' ? $(this).find('reference').find('label').text() : Math.round(Math.random() * 10000).toString(),
            title: $(this).find('h1').text(),
            author: $(this).find('.volume-autori').find('a').text(),
            info: [],
            opere: [],
    //         uri: 'https:' + $(this).find('h4').find('a').attr('href'),
            img: $(this).find('.copertina-volume').find('img').attr('src')}

            $(this).find('.volume-info').each(function(j, vinfo) {
              books[i]['info'].push($(this).text())
            })

            $(this).find('#elenco-opere dt').each(function(j, vinfo) {
              books[i]['opere'][j] = {
                titolo: $(this).find('a').first().text(),
                pagina: $(this).find('.pagina').text(),
                lunghezza: $(this).find('.lunghezza').text(),
                author: $(this).find('a').last().text(),
              }
            })
      })
      this.setState({ bookUri, books, loading: false })
    } else {
      this.setState({ loading: false })
    }
  }

  componentDidMount = () => {
    this.fetchBook()
  }

  componentDidUpdate = async (prevProps, prevState) => {
    let bookUri = this.props.navigation.getParam('bookUri', '')
    if (bookUri !== prevState.bookUri && !this.state.loading) {
      this.setState({ loading: true })
      await this.fetchBook()
    }
  }

  render() {
    let bookTitle = this.props.navigation.getParam('bookTitle', 'Nessun volume selezionato')

    let infos = null
    if (typeof this.state.books[0] !== 'undefined') {
      infos = this.state.books[0].info.map((e,index) => {
        return (
          <Text key={'info' + index} style={styles.info}>{e}</Text>
        )
      })
    }

    let opere = null
    if (typeof this.state.books[0] !== 'undefined') {
      opere = this.state.books[0].opere.map((e,index) => {
        return (
          <Row key={'row-opere' + index}>
            <Col size={20}>
              <Text key={'opere' + index} style={styles.subtitle}>{e.pagina}</Text>
            </Col>
            <Col size={80}>
              <Text key={'opere-other' + index} style={styles.subtitle}>{e.titolo} ({e.lunghezza}) {e.author !== e.titolo ? <Text style={{ textDecorationLine: 'underline'}}>{e.author}</Text> : ''}</Text>
            </Col>
          </Row>
        )
      })
    }
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{ bookTitle !== '' ? bookTitle : '---' }</Text>
        { this.state.loading ?
          <View style={styles.contentContainerStyle}><Image style={styles.loading} source={require('../assets/images/loading.gif')} /></View> :
          <View>
            <Row>
              <Col style={{padding: 5, alignSelf:'center'}} size={35}>
                <Image
                  style={{ width: 100, height: 200, resizeMode: 'contain'}}
                  source={{ uri: 'http:' + this.state.books[0].img }}
                />
              </Col>
              <Col style={{padding: 5, paddingTop: 20, alignSelf:'center'}} size={60}>
                <Text style={styles.author}>Autore: {this.state.books[0].author}</Text>
                {infos}
              </Col>
            </Row>
            <Row>
              <Col>
                <Text style={styles.author}>Contenuto del volume</Text>
                {opere}
              </Col>
            </Row>
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
  title: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    color: 'black',
  },
  info: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  author: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  loading: {
    height: 150,
    width: 150,
  }
});

export default BookScreen
