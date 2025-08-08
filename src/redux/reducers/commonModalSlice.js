import { createSlice } from '@reduxjs/toolkit';

const initialState= { 
    loading_modal: false,
    confirmation_modal:{
        show:false,
        message:"",
        onConfirm:null,
        onCancel:null,
    },
    message_modal:{
        show:false,
        message:"",
        type:"",
        onClose:null,
        response:{},
    }
}

const commonModalSlice = createSlice({
  name: 'commonModalReducer',
  initialState,
  reducers: {
    setLoadingModal: (state,action) => {state.loading_modal = action.payload},
    setMessageModal: (state,action) => {state.message_modal = action.payload},
    setConfirmationModal: (state,action) => {state.confirmation_modal = action.payload},
  },
});

export const { setLoadingModal, setMessageModal,setConfirmationModal } = commonModalSlice.actions;
export default commonModalSlice.reducer;
