/**
 * Guard that throws an error if the given parent module exists.
 * Used to check if a module has been already loaded.
 */
export function throwIfAlreadyLoaded(
  parentModule: any,
  moduleName: string
): void {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import ${moduleName} modules in the AppModule only.`
    );
  }
}
