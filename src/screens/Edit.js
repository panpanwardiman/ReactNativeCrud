import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
    DatePickerAndroid,
    Picker
} from 'react-native';

export default class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.navigation.getParam('id'),
            name: '',
            email: '',
            birth: '',
            gender: '',
            phone: ''
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Update'
        }
    }

    componentDidMount() {
        return fetch('http://###/php_api/showById.php?id=' + this.state.id)
            .then((res) => res.json())
            .then((resJson) => {
                this.setState({
                    name: resJson.data.name,
                    email: resJson.data.email, 
                    birth: resJson.data.birth,
                    gender: resJson.data.gender,
                    phone: resJson.data.phone
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    update = () => {
        const {id, name, email, birth, gender, phone} = this.state
        return fetch('http://###/php_api/update.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: name,
                email: email, 
                birth: birth,
                gender: gender,
                phone: phone
            })
        })
        .then((response) => response.json())
        .then((resJson) => {
            Alert.alert(resJson.status)
            this.props.navigation.dispatch(this.props.navigation.navigate('Home'))
        })
        .catch((error) => {
            console.error(error)
        })      
    }

    showDatePicker = async (options) => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open(options);
            if (action !== DatePickerAndroid.dismissedAction) {
                let date = new Date(year, month, day)
                let newState = {}
                let formatDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
                newState['date'] = date
                newState['birth'] = formatDate
                this.setState(newState)
            }
        } catch ({code, message}) {
            console.warn(`error`, code, message)
        }
    }

    showDatePicker = async (options) => {
        try {
            const {
                action,
                year,
                month,
                day
            } = await DatePickerAndroid.open(options);
            if (action !== DatePickerAndroid.dismissedAction) {
                let date = new Date(year, month, day)
                let newState = {}
                let formatDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
                newState['date'] = date
                newState['dateText'] = formatDate
                newState['birth'] = newState['dateText']
                this.setState(newState)
            }
        } catch ({
            code,
            message
        }) {
            console.warn(`error`, code, message)
        }
    }

    render() {
        const {name, email, birth, gender, phone} = this.state

        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput 
                            onChangeText={(name) => this.setState({name})}
                            autoFocus={true}
                            autoCapitalize="words"
                            value={name}                        
                            style={styles.formInput} />
                    </View>
                    
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput 
                            onChangeText={(email) => this.setState({email})}
                            value={email}
                            autoCapitalize="none"
                            style={styles.formInput} />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Birth</Text>
                        <TouchableOpacity 
                            onPress={() => this.showDatePicker({date: this.state.date, mode: 'spinner'})}
                            style={styles.formInput}>
                            <Text style={styles.inputBirth}>{birth}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Gender</Text>
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue) => this.setState({gender: itemValue})}>     
                            <Picker.Item label="Laki - Laki" value="Laki - Laki"/>      
                            <Picker.Item label="Perempuan" value="Perempuan"/>
                        </Picker>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Phone</Text>
                        <TextInput 
                            onChangeText={(phone) => this.setState({phone})}
                            value={phone}
                            keyboardType="number-pad"
                            style={styles.formInput} />
                    </View>

                    <View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={this.update} 
                            style={styles.button}>
                            <Text style={styles.buttonFont}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15
    },
    formGroup: {
        marginBottom: 15
    },
    label: {
        marginBottom: 5,
        fontSize: 15
    },
    formInput: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 3,
        fontSize: 20
    },
    inputBirth: {
        fontSize: 20,
        color: 'black'
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