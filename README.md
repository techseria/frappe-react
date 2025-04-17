# Frappe React UI Components (@techseria/frappe-react-ui)

A collection of React UI components designed for use with the Frappe Framework, developed by Techseria.

This package provides reusable components to build modern user interfaces for Frappe applications.

## Installation

This package is published to GitHub Packages.

**1. Configure npm/yarn:**

You need to tell your package manager to look for the `@techseria` scope in the GitHub Packages registry. Create or edit the `.npmrc` file in your project's root directory (or your user home directory) and add the following line:

```
@techseria:registry=https://npm.pkg.github.com
```

**2. Authenticate (if repository is private or for publishing):**

To install private packages or publish your own, you need to authenticate. Use a [GitHub Personal Access Token (Classic)](https://github.com/settings/tokens/new?scopes=read:packages) with the `read:packages` scope (and `write:packages` if you intend to publish).

Login using npm:
```bash
npm login --scope=@techseria --registry=https://npm.pkg.github.com
# Username: <your-github-username>
# Password: <your-personal-access-token>
# Email: <your-github-email>
```
*Note: For CI/CD environments, set the token as an environment variable `NODE_AUTH_TOKEN`.*

**3. Install the package:**

```bash
npm install @techseria/frappe-react-ui
# or
yarn add @techseria/frappe-react-ui
```

## Usage

Import the components you need into your React application:

```jsx
import React from 'react';
import { Button, TextInput, ListView, Card } from '@techseria/frappe-react-ui';

function MyComponent() {
  const data = [
    { id: 1, name: 'Item 1', status: 'Active' },
    { id: 2, name: 'Item 2', status: 'Inactive' },
  ];

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <Card title="My Data">
      <div style={{ marginBottom: '1rem' }}>
        <TextInput placeholder="Search..." />
      </div>
      <ListView columns={columns} rows={data} rowKey="id" />
      <div style={{ marginTop: '1rem' }}>
        <Button variant="primary">Submit</Button>
      </div>
    </Card>
  );
}

export default MyComponent;
```

## Available Components

The following components are currently available:

*   `Alert`
*   `Autocomplete`
*   `AutocompleteV2`
*   `Avatar`
*   `Badge`
*   `Breadcrumbs`
*   `Button` (and related types/components from its directory)
*   `Card`
*   `Checkbox`
*   `CircularProgressBar`
*   `CodeBlockComponent`
*   `ConfirmDialog`
*   `DatePicker`
*   `Dialog`
*   `Divider`
*   `Dropdown`
*   `EmojiList`
*   `ErrorMessage`
*   `FeatherIcon`
*   `FileUploader`
*   `FontColor`
*   `FormControl`
*   `FormGenerator`
*   `GreenCheckIcon`
*   `InsertImage`
*   `InsertLink`
*   `InsertVideo`
*   `LightningIcon`
*   `Link`
*   `ListItem`
*   `ListView` (and related types/components like `ListHeader`, `ListRow`, etc.)
*   `LoadingIndicator`
*   `LoadingText`
*   `MentionList`
*   `Menu`
*   `Popover`
*   `Progress`
*   `Rating`
*   `Select`
*   `Spinner`
*   `Switch`
*   `TabButtons`
*   `TabList`
*   `TabPanel`
*   `Tabs`
*   `Textarea`
*   `TextEditor`
*   `TextEditorBubbleMenu`
*   `TextEditorFixedMenu`
*   `TextEditorFloatingMenu`
*   `TextEditorIcon1` (from TextEditorIcons)
*   `TextInput`
*   `Toast`
*   `Tooltip`
*   `Tree`

*(Refer to the source code or specific component files for detailed props and usage)*

## Development Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/techseria/frappe-react-ui.git
    cd frappe-react-ui
    ```
    *(Note: The directory name in the file system is `frappe-react`, but the repository URL might be different. Adjust clone command if needed)*

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start development server (if applicable, e.g., for Storybook or a demo app):
    ```bash
    # Add a dev script if needed, e.g., npm run storybook
    npm run dev # Assuming vite runs a demo app
    ```

## Building the Library

To build the distributable files (`dist` directory):
```bash
npm run build
```
*(This uses `vite build --config vite.lib.config.ts` as defined in `package.json`)*

## Publishing to GitHub Packages

1.  Ensure your `package.json` version is updated.
2.  Make sure you are logged in (`npm login --scope=@techseria --registry=https://npm.pkg.github.com`).
3.  Run the publish command:
    ```bash
    npm publish
    ```
    *(The `prepublishOnly` script in `package.json` will automatically run `npm run build`)*

## Testing

Run unit tests:
```bash
npm test
```
*(This uses `vitest` as defined in `package.json`)*

## Contributing

1.  Create a new branch for your feature or bug fix.
2.  Make your changes.
3.  Add tests if applicable.
4.  Ensure the build (`npm run build`) and tests (`npm test`) pass.
5.  Submit a pull request to the `techseria/frappe-react-ui` repository.

## License

MIT

Developed by Techseria.
