# Frappe-React Components Detailed Documentation

[Previous content remains the same until the Additional Components section...]

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

#### Calendar Component Suite
- **Description:** A comprehensive suite for displaying and managing calendar events with multiple views and interactive features. Migrated from `frappe-ui`.
- **Core Component:** `Calendar.tsx`
  - Orchestrates different views (Monthly, Weekly, Daily).
  - Manages event data fetching and state using `useCalendarData`.
  - Handles view switching and navigation.
- **View Components:**
  - `CalendarMonthly.tsx`: Displays events in a traditional month grid. Supports showing more events per day via `ShowMoreCalendarEvent`.
  - `CalendarWeekly.tsx`: Shows events across a week, typically with time slots. Uses `CalendarTimeMarker` for current time indication.
  - `CalendarDaily.tsx`: Focuses on a single day's events with time slots. Also uses `CalendarTimeMarker`.
- **Event Handling Components:**
  - `CalendarEvent.tsx`: Renders individual events within the calendar views. Handles click events to open details or edit modals.
  - `NewEventModal.tsx`: A modal dialog (built without relying on the base `Dialog` component due to prop inconsistencies) for creating and editing events. Includes form validation.
  - `ShowMoreCalendarEvent.tsx`: A popover or modal to display events when they exceed the available space in a day cell (primarily in Monthly view).
- **Hooks & Utilities:**
  - `useCalendarData.ts`: Custom hook to manage fetching, creating, updating, and deleting calendar events. Handles state logic.
  - `calendarUtils.ts`: Contains helper functions for date manipulation, event formatting, color mapping (`colorMap`), etc.
- **Features:**
  - Multiple views: Month, Week, Day.
  - Event creation, editing, and display.
  - Color-coded events.
  - Full-day event support.
  - Time indication marker.
  - Responsive design considerations (though specific testing needed).
- **Key Props (`Calendar.tsx`):**
  - `events?: CalendarEvent[]` - Initial list of events.
  - `config?: CalendarConfig` - Configuration options (e.g., default view).
  - `calendarActions?: { createNewEvent: (event: any) => void; updateEventState: (event: any) => void; /* ... other actions */ }` - Functions passed down for event manipulation, often linked to `useCalendarData`.
- **Usage Example (`Calendar.tsx`):**
  ```tsx
  import Calendar from './components/Calendar/Calendar';
  import { useCalendarData } from './components/Calendar/useCalendarData';

  function MyCalendarApp() {
    const { events, calendarActions } = useCalendarData(/* initial fetch config */);

    return (
      <Calendar 
        events={events} 
        calendarActions={calendarActions}
        // config={{ defaultView: 'week' }} 
      />
    );
  }
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
  - **Responsive Layout:** Multiple display modes such as "compact", "regular", or "dense" to suit various UI needs.
  - **Pagination/Infinite Scroll:** Options to paginate data sets or enable infinite scrolling for large data volumes.
  - **Style Customization:** Easily override default styles using CSS classes or theming solutions.
- **Props:**
  - `data: Array<any>` - Array of data items.
  - `renderItem: (item: any) => React.ReactNode` - Custom renderer for list items.
  - `onItemSelect?: (item: any) => void` - Callback when an item is selected.
  - `sortable?: boolean` - Enables sorting functionality.
  - `filterable?: boolean` - Enables filtering functionality.
  - `viewMode?: "compact" | "regular" | "dense"` - Chooses the display style.
  - `pagination?: { pageSize: number; currentPage: number; totalItems: number }` - Pagination configuration.
  - `infiniteScroll?: boolean` - Enables infinite scroll.
- **Usage Example:**
  ```tsx
  <ListView 
    data={[
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ]}
    renderItem={(item) => (
      <div className="list-item">
        {item.name}
      </div>
    )}
    onItemSelect={(item) => console.log('Selected:', item)}
    sortable={true}
    filterable={true}
    viewMode="regular"
  />
  ```

#### SignupBanner
- **Description:** Promotional banner encouraging users to sign up for the application.
- **Features:**
  - Collapsible/expandable design
  - Customizable app name and redirect URL
  - Callback after signup action
  - Supports custom child content
- **Props:**
  - `isSidebarCollapsed?: boolean` - Controls collapsed state
  - `appName?: string` - Name of application (default: "Frappe CRM")
  - `redirectURL?: string` - URL for signup action
  - `afterSignup?: () => void` - Callback after signup
  - `children?: React.ReactNode` - Custom content
- **Usage Example:**
  ```tsx
  <SignupBanner 
    appName="My App"
    redirectURL="https://example.com/signup"
    afterSignup={() => trackSignup()}
  />
  ```

#### TrialBanner
- **Description:** Displays trial period information and upgrade options.
- **Features:**
  - Shows remaining trial days
  - Auto-hides when trial is not active
  - Collapsible/expandable design
  - Upgrade action with callback
- **Props:**
  - `isSidebarCollapsed?: boolean` - Controls collapsed state
  - `afterUpgrade?: () => void` - Callback after upgrade action
- **Usage Example:**
  ```tsx
  <TrialBanner 
    afterUpgrade={() => trackUpgrade()}
  />
  ```

#### HelpModal
- **Description:** Comprehensive help interface combining onboarding and help center.
- **Features:**
  - Toggle between onboarding and help center views
  - Minimize/maximize functionality
  - Customizable app branding
  - Contextual navigation options
- **Props:**
  - `appName?: string` - Application name (default: "frappecrm")
  - `title?: string` - Modal title (default: "Frappe CRM")
  - `logo: React.ReactElement` - Application logo
  - `docsLink?: string` - Documentation URL
- **Usage Example:**
  ```tsx
  <HelpModal 
    logo={<AppLogo />}
    docsLink="https://docs.example.com"
  />
  ```

#### HelpCenter
- **Description:** Displays help articles and documentation links.
- **Features:**
  - Article list display
  - Documentation link
  - Empty state handling
- **Props:**
  - `articles: any[]` - Array of help articles
  - `docsLink: string` - URL to documentation
  - `onArticlesChange?: (articles: any[]) => void` - Callback when articles change
- **Usage Example:**
  ```tsx
  <HelpCenter 
    articles={helpArticles}
    docsLink="https://docs.example.com"
  />
  ```

#### OnboardingSteps
- **Description:** Guides new users through application setup.
- **Features:**
  - Customizable welcome message
  - Application branding support
  - Completion tracking
- **Props:**
  - `title: string` - Welcome title
  - `logo: React.ReactElement` - Application logo
  - `appName: string` - Application name
  - `afterSkip?: () => void` - Callback when steps are skipped
  - `afterSkipAll?: () => void` - Callback when all steps are skipped
  - `afterReset?: () => void` - Callback when steps are reset
  - `afterResetAll?: () => void` - Callback when all steps are reset
- **Usage Example:**
  ```tsx
  <OnboardingSteps 
    title="Welcome to My App"
    logo={<AppLogo />}
    appName="My App"
  />
  ```

#### TextEditor Component Suite
- **Description:** A collection of components related to the rich text editor functionality, migrated as placeholders from `frappe-ui`. Full implementation is pending.
- **Components:**
  - `CodeBlockComponent.tsx`: Placeholder for rendering code blocks.
  - `EmojiList.tsx`: Placeholder for displaying an emoji selection list.
  - `FontColor.tsx`: Placeholder for a font color selection tool.
  - `InsertImage.tsx`: Placeholder for inserting images into the editor.
  - `InsertLink.tsx`: Placeholder for inserting hyperlinks.
  - `InsertVideo.tsx`: Placeholder for inserting videos.
  - `MentionList.tsx`: Placeholder for displaying mention suggestions.
  - `Menu.tsx`: Placeholder for a generic menu component, potentially used within the editor.
  - `TextEditorBubbleMenu.tsx`: Placeholder for a contextual menu that appears on text selection.
  - `TextEditorFixedMenu.tsx`: Placeholder for a fixed toolbar associated with the editor.
  - `TextEditorFloatingMenu.tsx`: Placeholder for a floating toolbar.
  - `TextEditorIcons.tsx`: Contains 28 placeholder icon components associated with text editor actions.
- **Features:**
  - Currently placeholders. Basic functionality needs to be implemented.
- **Usage Example:**
  ```tsx
  // Example usage will be added once components are implemented.
  // import { TextEditor } from './components/TextEditor'; // Assuming a main editor component
  // <TextEditor /> 
  ```

[Rest of the file content remains the same...]
