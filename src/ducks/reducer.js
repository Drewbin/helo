const initialState = {

    user_id: '',
    username: '',
    profile_pic: '',

}

const UPDATE_USER = 'UPDATE_USER';

export default function reducer(state = initialState, action) {
    let { type, payload } = action;

    switch(type) {
        
        case UPDATE_USER:
            return { ...state, ...payload };

        default : return state;
    }
}

export function updateUser( user ) {
    return {
        type: UPDATE_USER,
        payload: user,
    }
}

