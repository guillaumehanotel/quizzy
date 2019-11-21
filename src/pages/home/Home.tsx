import React, { useReducer } from 'react';
import './Home.scss'
import { useStore, useGlobalState } from '../../storeProvider';
import * as actions from '../../config/actions'

const Home: React.FC = () => {
    const dispatch = useStore();
    const state = useGlobalState();

    return (
        <div>
            HOME
        </div>
    )
}

export default Home;