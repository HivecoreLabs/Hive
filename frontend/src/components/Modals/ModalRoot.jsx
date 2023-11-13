import React from "react";
import { useModalContext } from "../../contexts/ModalContext";
import FinalizeDayModal from "./FinalizeDayModal.jsx";

const ModalRoot = () => {

    const { modalType, modalProps } = useModalContext();

    if (modalType === 'FinalizeDayModal') {
        return <FinalizeDayModal {...modalProps} />
    } else {
        return null;
    }

};

export default ModalRoot;