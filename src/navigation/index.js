import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/Home'
import DetailsScreen from '../screens/Details'
import AddScreen from '../screens/Add'
import EditScreen from '../screens/Edit'

const stackNavigtor = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen,
    Add: AddScreen,
    Edit: EditScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#2b9806',
            color: 'white'
        }
    }
})

export default createAppContainer(stackNavigtor);