import {create} from "zustand";


const useUploadFileStore =create((set)=>({
    image:null,
    setImage:(image)=>set({image}),
    removeImage:(image)=>set({image}),
}))

export default useUploadFileStore;