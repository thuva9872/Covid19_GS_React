import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    // const tokenString = document.cookie;
    const userToken = JSON.parse(tokenString);
    if (!userToken)return ""
    if (userToken.expiry<new Date().getTime()){
      localStorage.removeItem('token');
      return ""
    }
    return userToken.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    if (userToken){
    const data={token:userToken,expiry:new Date().getTime()+24*60*60*1000}
    localStorage.setItem('token', JSON.stringify(data));
    // document.cookie= JSON.stringify(userToken);
    setToken(userToken);
    }
    else{
      localStorage.removeItem('token')
    }
  };

  return {
    setToken: saveToken,
    token
  }
}
