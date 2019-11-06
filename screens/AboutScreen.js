import React from 'react';
import { ScrollView, StyleSheet, Text, Linking, TouchableOpacity } from 'react-native';

export default class AboutScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'About',
    headerStyle: {
      backgroundColor: '#446fb5',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  onPressNILF = () => {
    Linking.openURL('https://www.fantascienza.com/nilf/');
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Benvenuti nel nuovo Catalogo della Letteratura Fantastica</Text>
        <Text style={styles.testo}>Il Catalogo si prefigge lo scopo di elencare tutta le opere di narrativa e
        saggistica attinenti ai generi fantastici pubblicati in Italia.</Text>
        <Text style={styles.testo}>
        Per generi fantastici si intende tutto lo spettro di generi letterari che in
        qualsiasi modo escono dal realismo o dallo storico. Si parte dai generi tradizionali
        come fantascienza, fantasy e horror, per allargarsi a tutti i sottogeneri antichi
        o recenti: gotico, weird, urban fantasy, paranormal romance, eccetera.</Text>

        <Text style={styles.title}>Il Catalogo della Letteratura Fantastica e il Catalogo Vegetti</Text>
        <Text style={styles.testo}>
        Il Catalogo è l'ideale e pratica continuazione del Catalogo della Fantascienza,
        Fantasy e Horror curato principalmente da Ernesto Vegetti fino al gennaio 2010,
        anno della sua prematura scomparsa. Il lavoro di raccolta dati operato da Ernesto
        Vegetti è stato preciso e completo, forse persino oltre il replicabile. Ma il suo
        lavoro andava ben oltre, con l'arricchimento del Catalogo di indicazioni statistiche,
        di valutazioni qualitative, di categorizzazioni sistematiche.</Text>
        <Text style={styles.testo}>
        Il nuovo Catalogo per il momento non pretende di arrivare a tanto.
        L'obiettivo primario è offrire i semplici dati bibliografici, e ristabilire
        prima possibile un sistema di inserimento dati per recuperare il tempo perduto
        e colmare le lacune. Successivamente verranno introdotti nuovi strumenti,
        collettivi e basati sulla collaborazione degli utenti, per arricchire i dati
        con voti, valutazioni e quant'altro.</Text>

        <Text style={styles.testo}>Intanto il Catalogo della Letteratura Fantastica introduce il NILF:</Text>
        <TouchableOpacity onPress={this.onPressNILF}><Text style={styles.link}>scoprite cos'è.</Text></TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 19,
    paddingTop: 15,
    paddingBottom: 15,
    color: 'black',
    textAlign: 'center',
  },
  testo: {
    fontSize: 16,
    color: 'black',
    padding: 5,
  },
  link: {
    fontSize: 16,
    color: 'blue',
    padding: 5,
    paddingBottom: 10
  }
});
