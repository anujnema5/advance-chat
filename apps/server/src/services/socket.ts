import { Server } from 'socket.io'

export default class SocketService {
    private _io: Server;

    constructor() {
        console.log("Init socket server");
        this._io = new Server({
            cors: {
                credentials: true,
                origin: '*',
                allowedHeaders: ['*']
            }
        });
    }

    get io() {
        return this._io
    }

    public initListners(){
        console.log('Initializing socket listner');

        this._io.on('connect', async(socket)=> {
            console.log("New socket connected ", socket.id);

            socket.on('event:message', async({message}: {message: string})=> {
                console.log(`New Message Rec. ${message}`)
            })
        })
    }
}