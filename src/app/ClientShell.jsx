'use client';

import { useDispatch, useSelector } from "react-redux";
import { ConfirmationModal, Loader, MessageModal } from "@/components";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { setConfirmationModal, setLoadingModal } from "@/redux/reducers/commonModalSlice";

export default function ClientShell({ children }) {
  const { loading_modal, confirmation_modal, message_modal } =
    useSelector((state) => state.commonModalReducer);

  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(setLoadingModal(false));
  }, [pathname, dispatch]);

  const getCancelHandler = () =>
    confirmation_modal.onCancel
      ? confirmation_modal.onCancel
      : () => dispatch(setConfirmationModal({ show: false }));

  return (
    <>
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
    </>
  );
}
