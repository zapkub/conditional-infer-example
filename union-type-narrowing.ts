
enum EventName {
    first,
    second,
    third
}

type FirstEvent = {
    type: EventName.first
}
type SecondEvent = {
    type: EventName.second
    payload: boolean
}
type ThirdEvent = {
    type: EventName.third
    payload: number
}



type UnionType = FirstEvent | SecondEvent | ThirdEvent;





type NarrowByType<Type extends UnionType['type'], U = UnionType> = U extends { type: Type } ? U : never;
type NarrowByTypeAndGetPayload<Type extends UnionType['type']> = NarrowByType<Type> extends { payload: infer U } ? U : never;

function processEvent(supportedEvent: NarrowByTypeAndGetPayload<EventName.first>){
    // supportedEvent is of type ThirdEvent | SecondEvent
}

// export {}