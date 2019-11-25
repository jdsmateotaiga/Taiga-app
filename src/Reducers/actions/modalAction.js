export const modalOpenAction = (mode, title) => {
    return { 
        type: 'MODAL_OPEN',
        mode,
        title
    }
}

export const modalCloseAction = () => {
    return { 
        type: 'MODAL_CLOSE'
    }
}