import {create} from "zustand";//redux//provider

const useAuthStore =create((set)=>({
    user:JSON.parse(localStorage.getItem("instaUser")),
    login:(user)=>set({user}),
    logout:()=>set({user:null}),
    setUser:(user)=>set({user})
}))

export default useAuthStore;