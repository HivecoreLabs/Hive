import React from "react";
import { useModalContext } from "../../contexts/ModalContext";
import FinalizeDayModal from "./FinalizeDayModal.jsx";
import ChangeDateModal from "./ChangeDateModal.jsx";

const ModalRoot = () => {

    const { modalType, modalProps } = useModalContext();

    if (modalType === 'FinalizeDayModal') {
        return <FinalizeDayModal {...modalProps} />
    } else if (modalType === 'ChangeDateModal') {
        return <ChangeDateModal {...modalProps} />
    } else {
        return null;
    }

};

export default ModalRoot;