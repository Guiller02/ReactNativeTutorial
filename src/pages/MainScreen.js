import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import api from '../services/api';

export default class Main extends Component {
  state = {
    productInfo: {},
    docs: [],
    page: 1,
  };

  static navigationOptions = {
    title: 'JSHunt',
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const res = await api.get(`/products?page=${page}`);

    const {docs, ...productInfo} = res.data;

    console.log(docs);

    this.setState({docs: [...this.state.docs, ...docs], productInfo, page});
  };

  loadMore = () => {
    const {page, productInfo} = this.state;

    if (page === productInfo.pages) {
      return;
    }

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };

  renderItem = ({item}) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          this.props.navigation.navigate('Product', {Product: item});
        }}>
        <Text style={styles.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.docs}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.3}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 20,
  },
  productContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flex: 0,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
    textAlign: 'justify',
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  productButtonText: {
    fontSize: 16,
    color: '#DA552F',
    fontWeight: 'bold',
  },
});
