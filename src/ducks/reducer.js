const initialState = {

    username: '',
    image: '',

}

const UPDATE_USER = 'UPDATE_USER';
const UPDATE_POST = 'UPDATE_POST';
const LOGOUT = 'LOGOUT';

export default function reducer(state = initialState, action) {
    let { type, payload } = action;

    switch(type) {
        
        case UPDATE_USER:
            return { ...state, username: payload.username, image: payload.image };

        case UPDATE_POST: 
            return { ...state, ...payload };

        case LOGOUT: 
            return initialState;

        default: return state;
    }
};

export function updateUser( user ) {
    return {
        type: UPDATE_USER,
        payload: user,
    };
}

export function updatePost( post ) {
    return {
        type: UPDATE_POST,
        payload: post,
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}

