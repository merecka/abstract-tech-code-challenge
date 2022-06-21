import localforage from 'localforage';
localforage.config({
  name: 'abst_storage',
  storeName: process?.env?.PROJECT_KEY || 'abst_storage'
});

export default localforage;
