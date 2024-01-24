import {create} from "zustand";

const useAllFollowings =create((set)=>({
    followings:null,
  
    setFollowings:(followings)=>set({followings})
}))

export default useAllFollowings;