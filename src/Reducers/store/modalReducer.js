const initState = {
    modalIsOpen: false,
    modalMode: null,
    modalTitle: null
}

const modalReducer = (state = initState, action) => {
    switch(action.type) {
        case 'MODAL_OPEN':
            return {
                ...state,
                modalIsOpen: true,
                modalMode: action.mode,
                modalTitle: action.title
            }
        case 'MODAL_CLOSE':
            return {
                ...state,
                modalIsOpen: false,
                modalMode: null,
                modalTitle: null
            }
        default:
            return state
    }


}

export default modalReducer;
