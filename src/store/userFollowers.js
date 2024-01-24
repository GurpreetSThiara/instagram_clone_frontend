import {create} from "zustand";

const useAllFollowers =create((set)=>({
    followers:null,
  
    setFollowers:(followers)=>set({followers})
}))

export default useAllFollowers;