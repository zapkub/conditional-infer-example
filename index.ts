
enum BackendCommand {
    CONNECT = 'CONNECT',
    GET_USERS = 'GET_USERS',
    GET_DESKS = 'GET_DESKS',
}

type AnyBackendCommand =  // check ยังไงว่าตรงนี้ห้ามซ้ำ
{ type: BackendCommand.CONNECT; payload: undefined } |
{ type: BackendCommand.GET_DESKS; payload: number } |
{ type: BackendCommand.GET_USERS; payload: string };

type AnyBackendCommandResult = {
    [BackendCommand.GET_DESKS]: string[];
    [BackendCommand.GET_USERS ]: number[];
}

type GlobalCommand = AnyBackendCommand;
type GlobalCommandResult = AnyBackendCommandResult;

interface Transport {
    SendCommand<T extends GlobalCommand>(command: T): Promise<T['type'] extends keyof AnyBackendCommandResult ? AnyBackendCommandResult[T['type']] : void>; // main and slave interop with broadcast channel API
}



type NarrowByType<Type extends GlobalCommand['type'], U = GlobalCommand> = U extends { type: Type } ? U : never;
type GlobalCommandPayload<Type extends GlobalCommand['type']> = NarrowByType<Type> extends { payload: infer PayloadType } ? PayloadType : never;
type GetDesksPayload = GlobalCommandPayload<BackendCommand.CONNECT>




type GlobalCommandHandlers = {
    [key in GlobalCommand['type']]?: (payload: GlobalCommandPayload<key>) => Promise<key extends keyof AnyBackendCommandResult ? AnyBackendCommandResult[key] : void>
} 


const createHandler = (): GlobalCommandHandlers => {
    return {
        [BackendCommand.GET_DESKS]: async (payload) => {
            return ['desk-1', 'desk-2']
        },
        [BackendCommand.GET_USERS]: async (payload) => { // code smell of un-predictable args type and return type
            return [0, 1]
        },
        [BackendCommand.CONNECT]: async () => {
            return;
        }
    }
}



const initService = async (transport: Transport) => {

    const getUsersResult = await transport.SendCommand({ // code smell of un-predictable result type
        type: BackendCommand.GET_USERS,
        payload: 'test-1'
    })

    const getDesksResult = await transport.SendCommand({
        type: BackendCommand.GET_DESKS,
        payload: 0,
    })

    const connectResult = await transport.SendCommand({ type: BackendCommand.CONNECT, payload: undefined })
}

export {};