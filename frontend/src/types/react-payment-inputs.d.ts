//TypeScript can't find type definitions for that package.
/*some older/smaller npm packages don't ship their own TypeScript types, and don't have a matching @types/ package either —
 in that case TypeScript can't verify their shape, but the code would still technically work at runtime. 
 You can silence this specific warning by adding a small type declaration file */
declare module "react-payment-inputs";
declare module "react-payment-inputs/images";