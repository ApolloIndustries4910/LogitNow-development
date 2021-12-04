import Auth from './Auth'
import Config from './Config';
import Log from './Log'
import Projects from './Projects'
import Machines from './Machines'
import { combineReducers } from 'redux'

export default combineReducers({
    Auth: Auth,
    Config: Config,
    Log: Log,
    Projects:Projects,
    Machines:Machines
});
