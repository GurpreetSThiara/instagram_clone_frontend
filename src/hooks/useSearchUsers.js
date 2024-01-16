
import 'firebase/firestore';
import { useState } from 'react';
import searchResultsStore from '../store/searchResultsStore';
import { firestore } from '../Firebase/Firebase';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';



const useSearchUsers = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const setResults = searchResultsStore((s)=>s.updateProfiles);

   const searchUsers = async (searchTerm)=>{
    setIsLoading(true);

    console.log(searchTerm);
    console.log("ddddddddddddddddddddd");

  




    try {
        const q = query(collection(firestore,"users"),
            where("username", ">=", searchTerm.toLowerCase()),
            where("username", "<=", searchTerm.toLowerCase() + '\uf8ff'),
            orderBy("username"),
            limit(10) // Adjust the limit based on your UI requirements
          );
                  const qs=await getDocs(q);
        console.log(qs)
        console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
        if(qs.empty){
            return ;
        }
     
        const newUsers = [];
        qs.forEach((doc) => {
          const userData = doc.data();
          newUsers.push(userData);
        });

        setResults(newUsers);

  


      
    } catch (error) {
      console.error('Error searching users:', error);
    }
   }
  return {searchUsers,isLoading}
}

export default useSearchUsers
