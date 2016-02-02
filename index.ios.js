/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

var REQUEST_URL = 'https://data.btcc.com/data/ticker?market=btccny';

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: null,
    };
  }
  componentDidMount() {
    this.fetchData();
    setInterval((() => {
      this.fetchData()
    }).bind(this),2000);
  }
  fetchData() {
    var self = this;
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          ticker: responseData.ticker,
        });
      })
      .done();
  }
  render() {
    if (!this.state.ticker) {
      return this.renderLoadingView();
    }

    var ticker = this.state.ticker;
    return this.renderBTCCNY(ticker);
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading BTC / CNY...
        </Text>
      </View>
    );
  }

  renderBTCCNY(movie) {
    var last = this.state.ticker.last
    var prevClose = this.state.ticker.prev_close
    return (
      <View style={styles.container}>
        <Image source={require('./img/logo.png')} />
        <Text style={[styles.content, styles.title]}>
          BTC / CNY
        </Text>
        <Text style={[styles.content, styles.last]}>
          {parseFloat(last).toFixed(2)}
        </Text>
        <Text style={[styles.content, styles.percent]}>
          {(last - prevClose) > 0 ? "+ " : "- "}
          {((last - prevClose) / prevClose * 100).toFixed(2)}%
        </Text>
        <Text style={[styles.content, styles.volume]}>
          Vol: {parseInt(this.state.ticker.vol)}
        </Text>
        <Text style={[styles.content, styles.footer]}>
          Powered by BTCC.com
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#666',
  },
  content: {
    fontSize: 20,
    color: '#fff',
  },
  title: {
    fontWeight: 'bold',
    margin: 10,
    marginBottom: 15,
  },
  last: {
    fontSize: 40,
    marginBottom: 10,
  },
  percent: {
    marginBottom: 10,
  },
  volume: {
    marginBottom: 15,
  },
  footer: {
    fontSize: 12,
    color: '#999',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
