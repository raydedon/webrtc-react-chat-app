import openSocket from 'socket.io-client'

const {hostname, protocol} = window.location;
const url = `${protocol}//${hostname}:3010`;
console.info({url});
const socket = openSocket(url);

export default socket;
