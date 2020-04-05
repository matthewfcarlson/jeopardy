import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import cookie from 'js-cookie';
import auth from '@feathersjs/authentication-client'

export const host = process.env.API_HOST || 'http://localhost:3000'

const socket = io(host); // TODO figure out our current location
const feathersClient = feathers();

const feathersStorage = {
getItem: (key:string) => cookie.get(key),
removeItem: (key:string) => cookie.remove(key),
setItem: (key:string, value:any) => cookie.set(key, value)
}

feathersClient.configure(socketio(socket));
feathersClient.configure(auth({ storage: feathersStorage }) as any)

const gameService = feathersClient.service('games');
console.log(gameService);


export default feathersClient