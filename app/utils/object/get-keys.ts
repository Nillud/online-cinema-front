export const getKeys = <T>(obj: T) => Object.keys(obj as unknown as object) as Array<keyof T>
