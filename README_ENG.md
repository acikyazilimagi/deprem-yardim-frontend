## To support the project

Communications:

- [Discord Channel](https://t.co/MzLdlNPOmY)

To Contribute:

- [Contributing](CONTRIBUTING_ENG.md)

## Technologies and Systems Used In This Project

- [Next.js 13](https://github.com/vercel/next.js/)
- [React 18](https://github.com/facebook/react)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Zustand](https://github.com/pmndrs/zustand/) - Global Store
- Absolute Import and Path Alias — Components to import with `@/` prefix
- [ESLint](https://github.com/eslint/eslint) — To find bugs in your code according to specific rules
- [Prettier](https://github.com/prettier/prettier) — To format the code according to specific guidelines
- [Husky](https://github.com/typicode/husky) & [Lint Staged](https://github.com/okonet/lint-staged) — To check whether they comply with the rules before you commit the changes.

## To Begin

### 1. Clone the Repo:

```bash
git clone https://github.com/acikkaynak/deprem-yardim-frontend.git
```

### 2. Install Dependencies:

**yarn** is suggested.

```bash
yarn
```

### 3. Add Necessary Environment Variables:

To use address search feature you need to get a Google Maps JS Api Key. [Here](https://developers.google.com/maps/documentation/javascript/get-api-key) you can get it.
**_.env.development_**'dosyasındaki **_NEXT_PUBLIC_MAPS_API_KEY_** değişkenine keyi ekleyin.

### 4. Run the Development Environment:

```bash
yarn dev
```

You can open up the [http://localhost:3000](http://localhost:3000) address on your browser to see the result.
