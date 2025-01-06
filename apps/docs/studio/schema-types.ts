// Glob import all schema types for sanity. This expects all documents and objects to use the default export.
const documentModules = import.meta.glob('./documents/*.ts', { eager: true, import: 'default' });
const objectModules = import.meta.glob('./objects/*.ts', { eager: true, import: 'default' });


// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types
export const schemaTypes = [...Object.values(documentModules), ...Object.values(objectModules)];
