export const promiseLoad = (loader) => new Promise((resolve) => {
  loader.load(() => {
    resolve(loader.resources);
  });
});
