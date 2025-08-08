"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationModal, Loader, MessageModal } from "@/components";
import PropTypes from "prop-types";
import { usePathname } from "next/navigation";
import { setConfirmationModal, setLoadingModal } from "@/redux/reducers/commonModalSlice";

Template.propTypes = {
    children: PropTypes.node.isRequired,
};

export default function Template({ children }) {
    const { loading_modal, confirmation_modal, message_modal } = useSelector((state) => state.commonModalReducer);

    const dispatch = useDispatch();
    const pathname = usePathname();

    useEffect(() => {
        dispatch(setLoadingModal(false));
    }, [pathname, dispatch]);

    const getCancelHandler = () => {
        return confirmation_modal.onCancel
            ? confirmation_modal.onCancel
            : () => dispatch(setConfirmationModal({ show: false }));
    };

    return (
        <div>
            <Loader show={loading_modal} />
            <ConfirmationModal
                show={confirmation_modal.show}
                message={confirmation_modal.message}
                onConfirm={confirmation_modal.onConfirm}
                onCancel={getCancelHandler()}
            />
            <MessageModal
                show={message_modal.show}
                message={message_modal.message}
                type={message_modal.type}
                onClose={message_modal.onClose}
                response={message_modal.response}
            />
            {children}
        </div>
    );
}
