import {create} from "zustand";//redux//provider

const useAllFollowers =create((set)=>({
    followers:null,
  
    setFollowers:(followers)=>set({followers})
}))

export default useAllFollowers;