enum MyEnum {
    A,
    B,
    C,
}

type TestA = {
    [MyEnum.A]: string;
}

type TestB = {
    [MyEnum.B]: number;
}

type TestC = {
    [MyEnum.B]: 192111;
}


type IsTestA<T> = T extends TestA ? T[MyEnum.A] : T extends TestB ? T[MyEnum.B] : null;


function assertTestA<T>(data: IsTestA<T>) {
    return data
}



assertTestA<TestB>(0);
assertTestA<TestA>('0');
assertTestA<TestC>(192111);

assertTestA<TestC>(null); // error
assertTestA<TestB>('0'); // error
assertTestA<TestA>(0); // error
assertTestA<TestC>(); // error
export {}// 