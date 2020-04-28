import {createContext} from 'react';

interface IauthCTX {
    token: string | null;
}

export const AuthContext = createContext<IauthCTX>({token: null});