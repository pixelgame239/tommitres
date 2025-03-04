import { useState, useEffect } from "react";

const UserProfile = () => {
    const [user, setUser] = useState({
        userType:null
    });

    useEffect(() => {
      // Load user data from localStorage
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const parsedUser = JSON.parse(currentUser);
        console.log(currentUser);
        console.log(`return value: ${parsedUser}`);
        setUser({ userType: parsedUser.username });
        console.log(`return real ${parsedUser.username}`);
      }
    }
    , []);
    return user;
}
export default UserProfile;