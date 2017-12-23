import { NavigationActions } from 'react-navigation';
import Root from '../components/Root';

const initialState = Root.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action) => {
    const newState = Root.router.getStateForAction(action, state);
    return newState || state;
};
