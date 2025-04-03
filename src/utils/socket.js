// src/utils/socket.js
import { io } from 'socket.io-client';

// Replace with your backend URL
const socket = io("http://localhost:5000");

export default socket;
