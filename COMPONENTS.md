# Frappe-React Components Detailed Documentation

This documentation provides in-depth details for each React component available in the **frappe-react** library. Developed in TypeScript, these components are designed to integrate seamlessly with Frappe applications, ensuring type safety, rich features, and high customizability. Whether you are building basic interfaces or complex, data-driven UIs, this guide explains each component's features, API (props), usage examples, and customization options to help you implement them effectively in your projects.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Usage & Importing](#usage--importing)
4. [Detailed Component Documentation](#detailed-component-documentation)
   - [Core Components](#core-components)
      - [Alert](#alert)
      - [Autocomplete](#autocomplete)
      - [AutocompleteV2](#autocompletev2)
      - [Avatar](#avatar)
      - [Badge](#badge)
      - [Breadcrumbs](#breadcrumbs)
      - [Card](#card)
      - [Checkbox](#checkbox)
      - [CircularProgressBar](#circularprogressbar)
      - [ConfirmDialog](#confirmdialog)
      - [DatePicker](#datepicker)
      - [Dialog](#dialog)
      - [Divider](#divider)
      - [Dropdown](#dropdown)
      - [ErrorMessage](#errormessage)
      - [FeatherIcon](#feathericon)
      - [FileUploader](#fileuploader)
      - [FormControl](#formcontrol)
      - [FormGenerator](#formgenerator)
      - [GreenCheckIcon](#greencheckicon)
      - [Link](#link)
      - [ListItem](#listitem)
      - [LoadingIndicator](#loadingindicator)
      - [LoadingText](#loadingtext)
      - [Popover](#popover)
      - [Progress](#progress)
      - [Rating](#rating)
      - [Select](#select)
      - [Spinner](#spinner)
      - [Switch](#switch)
      - [TabButtons](#tabbuttons)
      - [TabList](#tablist)
      - [TabPanel](#tabpanel)
      - [Tabs](#tabs)
      - [Textarea](#textarea)
      - [TextEditor](#texteditor)
      - [TextInput](#textinput)
      - [Tooltip](#tooltip)
      - [Tree](#tree)
   - [Additional Components](#additional-components)
      - [Button](#button)
      - [Calendar](#calendar)
      - [CommandPalette](#commandpalette)
      - [ListView](#listview)
5. [Best Practices & Customization](#best-practices--customization)
6. [Examples](#examples)
7. [Additional Resources](#additional-resources)

---

## Introduction

**Frappe-React** is a comprehensive library of React components crafted for developing modern Frappe applications. Built in TypeScript, every component in this library is designed to provide robust type definitions, collaborate well with existing Frappe systems, and offer extensive customization options. This guide provides developers with complete explanations, detailed API documentation, and advanced usage scenarios to ensure a smooth integration journey.

---

## Getting Started

To install the library, run:

```bash
npm install frappe-react
```

Ensure that your project’s TypeScript configuration is properly set up for JSX and React. The library's source code and prop interfaces are available to promote consistency, ease of debugging, and rapid development.

---

## Usage & Importing

Import the components you need directly into your TypeScript project. For example:

```tsx
import React from 'react';
import { Alert, Card } from 'frappe-react';

const App: React.FC = () => (
  <div>
    <Alert type="info">This is an informational alert.</Alert>
    <Card title="Card Title">
      <p>Card content goes here.</p>
    </Card>
  </div>
);

export default App;
```

Components come with complete TypeScript definitions for prop validation and IntelliSense support, ensuring a robust development experience.

---

## Detailed Component Documentation

### Core Components

Each component is accompanied by a description, key features, a list of primary props (with their TypeScript types), and detailed usage examples.

#### Alert
- **Description:** Provides contextual feedback messages to users.
- **Features:**
  - Supports multiple alert types: `success`, `info`, `warning`, `error`.
  - Customizable styling via CSS classes and inline styles.
- **Props:**
  - `type: "success" | "info" | "warning" | "error"`
  - `children: React.ReactNode`
  - `className?: string`
- **Usage Example:**
  ```tsx
  <Alert type="success" className="custom-alert">
    Operation completed successfully!
  </Alert>
  ```

#### Autocomplete
- **Description:** Renders an input field with auto-suggested options based on user input.
- **Features:**
  - Supports both static suggestions and custom render functions.
  - Easy integration with local or remote data.
- **Props:**
  - `suggestions: string[]`
  - `onSelect: (value: string) => void`
  - `renderSuggestion?: (item: string) => JSX.Element`
- **Usage Example:**
  ```tsx
  <Autocomplete 
    suggestions={['Option1', 'Option2']} 
    onSelect={(value) => console.log(value)} 
  />
  ```

#### AutocompleteV2
- **Description:** An advanced version of the Autocomplete component.
- **Features:**
  - Asynchronous data fetching.
  - Enhanced grouping and filtering capabilities.
- **Props:** Inherits from Autocomplete with additional:
  - `fetchSuggestions?: (query: string) => Promise<string[]>`
- **Usage Example:**
  ```tsx
  <AutocompleteV2 
    suggestions={['Option1', 'Option2']} 
    onSelect={(value) => console.log(value)}
    renderSuggestion={(item) => <div>{item}</div>}
  />
  ```

#### Avatar
- **Description:** Displays user profile images or initials.
- **Features:**
  - Supports fallback to initials.
  - Configurable size and shape.
- **Props:**
  - `src?: string`
  - `alt?: string`
  - `size?: number`
  - `variant?: "circle" | "square"`
- **Usage Example:**
  ```tsx
  <Avatar src="https://example.com/user.jpg" alt="User Name" size={40} variant="circle" />
  ```

#### Badge
- **Description:** Shows badges for statuses, counts, or labels.
- **Features:**
  - Customizable colors and sizes.
- **Props:**
  - `color: string`
  - `children: React.ReactNode`
  - `size?: "small" | "medium" | "large"`
- **Usage Example:**
  ```tsx
  <Badge color="primary" size="medium">New</Badge>
  ```

#### Breadcrumbs
- **Description:** Displays navigational breadcrumbs.
- **Features:**
  - Customizable separators.
  - Supports click events for navigation.
- **Props:**
  - `items: Array<{ label: string, href?: string }>`
  - `separator?: React.ReactNode`
- **Usage Example:**
  ```tsx
  <Breadcrumbs 
    items={[
      { label: 'Home', href: '/' },
      { label: 'Dashboard' },
      { label: 'Settings' }
    ]}
    separator=">"
  />
  ```

#### Card
- **Description:** A container component with structured sections.
- **Features:**
  - Optional title, header actions, and footer sections.
  - Built with responsive design in mind.
- **Props:**
  - `title?: string`
  - `children: React.ReactNode`
  - `headerActions?: React.ReactNode`
  - `className?: string`
- **Usage Example:**
  ```tsx
  <Card title="Card Title" headerActions={<button>Action</button>}>
    <p>Content goes here.</p>
  </Card>
  ```

#### Checkbox
- **Description:** Standard checkbox element for boolean selections.
- **Features:**
  - Supports controlled and uncontrolled states.
  - Custom label positioning.
- **Props:**
  - `checked: boolean`
  - `onChange: (checked: boolean) => void`
  - `label?: string`
- **Usage Example:**
  ```tsx
  <Checkbox 
    label="Accept Terms" 
    checked={true} 
    onChange={(checked) => console.log(checked)} 
  />
  ```

#### CircularProgressBar
- **Description:** Circular progress indicator.
- **Features:**
  - Configurable progress value, size, stroke width, and color.
- **Props:**
  - `value: number`
  - `size?: number`
  - `strokeWidth?: number`
  - `color?: string`
- **Usage Example:**
  ```tsx
  <CircularProgressBar value={75} size={120} strokeWidth={8} color="#00f" />
  ```

#### ConfirmDialog
- **Description:** Modal dialog to confirm or cancel an action.
- **Features:**
  - Customizable text and button actions.
  - Callback support for confirm and cancel.
- **Props:**
  - `open: boolean`
  - `message: string`
  - `onConfirm: () => void`
  - `onCancel: () => void`
- **Usage Example:**
  ```tsx
  <ConfirmDialog 
    open={true} 
    message="Are you sure you want to delete?"
    onConfirm={() => console.log("Confirmed")}
    onCancel={() => console.log("Cancelled")}
  />
  ```

#### DatePicker
- **Description:** Calendar component for date selection.
- **Features:**
  - Supports single and range selection modes.
  - Customizable date formats.
- **Props:**
  - `selected: Date`
  - `onChange: (date: Date) => void`
  - `range?: boolean`
- **Usage Example:**
  ```tsx
  <DatePicker 
    selected={new Date()} 
    onChange={(date) => console.log(date)} 
    range={false}
  />
  ```

#### Dialog
- **Description:** Generic modal dialog component.
- **Features:**
  - Accessible design with keyboard support.
  - Customizable header, body, and actions.
- **Props:**
  - `open: boolean`
  - `onClose: () => void`
  - `children: React.ReactNode`
- **Usage Example:**
  ```tsx
  <Dialog open={true} onClose={() => console.log("Closed")}>
    <h2>Dialog Title</h2>
    <p>Dialog content goes here.</p>
  </Dialog>
  ```

#### Divider
- **Description:** Horizontal divider for visual separation.
- **Features:**
  - Simple, clean design.
  - Easily styled via custom classes.
- **Props:**
  - `className?: string`
- **Usage Example:**
  ```tsx
  <Divider className="my-divider" />
  ```

#### Dropdown
- **Description:** Dropdown menu for selecting options.
- **Features:**
  - Supports custom rendering and event callbacks.
  - Works with both string arrays and object arrays.
- **Props:**
  - `options: string[] | Array<{ label: string, value: any }>`
  - `onSelect: (value: any) => void`
- **Usage Example:**
  ```tsx
  <Dropdown 
    options={['Option 1', 'Option 2']} 
    onSelect={(value) => console.log(value)}
  />
  ```

#### ErrorMessage
- **Description:** Displays error or validation messages.
- **Features:**
  - Easily styled to match form themes.
- **Props:**
  - `message: string`
- **Usage Example:**
  ```tsx
  <ErrorMessage message="An error occurred. Please try again." />
  ```

#### FeatherIcon
- **Description:** Lightweight icon component using the Feather Icons set.
- **Features:**
  - Customizable size and color.
- **Props:**
  - `name: string`
  - `size?: number`
  - `color?: string`
- **Usage Example:**
  ```tsx
  <FeatherIcon name="activity" size={24} color="#333" />
  ```

#### FileUploader
- **Description:** Handles file upload interactions.
- **Features:**
  - Drag-and-drop support.
  - Callback for when files are uploaded.
- **Props:**
  - `onUpload: (files: FileList) => void`
  - `accept?: string`
- **Usage Example:**
  ```tsx
  <FileUploader 
    onUpload={(files) => console.log(files)} 
    accept="image/*"
  />
  ```

#### FormControl
- **Description:** Wrapper for form elements ensuring consistent styling and validation.
- **Features:**
  - Displays labels, helper text, and error messages.
- **Props:**
  - `label: string`
  - `children: React.ReactNode`
  - `error?: string`
- **Usage Example:**
  ```tsx
  <FormControl label="Username" error="Username is required">
    <TextInput value="JohnDoe" onChange={(e) => {}} />
  </FormControl>
  ```

#### FormGenerator
- **Description:** Dynamically renders forms based on a provided configuration.
- **Features:**
  - Accepts JSON schema definitions.
  - Handles form state and validation.
- **Props:**
  - `config: object`
  - `onSubmit: (data: any) => void`
- **Usage Example:**
  ```tsx
  <FormGenerator 
    config={{ fields: [ /* schema here */ ] }} 
    onSubmit={(data) => console.log(data)}
  />
  ```

#### GreenCheckIcon
- **Description:** Displays a green check mark icon to indicate a successful or verified status.
- **Features:**
  - Simple, inline usage.
- **Props:** (Optional props to adjust size/color)
- **Usage Example:**
  ```tsx
  <GreenCheckIcon />
  ```

#### Link
- **Description:** Custom link component that integrates with your routing solution.
- **Features:**
  - Consistent styling and active state management.
- **Props:**
  - `href: string`
  - `children: React.ReactNode`
- **Usage Example:**
  ```tsx
  <Link href="/dashboard">Go to Dashboard</Link>
  ```

#### ListItem
- **Description:** Represents an individual item within a list.
- **Features:**
  - Clickable and customizable for various list layouts.
- **Props:**
  - `onClick: () => void`
  - `children: React.ReactNode`
- **Usage Example:**
  ```tsx
  <ListItem onClick={() => console.log("Item clicked")}>
    List item text
  </ListItem>
  ```

#### LoadingIndicator
- **Description:** Spinner component for indicating ongoing processes.
- **Features:**
  - Adjustable size and color.
- **Props:**
  - `size?: number`
  - `color?: string`
- **Usage Example:**
  ```tsx
  <LoadingIndicator size={40} color="#000" />
  ```

#### LoadingText
- **Description:** Text-based indicator for loading states.
- **Features:**
  - Can be used standalone or with other loading indicators.
- **Props:**
  - `text: string`
- **Usage Example:**
  ```tsx
  <LoadingText text="Loading data..." />
  ```

#### Popover
- **Description:** Displays a popover overlay containing additional information.
- **Features:**
  - Configurable placement and content.
- **Props:**
  - `content: React.ReactNode`
  - `children: React.ReactNode`
  - `placement?: "top" | "bottom" | "left" | "right"`
- **Usage Example:**
  ```tsx
  <Popover content="Additional info" placement="top">
    <button>Hover me</button>
  </Popover>
  ```

#### Progress
- **Description:** Linear progress bar component.
- **Features:**
  - Customizable progress value, color, and height.
- **Props:**
  - `value: number`
  - `color?: string`
  - `height?: number`
- **Usage Example:**
  ```tsx
  <Progress value={50} color="#0a0" height={5} />
  ```

#### Rating
- **Description:** Interactive star rating component.
- **Features:**
  - Supports whole and half-star ratings.
  - Customizable total stars.
- **Props:**
  - `value: number`
  - `onChange: (value: number) => void`
  - `max?: number`
- **Usage Example:**
  ```tsx
  <Rating value={3} max={5} onChange={(val) => console.log(val)} />
  ```

#### Select
- **Description:** Dropdown selection component.
- **Features:**
  - Supports single and multiple selections.
  - Custom rendering for options.
- **Props:**
  - `options: Array<{ label: string; value: any }>`
  - `onChange: (value: any) => void`
  - `multiple?: boolean`
- **Usage Example:**
  ```tsx
  <Select 
    options={[ { label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 } ]}
    onChange={(value) => console.log(value)}
  />
  ```

#### Spinner
- **Description:** A simple spinner to indicate processing.
- **Features:**
  - Basic CSS animations.
- **Props:**
  - `size?: number`
  - `color?: string`
- **Usage Example:**
  ```tsx
  <Spinner size={30} color="#555" />
  ```

#### Switch
- **Description:** Toggle switch for binary options.
- **Features:**
  - Smooth animations and accessible keyboard controls.
- **Props:**
  - `checked: boolean`
  - `onChange: (checked: boolean) => void`
- **Usage Example:**
  ```tsx
  <Switch checked={true} onChange={(checked) => console.log(checked)} />
  ```

#### TabButtons
- **Description:** Renders the buttons for tab navigation.
- **Features:**
  - Visual feedback for active tabs.
- **Props:**
  - `tabs: string[]`
  - `activeIndex: number`
  - `onTabChange: (index: number) => void`
- **Usage Example:**
  ```tsx
  <TabButtons 
    tabs={['Tab 1', 'Tab 2']} 
    activeIndex={0} 
    onTabChange={(index) => console.log(index)}
  />
  ```

#### TabList
- **Description:** Container for the tab items.
- **Features:**
  - Designed to work with TabPanel for a complete tabbed interface.
- **Props:**
  - `children: React.ReactNode`
- **Usage Example:**
  ```tsx
  <TabList>
    {tabs}
  </TabList>
  ```

#### TabPanel
- **Description:** Displays content corresponding to a selected tab.
- **Features:**
  - Conditional rendering based on the active state.
- **Props:**
  - `active: boolean`
  - `children: React.ReactNode`
- **Usage Example:**
  ```tsx
  <TabPanel active={activeTab === 0}>
    <p>Content for Tab 1</p>
  </TabPanel>
  ```

#### Tabs
- **Description:** Composite component to manage all tab-related subcomponents.
- **Features:**
  - Simplifies tab management by composing TabButtons, TabList, and TabPanel.
- **Props:**
  - `children: React.ReactNode`
- **Usage Example:**
  ```tsx
  <Tabs>
    {/* Place TabButtons, TabList, and TabPanel as children */}
  </Tabs>
  ```

#### Textarea
- **Description:** Multi-line text input component.
- **Features:**
  - Auto-resizing and scrollable interface.
- **Props:**
  - `value: string`
  - `onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void`
  - `placeholder?: string`
- **Usage Example:**
  ```tsx
  <Textarea 
    value="Long form text" 
    onChange={(e) => console.log(e.target.value)}
    placeholder="Enter text here..."
  />
  ```

#### TextEditor
- **Description:** Rich text editor for advanced content formatting.
- **Features:**
  - Supports text formatting, media embedding, and custom toolbars.
- **Props:**
  - `value: string`
  - `onChange: (content: string) => void`
  - `toolbarOptions?: string[]`
- **Usage Example:**
  ```tsx
  <TextEditor 
    value="<p>Your content</p>" 
    onChange={(content) => console.log(content)}
    toolbarOptions={['bold', 'italic', 'underline']}
  />
  ```

#### TextInput
- **Description:** Standard single-line text input.
- **Features:**
  - Fully controlled component with TypeScript definitions.
- **Props:**
  - `value: string`
  - `onChange: (e: React.ChangeEvent<HTMLInputElement>) => void`
  - `placeholder?: string`
- **Usage Example:**
  ```tsx
  <TextInput 
    value="Sample text" 
    onChange={(e) => console.log(e.target.value)}
    placeholder="Enter text..."
  />
  ```

#### Tooltip
- **Description:** Displays contextual tooltip information.
- **Features:**
  - Configurable delay and placement.
- **Props:**
  - `content: string | React.ReactNode`
  - `children: React.ReactNode`
- **Usage Example:**
  ```tsx
  <Tooltip content="This is a tooltip">
    <span>Hover over me</span>
  </Tooltip>
  ```

#### Tree
- **Description:** Renders hierarchical tree data.
- **Features:**
  - Expandable/collapsible nodes.
  - Callback support on node selection.
- **Props:**
  - `data: TreeNode[]` *(TreeNode interface defines the node structure)*
  - `onSelect: (node: TreeNode) => void`
- **Usage Example:**
  ```tsx
  <Tree 
    data={treeData} 
    onSelect={(node) => console.log(node)}
  />
  ```

---

### Additional Components

#### Button
- **Description:** A customizable button component.
- **Features:**
  - Variants for primary, secondary, outline, etc.
  - Accessible and responsive design.
- **Props:**
  - `onClick: () => void`
  - `variant?: "primary" | "secondary" | "outline"`
  - `children: React.ReactNode`
- **Usage Example:**
  ```tsx
  <Button variant="primary" onClick={() => console.log("Clicked!")}>
    Click Me
  </Button>
  ```

#### Calendar
- **Description:** Calendar component for date display and event management.
- **Features:**
  - Multiple views (month, week, day).
  - Event integration and custom styling.
- **Props:**
  - `events?: Array<{ date: Date; title: string }>`
  - `onDateSelect?: (date: Date) => void`
- **Usage Example:**
  ```tsx
  <Calendar 
    events={[{ date: new Date(), title: 'Meeting' }]} 
    onDateSelect={(date) => console.log(date)}
  />
  ```

#### CommandPalette
- **Description:** A command palette for rapid action execution.
- **Features:**
  - Searchable list of commands.
  - Keyboard navigation.
- **Props:**
  - `commands: Array<{ name: string; action: () => void }>`
- **Usage Example:**
  ```tsx
  <CommandPalette 
    commands={[
      { name: 'Open Dashboard', action: () => console.log('Dashboard opened') }
    ]}
  />
  ```

#### ListView
- **Description:** A versatile component for displaying list-based data with advanced configuration.
- **Features:**
  - **Custom Item Rendering:** Supply a custom function via the `renderItem` prop to dictate how each item appears.
  - **Sorting & Filtering:** Built-in support to allow sorting (by any column or property) and filtering of list data.
  - **Responsive Layout:** Multiple display modes such as “compact”, “regular”, or “dense” to suit various UI needs.
  - **Pagination/Infinite Scroll:** Options to paginate data sets or enable infinite scrolling for large data volumes.
  - **Style Customization:** Easily override default styles using CSS classes or theming solutions.
- **Props:**
  - `data: Array<any>` – Array of data items.
  - `renderItem: (item: any) => React.ReactNode` – Custom renderer for list items.
  - `onItemSelect?: (item: any) => void` – Callback when an item is selected.
  - `sortable?: boolean` – Enables sorting functionality.
  - `filterable?: boolean` – Enables filtering functionality.
  - `viewMode?: "compact" | "regular" | "dense"` – Chooses the display style.
  - `pagination?: { pageSize: number; currentPage: number; totalItems: number }` – Pagination configuration.
  - `infiniteScroll?: boolean` – Enables infinite scroll.
- **Usage Example:**
  ```tsx
  <ListView 
    data={[
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ]}
    renderItem={(item) => (
      <div className="list-item" style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
        {item.name}
      </div>
    )}
    onItemSelect={(item) => console.log('Selected:', item)}
    sortable={true}
    filterable={true}
    viewMode="regular"
    pagination={{ pageSize: 10, currentPage: 1, totalItems: 50 }}
    infiniteScroll={false}
  />
  ```

---

## Best Practices & Customization

- **TypeScript Integration:** Leverage the strong typing provided by the component interfaces to catch errors at compile-time.
- **Consistent Theming:** Utilize existing CSS classes and theming tools to maintain a consistent UI throughout your application.
- **Accessibility:** Ensure that interactive components (dialogs, buttons, inputs) are used with proper ARIA labels and roles.
- **Custom Renderers:** Components like Autocomplete and ListView allow custom render methods. Use these hooks to tailor the UI exactly to your needs.
- **Testing:** Review the accompanying test files within the repository to understand component behaviors and for guidance on writing unit tests.

---

## Examples

Below is a comprehensive example demonstrating several components integrated into a TypeScript application.

```tsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { 
  Alert, Card, TextInput, Button, LoadingIndicator, ListView 
} from 'frappe-react';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const data = [
    { id: 1, name: 'Item One' },
    { id: 2, name: 'Item Two' },
    // additional items...
  ];

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Submitted: ${inputValue}`);
    }, 1000);
  };

  return (
    <div>
      <Alert type="info">Welcome to the Frappe-React Demo</Alert>
      <Card title="Input Form">
        <TextInput 
          placeholder="Type something..." 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <Button onClick={handleSubmit}>Submit</Button>
        {loading && <LoadingIndicator size={40} color="#000" />}
      </Card>
      <Card title="ListView Example">
        <ListView 
          data={data}
          renderItem={(item) => (
            <div style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
              {item.name}
            </div>
          )}
          onItemSelect={(item) => console.log('Selected:', item)}
          sortable={true}
          filterable={true}
          viewMode="regular"
          pagination={{ pageSize: 10, currentPage: 1, totalItems: data.length }}
          infiniteScroll={false}
        />
      </Card>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

---

## Additional Resources

- [Frappe Framework Documentation](https://frappeframework.com/docs) – Backend integration and guidelines.
- [frappe-react GitHub Repository](https://github.com/frappe/frappe-react) – Source code, issue tracking, and contribution guidelines.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) – Learn more about TypeScript for robust application development.

---

This comprehensive documentation provides detailed insights into each component of the Frappe-React library. By following the examples and best practices outlined above, developers can efficiently integrate these components within TypeScript-based Frappe applications, ensuring a high standard of open source quality and reliable functionality.
