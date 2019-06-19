import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    FlatList,
    ActivityIndicator, 
    TouchableOpacity,
    RefreshControl,
    StatusBar 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Home',
            headerRight: (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Add', {setForm: 'insert'})}>
                    <Icon name="plus" size={20} style={{marginRight: 15, color: 'black'}}/>
                </TouchableOpacity>
            )
        }
    }

    componentDidUpdate() {
        this.fetchData()
    }
    
    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        fetch('http://###/php_api/show.php')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.data
                }, function () {

                })
            })
            .catch((error) => {
                console.error(error)
        })
    }

    keyExtractor(item, index) {
        return item.id
    }

    renderItem({item}) {
        return(
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Details', {
                        id: item.id,
                        name: item.name                        
                    })
                }
                style={styles.itemContainer}>
                <View style={styles.itemRetangle}>
                    <Icon name='user' size={20} />
                </View>
                <View>
                    <Text style={styles.itemName}>{item.name}</Text>
                </View>
            </TouchableOpacity>         
        )
    }

    _onRefresh() {
        this.fetchData()
        setTimeout(function () {
            this.setState({
                refreshing: false
            })
        }.bind(this), 1000)
    }

    renderSeparator() {
        return(
            <View style={styles.separator}></View>
        )
    }

    render() {
        if (this.state.isLoading) {
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return(
            <View style={styles.container}>
                <StatusBar backgroundColor="#207702" barStyle="dark-content"/>
                <FlatList 
                    data={this.state.dataSource}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this.keyExtractor}
                    ItemSeparatorComponent={this.renderSeparator}
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                />                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
    }, 
    separator: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#ddd'
    }, 
    itemRetangle: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        borderRadius: 50,
        borderWidth: 0.5
    }
})