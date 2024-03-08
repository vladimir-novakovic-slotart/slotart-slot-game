export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function sleep(fn: Function, ...args: any[]) {
    await timeout(3000);
    return fn(...args);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function attachDebugFnToWindow(key: string, fn: (...args: any[]) => void) {
    console.warn("WARNING. DEBUG FUNCTION ATTACHED WITH NAME:", key);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as unknown as any)[key] = fn;
}
