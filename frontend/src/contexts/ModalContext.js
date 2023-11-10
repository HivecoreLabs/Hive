import React, { createContext, useContext, useReducer } from "react";

const ModalContext = createContext();
export const useModalContext = () => useContext(ModalContext);

const OPEN_MODAL = 'modal/OPEN_MODAL';
const CLOSE_MODAL = 'modal/CLOSE_MODAL'

const openModal = (modalType, modalProps = {}) => {
    return {
        type: 'OPEN_MODAL',
        modalType,
        modalProps
    };
}

const closeModal = () => {
    return {
        type: 'CLOSE_MODAL'
    };
}

const initialState = {
    modalType: null,
    modalProps: {}
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            };
        case 'CLOSE_MODAL':
            return initialState;
        default:
            return state;
    };
};

const ModalContextProvider = ({ children }) => {
    const [state, modalDispatch] = useReducer(modalReducer, initialState);

    const value = {
        modalType: state.modalType,
        modalProps: state.modalProps,
        modalDispatch,
        openModal,
        closeModal
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
};

export default ModalContextProvider;

