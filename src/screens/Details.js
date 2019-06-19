import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.navigation.getParam('id'),
            data: [],
        }     
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Details ' + navigation.state.params.name
        }
        
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        return fetch('http://###/php_api/showById.php?id=' + this.state.id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson.data,
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    Delete = () => {
        return fetch('http://###/2019/php_api/delete.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id
            })
        })
        .then((res) => res.json())
        .then((resJson) => {
            Alert.alert(resJson.status)
            this.props.navigation.dispatch(this.props.navigation.goBack())
        })
        .catch((error) => {
            console.error(error)
        })
    }

    render() {  
        const {data} = this.state
        const {navigation} = this.props

        return(
            <View style={styles.container}> 
                <View style={styles.detailContainer}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>{data.name}</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>{data.email}</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>{data.birth}</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>{data.gender}</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>{data.phone}</Text>
                    </View>
                </View>
                
                <View style={styles.handlerContainer}>
                    <View style={{flex: 1, marginRight: 5}}>
                        <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('Edit', {id: data.id})}
                            style={styles.button}>
                            <Text style={styles.buttonFont}>Edit</Text>
                        </TouchableOpacity>
                    </View>    

                    <View style={{flex: 1, marginLeft: 5}}>
                        <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress={this.Delete}
                            style={styles.button}>  
                            <Text style={styles.buttonFont}>Delete</Text>             
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    detailContainer: {
        margin: 15,
        backgroundColor: '#ddd',
        borderRadius: 3
    },
    itemContainer: {
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    item: {
        fontSize: 18,
    },
    handlerContainer: {        
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
    },
    button: {
        backgroundColor: '#2b9806',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 3
    },
    buttonFont: {
        fontSize: 15,
        color: 'black'
    }
})