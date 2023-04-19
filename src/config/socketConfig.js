import openSocket from 'socket.io-client'

const {hostname, protocol} = window.location;
const url = `${protocol}//${hostname}:5000`;
console.info({url});
const socket = openSocket(url);

export default socket;
