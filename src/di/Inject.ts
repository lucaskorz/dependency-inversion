import type { Constructor } from "../types/utils.js";

export function Inject(token: string) {
  return (target: Constructor<any>, propertyKey: any, propertyIndex: number) => {
    Reflect.defineMetadata(`inject:${propertyIndex}`, token, target)
  };
}