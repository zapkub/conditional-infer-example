enum BackendCommand {
    CONNECT = 'CONNECT',
    GET_USERS = 'GET_USERS',
    GET_DESKS = 'GET_DESKS',
}

type AnyBackendCommand = 
{ type: BackendCommand.CONNECT; } |
{ type: BackendCommand.GET_DESKS; payload: number } |
{ type: BackendCommand.GET_USERS; payload: string };

type AnyBackendCommandResult = {
    [BackendCommand.GET_DESKS]: string[];
    [BackendCommand.GET_USERS]: number[];
}

type GlobalCommand = AnyBackendCommand;
type GlobalCommandResult = AnyBackendCommandResult;
type GlobalCommandPayload<T extends GlobalCommand, N extends GlobalCommand['type']> = (T extends { type: N; payload: infer U } ? U : undefined)
type GlobalCommandHandler = {
    [T in GlobalCommand['type']]?: (payload: GlobalCommandPayload<GlobalCommand, T>) => Promise<T extends keyof GlobalCommandResult ? GlobalCommandResult[T] : void>;
}

interface Transport {
    SendCommand<T extends GlobalCommand>(command: T): Promise<T['type'] extends keyof GlobalCommandResult ? GlobalCommandResult[T['type']] : void>;
}


const createHandler = (): GlobalCommandHandler => {
    return {
        [BackendCommand.GET_DESKS]: async (payload) => {
            return ['desk-1', 'desk-2']
        },
        [BackendCommand.GET_USERS]: async (payload) => {
            return [0, 1]
        },
        [BackendCommand.CONNECT]: async (payload) => {
            return
        }
    }
}



const initService = async (transport: Transport) => {

    const getUsersResult = await transport.SendCommand({
        type: BackendCommand.GET_USERS,
        payload: 'test-1'
    })

    const getDesksResult = await transport.SendCommand({
        type: BackendCommand.GET_DESKS,
        payload: 0,
    })

}

export {};