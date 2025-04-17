# Frappe React UI Components - Detailed Documentation

This document provides detailed usage examples for components available in the `@techseria/frappe-react-ui` package.

*(Note: This documentation is generated based on exported components. Props and examples are illustrative and may require referring to the source code for full details and accuracy.)*

---

## Core Components

### Alert
- **Description:** Displays contextual feedback messages.
- **Usage Example:**
  ```tsx
  import { Alert } from '@techseria/frappe-react-ui';

  <Alert title="Success" variant="success">
    Your changes have been saved.
  </Alert>
  ```

### Autocomplete
- **Description:** A text input with typeahead suggestions (Legacy version).
- **Usage Example:**
  ```tsx
  import { Autocomplete } from '@techseria/frappe-react-ui';
  const options = [{ label: 'Apple', value: 'apple' }, { label: 'Banana', value: 'banana' }];
  <Autocomplete options={options} onChange={(value) => console.log(value)} />
  ```

### AutocompleteV2
- **Description:** An improved text input with typeahead suggestions, potentially using ListView.
- **Usage Example:**
  ```tsx
  import { AutocompleteV2 } from '@techseria/frappe-react-ui';
  const options = [{ label: 'Apple', value: 'apple' }, { label: 'Banana', value: 'banana' }];
  <AutocompleteV2 options={options} onChange={(value) => console.log(value)} placeholder="Search fruit..." />
  ```

### Avatar
- **Description:** Displays user profile pictures or initials.
- **Usage Example:**
  ```tsx
  import { Avatar } from '@techseria/frappe-react-ui';

  <Avatar src="/path/to/image.jpg" alt="User Name" />
  <Avatar>UN</Avatar> // Fallback initials
  ```

### Badge
- **Description:** Small status descriptors for UI elements.
- **Usage Example:**
  ```tsx
  import { Badge } from '@techseria/frappe-react-ui';

  <Badge variant="info">New</Badge>
  ```

### Breadcrumbs
- **Description:** Shows the user's location in a navigational hierarchy.
- **Usage Example:**
  ```tsx
  import { Breadcrumbs } from '@techseria/frappe-react-ui';
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Laptops' }
  ];
  <Breadcrumbs items={items} />
  ```

### Button
- **Description:** A customizable button component.
- **Props:** (Illustrative)
  - `onClick: () => void`
  - `variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"`
  - `size?: "sm" | "md" | "lg"`
  - `children: React.ReactNode`
- **Usage Example:**
  ```tsx
  import { Button } from '@techseria/frappe-react-ui';

  <Button variant="primary" onClick={() => console.log("Clicked!")}>
    Click Me
  </Button>
  ```

### Card
- **Description:** A container for grouping related content.
- **Usage Example:**
  ```tsx
  import { Card } from '@techseria/frappe-react-ui';

  <Card title="User Details">
    <p>Content goes here...</p>
  </Card>
  ```

### Checkbox
- **Description:** Allows users to select one or more options.
- **Usage Example:**
  ```tsx
  import { Checkbox } from '@techseria/frappe-react-ui';

  <Checkbox label="Accept Terms" onChange={(checked) => console.log(checked)} />
  ```

### CircularProgressBar
- **Description:** Displays progress in a circular format.
- **Usage Example:**
  ```tsx
  import { CircularProgressBar } from '@techseria/frappe-react-ui';

  <CircularProgressBar value={75} />
  ```

### ConfirmDialog
- **Description:** Prompts the user for confirmation before an action.
- **Usage Example:** (Usage might involve a hook or function call)
  ```tsx
  import { confirmDialog } from '@techseria/frappe-react-ui'; // Assuming utility export

  async function handleDelete() {
    const confirmed = await confirmDialog({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this item?',
      confirmLabel: 'Delete',
      variant: 'danger'
    });
    if (confirmed) {
      // Proceed with deletion
    }
  }
  ```

### DatePicker
- **Description:** Allows users to select a date.
- **Usage Example:**
  ```tsx
  import { DatePicker } from '@techseria/frappe-react-ui';

  <DatePicker onChange={(date) => console.log(date)} />
  ```

### Dialog
- **Description:** A modal window for displaying information or forms.
- **Usage Example:**
  ```tsx
  import { Dialog, Button } from '@techseria/frappe-react-ui';
  import { useState } from 'react';

  function MyDialog() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="My Dialog">
          <p>Dialog content...</p>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </Dialog>
      </>
    );
  }
  ```

### Divider
- **Description:** A visual separator between elements.
- **Usage Example:**
  ```tsx
  import { Divider } from '@techseria/frappe-react-ui';

  <div>Element 1</div>
  <Divider />
  <div>Element 2</div>
  ```

### Dropdown
- **Description:** A button that reveals a list of actions or options.
- **Usage Example:**
  ```tsx
  import { Dropdown } from '@techseria/frappe-react-ui';
  const items = [
    { label: 'Edit', onClick: () => {} },
    { label: 'Delete', onClick: () => {} }
  ];
  <Dropdown label="Actions" items={items} />
  ```

### ErrorMessage
- **Description:** Displays error messages, often used in forms.
- **Usage Example:**
  ```tsx
  import { ErrorMessage } from '@techseria/frappe-react-ui';

  <ErrorMessage>This field is required.</ErrorMessage>
  ```

### FeatherIcon
- **Description:** Renders icons from the Feather Icons library.
- **Usage Example:**
  ```tsx
  import { FeatherIcon } from '@techseria/frappe-react-ui';

  <FeatherIcon icon="settings" />
  ```

### FileUploader
- **Description:** Allows users to upload files.
- **Usage Example:**
  ```tsx
  import { FileUploader } from '@techseria/frappe-react-ui';

  <FileUploader onUpload={(files) => console.log(files)} />
  ```

### FormControl
- **Description:** A wrapper for form elements providing labels, help text, and error states.
- **Usage Example:**
  ```tsx
  import { FormControl, TextInput } from '@techseria/frappe-react-ui';

  <FormControl label="Email Address" helpText="We'll never share your email.">
    <TextInput type="email" />
  </FormControl>
  ```

### FormGenerator
- **Description:** Generates a form based on a configuration object (likely Frappe DocType fields).
- **Usage Example:** (Conceptual)
  ```tsx
  import { FormGenerator } from '@techseria/frappe-react-ui';
  const fields = [ { fieldname: 'first_name', label: 'First Name', fieldtype: 'Data' } ];
  <FormGenerator fields={fields} doc={{}} onChange={(doc) => console.log(doc)} />
  ```

### GreenCheckIcon
- **Description:** A specific checkmark icon, often used for success states.
- **Usage Example:**
  ```tsx
  import { GreenCheckIcon } from '@techseria/frappe-react-ui';

  <GreenCheckIcon />
  ```

### Link
- **Description:** A styled anchor tag for navigation.
- **Usage Example:**
  ```tsx
  import { Link } from '@techseria/frappe-react-ui';

  <Link href="/dashboard">Go to Dashboard</Link>
  ```

### ListItem
- **Description:** Represents a single item within a list structure. Often used internally by components like `ListView` or `Select`.
- **Usage Example:** (Likely used within other components)
  ```tsx
  import { ListItem } from '@techseria/frappe-react-ui';

  <ListItem>Item Text</ListItem>
  ```

### ListView
- **Description:** A versatile component for displaying list-based data with columns, selection, and grouping.
- **Key Props:** (Illustrative)
  - `columns: Array<{ key: string; label?: string; width?: number; ... }>` - Defines the columns.
  - `rows: Array<any> | Array<{ group: string; rows: Array<any> }>` - Data rows or grouped data.
  - `rowKey: string | number` - Unique key property within each row object.
  - `options?: { selectable?: boolean; onRowClick?: (row) => void; ... }` - Configuration options.
  - `renderCell?: (props: { column, row, item }) => React.ReactNode` - Custom cell renderer.
- **Usage Example:**
  ```tsx
  import { ListView } from '@techseria/frappe-react-ui';

  const data = [
    { id: 1, name: 'Laptop', category: 'Electronics', stock: 15 },
    { id: 2, name: 'Mouse', category: 'Electronics', stock: 120 },
    { id: 3, name: 'Desk Chair', category: 'Furniture', stock: 30 },
  ];

  const columns = [
    { key: 'name', label: 'Product Name' },
    { key: 'category', label: 'Category' },
    { key: 'stock', label: 'Stock Level', align: 'right' },
  ];

  <ListView columns={columns} rows={data} rowKey="id" options={{ selectable: true }} />
  ```
  *(Note: ListView also exports sub-components like `ListHeader`, `ListRow`, `ListEmptyState`, etc. for more granular control if needed.)*

### LoadingIndicator
- **Description:** Indicates that an operation is in progress (generic).
- **Usage Example:**
  ```tsx
  import { LoadingIndicator } from '@techseria/frappe-react-ui';

  <LoadingIndicator />
  ```

### LoadingText
- **Description:** Displays text with a loading animation.
- **Usage Example:**
  ```tsx
  import { LoadingText } from '@techseria/frappe-react-ui';

  <LoadingText>Loading data...</LoadingText>
  ```

### Popover
- **Description:** Displays content floating above other elements, triggered by user interaction.
- **Usage Example:**
  ```tsx
  import { Popover, Button } from '@techseria/frappe-react-ui';

  <Popover content={<div>Popover content here...</div>}>
    <Button>Hover or Click Me</Button>
  </Popover>
  ```

### Progress
- **Description:** Displays progress in a linear bar format.
- **Usage Example:**
  ```tsx
  import { Progress } from '@techseria/frappe-react-ui';

  <Progress value={50} />
  ```

### Rating
- **Description:** Allows users to provide a star-based rating.
- **Usage Example:**
  ```tsx
  import { Rating } from '@techseria/frappe-react-ui';

  <Rating defaultValue={3} onChange={(value) => console.log(value)} />
  ```

### Select
- **Description:** A dropdown list for selecting a single option.
- **Usage Example:**
  ```tsx
  import { Select } from '@techseria/frappe-react-ui';
  const options = [{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }];
  <Select options={options} onChange={(value) => console.log(value)} />
  ```

### Spinner
- **Description:** A visual indicator that an operation is in progress.
- **Usage Example:**
  ```tsx
  import { Spinner } from '@techseria/frappe-react-ui';

  <Spinner />
  ```

### Switch
- **Description:** A toggle switch for boolean options.
- **Usage Example:**
  ```tsx
  import { Switch } from '@techseria/frappe-react-ui';

  <Switch label="Enable Notifications" onChange={(checked) => console.log(checked)} />
  ```

### Tabs / TabList / TabPanel / TabButtons
- **Description:** Components for creating tabbed interfaces.
- **Usage Example:**
  ```tsx
  import { Tabs, TabList, TabPanel, TabButtons } from '@techseria/frappe-react-ui';

  <Tabs defaultValue="tab1">
    <TabList>
      <TabButtons value="tab1">Tab One</TabButtons>
      <TabButtons value="tab2">Tab Two</TabButtons>
    </TabList>
    <TabPanel value="tab1">Content for Tab One</TabPanel>
    <TabPanel value="tab2">Content for Tab Two</TabPanel>
  </Tabs>
  ```

### Textarea
- **Description:** A multi-line text input field.
- **Usage Example:**
  ```tsx
  import { Textarea } from '@techseria/frappe-react-ui';

  <Textarea placeholder="Enter description..." />
  ```

### TextEditor (and related components)
- **Description:** A rich text editor component. Includes related UI elements like menus and toolbars.
- **Components:** `TextEditor`, `TextEditorBubbleMenu`, `TextEditorFixedMenu`, `TextEditorFloatingMenu`, `CodeBlockComponent`, `EmojiList`, `FontColor`, `InsertImage`, `InsertLink`, `InsertVideo`, `MentionList`, `TextEditorIcon1` (and other icons).
- **Usage Example:** (Main Editor)
  ```tsx
  import { TextEditor } from '@techseria/frappe-react-ui';
  import { useState } from 'react';

  function MyEditor() {
    const [content, setContent] = useState('<p>Initial Content</p>');
    return <TextEditor value={content} onChange={setContent} />;
  }
  ```
  *(Note: Many related components like menus might be used internally by `TextEditor` or require specific integration.)*

### TextInput
- **Description:** A standard single-line text input field.
- **Usage Example:**
  ```tsx
  import { TextInput } from '@techseria/frappe-react-ui';

  <TextInput placeholder="Enter your name" />
  ```

### Toast
- **Description:** Displays temporary, non-intrusive notifications.
- **Usage Example:** (Usage likely involves a hook or function call)
  ```tsx
  import { useToast } from '@techseria/frappe-react-ui'; // Assuming hook export

  function MyComponent() {
    const toast = useToast();
    return (
      <Button onClick={() => toast.show({ message: 'Item saved!', variant: 'success' })}>
        Save Item
      </Button>
    );
  }
  ```

### Tooltip
- **Description:** Displays informative text when hovering over an element.
- **Usage Example:**
  ```tsx
  import { Tooltip, Button } from '@techseria/frappe-react-ui';

  <Tooltip content="Click to save changes">
    <Button>Save</Button>
  </Tooltip>
  ```

### Tree
- **Description:** Displays hierarchical data in a tree structure.
- **Usage Example:**
  ```tsx
  import { Tree } from '@techseria/frappe-react-ui';
  const treeData = [ { id: '1', label: 'Root', children: [ { id: '1.1', label: 'Child 1' } ] } ];
  <Tree data={treeData} />
  ```

---

*This document should be updated as components evolve or new ones are added.*
