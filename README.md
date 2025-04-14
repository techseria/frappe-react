# Frappe React Components

Official React components for Frappe Framework. Can be used as:
- Git submodule in Frappe apps
- NPM package

## Installation Options

### Option 1: As Git Submodule

1. Add as submodule to your project:
```bash
git submodule add https://github.com/frappe/frappe-react.git frappe_react
```

2. Install dependencies:
```bash
cd frappe_react && npm install
```

3. Build the project:
```bash
npm run build
```

4. Link the built files in your Frappe app's assets.

### Option 2: As NPM Package

1. Install the package:
```bash
npm install @frappe/frappe-react
```

2. Import components in your React app:
```js
import { Button, FormControl } from '@frappe/frappe-react'
```

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/frappe/frappe-react.git
cd frappe-react
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

## Building for Production

For library builds (NPM package):
```bash
npm run build:lib
```

For application builds (submodule usage):
```bash
npm run build
```

## Publishing to NPM

1. Bump version in package.json
2. Build the package:
```bash
npm run build:lib
```

3. Login to npm (if not already):
```bash
npm login
```

4. Publish:
```bash
npm publish --access public
```

## Testing

Run unit tests:
```bash
npm test
```

## Contributing

1. Create a new branch
2. Make your changes
3. Add tests if applicable
4. Submit a pull request

## License
MIT

Developed by Techseria

Released by Techseria
