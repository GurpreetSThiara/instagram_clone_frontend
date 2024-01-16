import {create} from "zustand";

const searchResultsStore =create((set)=>({
    profiles:[],
    updateProfiles:(profiles)=>set({profiles}),

}))

export default searchResultsStore;