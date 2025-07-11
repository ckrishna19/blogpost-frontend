import io from "socket.io-client";
import { useState, useEffect } from "react";
const createConnection = () => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socketConnection = io("http://localhost:5001", {
      withCredentials: true,
    });

    socketConnection.on("connect", () => {
      setSocket(socketConnection);
    });
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  return socket;
};

export default createConnection;
