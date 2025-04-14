import { useState, useEffect, Fragment, useCallback, useRef, useMemo } from 'react'; // Added useMemo
import {
  Dialog as HeadlessDialog,
  Combobox as HeadlessCombobox,
  Transition,
} from '@headlessui/react';
import { FeatherIcon } from '../FeatherIcon'; // Adjust path if needed
import { CommandPaletteItem, CommandPaletteItemType } from './CommandPaletteItem';
// Define the structure for command groups
export interface CommandGroup {
  title: string;
  hideTitle?: boolean;
  items: CommandPaletteItemType[];
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  groups: CommandGroup[];
  onSelect: (item: CommandPaletteItemType) => void;
  placeholder?: string;
}

export function CommandPalette({
  open,
  onClose,
  groups = [],
  onSelect,
  placeholder = "Search",
}: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter groups based on search query
  const filteredGroups = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      return groups;
    }
    return groups
      .map(group => ({
        ...group,
        items: group.items.filter(item =>
          !item.disabled &&
          (item.title.toLowerCase().includes(query) ||
           item.description?.toLowerCase().includes(query))
        ),
      }))
      .filter(group => group.items.length > 0);
  }, [groups, searchQuery]);

  // Handle selection
  const handleSelect = (item: CommandPaletteItemType | null) => {
    if (item && !item.disabled) {
      onSelect(item);
      onClose();
    }
  };

  // Reset query on close
  const handleAfterLeave = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
        event.preventDefault();
      }
      if (
        event.key === 'k' &&
        (event.ctrlKey || event.metaKey) &&
        !(event.target instanceof Element && event.target.closest('.ProseMirror'))
      ) {
         event.preventDefault();
         // Parent handles opening
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={handleAfterLeave}>
      <HeadlessDialog onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto pt-[15vh] p-4">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 transition-opacity" aria-hidden="true" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <HeadlessDialog.Panel className="relative mx-auto max-w-xl transform divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
            <HeadlessCombobox nullable onChange={handleSelect} value={null}>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4.5">
                  <FeatherIcon name="search" className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </div>
                <HeadlessCombobox.Input
                  ref={inputRef}
                  placeholder={placeholder}
                  className="w-full border-none bg-transparent py-3 pl-11.5 pr-4.5 text-base text-ink-gray-8 dark:text-gray-100 placeholder-ink-gray-4 dark:placeholder-gray-500 focus:ring-0"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  autoComplete="off"
                />
              </div>

              {filteredGroups.length > 0 && (
                 <HeadlessCombobox.Options static className="max-h-96 overflow-y-auto p-2">
                    {filteredGroups.map((group) => (
                      <div className="mb-2 mt-1 first:mt-0" key={group.title}>
                        {!group.hideTitle && (
                           <div className="mb-1 px-2.5 text-xs font-semibold text-ink-gray-5 dark:text-gray-400 uppercase tracking-wider">
                             {group.title}
                           </div>
                        )}
                        {group.items.map((item) => (
                          <HeadlessCombobox.Option
                            key={item.name}
                            value={item}
                            disabled={item.disabled}
                            as={Fragment}
                          >
                            {({ active }) => ( // Removed 'disabled' from render prop as it's handled by the Option itself
                              <CommandPaletteItem
                                item={item}
                                active={active}
                              />
                            )}
                          </HeadlessCombobox.Option>
                        ))}
                      </div>
                    ))}
                 </HeadlessCombobox.Options>
              )}

              {searchQuery && filteredGroups.length === 0 && (
                <p className="p-4 text-base text-ink-gray-5 dark:text-gray-400">No results found.</p>
              )}
            </HeadlessCombobox>
          </HeadlessDialog.Panel>
        </Transition.Child>
      </HeadlessDialog>
    </Transition.Root>
  );
}