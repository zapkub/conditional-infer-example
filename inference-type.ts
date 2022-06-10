

class Root { }


class MyTestA extends Root {
    props: string
}

class MyTestB extends Root {
    props: number 
}


type PropsFromAnyRootByInfer<T extends Root> = T extends { props: infer PropType } ? PropType : never;

type PropsOfTestA = PropsFromAnyRootByInfer<MyTestA> // string
type PropsOfTestB = PropsFromAnyRootByInfer<MyTestB> // number
type PropsOfTestR = PropsFromAnyRootByInfer<Root> // number

export {}