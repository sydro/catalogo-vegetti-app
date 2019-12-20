import React from 'react'
import { ScrollView, StyleSheet, Text, FlatList, View, Image, TouchableOpacity } from 'react-native'
import Filter from '../components/Filter'
import cio from '../libs/cheerio'

class Item extends React.PureComponent {
  render() {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Text style={styles.title}>{this.props.item.title}</Text>
          <Text style={styles.subtitle}>{this.props.item.description}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Cerca',
    headerStyle: {
      backgroundColor: '#446fb5',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      loading: false,
      value: '',
    }
    this.KEY_PRESS_DELAY = 800
    this.handleClick = null
  }

  searchItems = value => {
    const now = new Date().getTime()
    clearTimeout(this.handleClick)
    this.handleClick = setTimeout(() => {
      this.setState({ loading: true })
      this.checkTerms(value)
    }, this.KEY_PRESS_DELAY)
  }

  checkTerms = async value => {
    searchUri = 'https://www.fantascienza.com/catalogo/ajax/_ricerca.php'
    let test = await fetch(searchUri + '?cerca=' + value)
    let result = JSON.parse(await test.text()).html[0]
    let $ = cio.load(result)
    let items = []
    $('.lista-ricerca dt').each(function(i, item) {
      items[i] = {
        id: $(this).attr('id'),
        title: $(this)
          .find('a')
          .text(),
        uri: $(this)
          .find('a')
          .attr('href'),
      }
    })
    $('.lista-ricerca dd').each(function(i, item) {
      items[i]['description'] = $(this).text()
    })
    this.setState({ items, loading: false, value })
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <Filter onChange={this.searchItems} onClear={() => this.setState({ items: [], value: '' })} />
        {this.state.loading ? (
          <View style={styles.contentContainerStyle}>
            <Image style={styles.loading} source={require('../assets/images/loading.gif')} />
          </View>
        ) : (
          <View>
            <FlatList
              data={this.state.items}
              renderItem={({ item }) => {
                let destination = ''
                if (item.uri.indexOf('collane') !== -1) destination = 'Series'
                else if (item.uri.indexOf('autori') !== -1) destination = 'Editors'
                else if (item.uri.indexOf('opere') !== -1) destination = 'Volumes'
                else if (item.uri.indexOf('volumi') !== -1) destination = 'Volumes'

                return <Item item={item} onPress={() => navigate(destination, { uri: item.uri, title: item.title })} />
              }}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </View>
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
    backgroundColor: '#9be8b5',
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
  },
})

export default SearchScreen
