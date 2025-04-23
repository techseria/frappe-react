import { useState, useMemo, useRef, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import { Popover } from './Popover'
import { Button } from './Button/Button'
import FeatherIcon from './FeatherIcon'
import { LoadingIndicator } from './LoadingIndicator'

type Option = {
  label: string
  value: OptionValue
  description?: string
  disabled?: boolean
  [key: string]: any
}

type OptionValue = string | number | boolean

type AutocompleteOption = OptionValue | Option

type AutocompleteOptionGroup = {
  group: string
  items: AutocompleteOption[]
  hideLabel?: boolean
}

type AutocompleteOptions = AutocompleteOption[] | AutocompleteOptionGroup[]

type BaseAutocompleteProps = {
  label?: string
  options: AutocompleteOptions
  hideSearch?: boolean
  placeholder?: string
  bodyClasses?: string | string[]
  loading?: boolean
  placement?: 'top' | 'bottom' | 'left' | 'right'
  showFooter?: boolean
  onQueryChange?: (query: string) => void
}

type SingleAutocompleteProps = BaseAutocompleteProps & {
  multiple?: false
  value?: OptionValue | Option | null
  onChange?: (value: OptionValue | Option | null) => void
}

type MultipleAutocompleteProps = BaseAutocompleteProps & {
  multiple: true
  value?: (OptionValue | Option)[] | null
  onChange?: (value: (OptionValue | Option)[] | null) => void
}

type AutocompleteProps = SingleAutocompleteProps | MultipleAutocompleteProps

export function Autocomplete(props: AutocompleteProps) {
  const [query, setQuery] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const groups = useMemo(() => {
    if (!props.options?.length) return [];

    let groups: AutocompleteOptionGroup[];
    if (props.options[0] && typeof props.options[0] === 'object' && 'group' in props.options[0]) {
      groups = props.options as AutocompleteOptionGroup[];
    } else {
      groups = [{
        group: '',
        items: props.options as AutocompleteOption[],
        hideLabel: true
      }];
    }

    return groups.map(group => ({
      ...group,
      items: group.items.filter(item => {
        if (!query) return true;
        const label = typeof item === 'object' ? item.label : String(item);
        return label.toLowerCase().includes(query.toLowerCase());
      })
    }));
  }, [props.options, query]);

  useEffect(() => {
    props.onQueryChange?.(query);
  }, [query]);

  const getLabel = (option: AutocompleteOption) => {
    return typeof option === 'object' ? option.label : String(option);
  };
  return (
    <Combobox
      value={props.value}
      onChange={(value: any) => {
        if (props.multiple) {
          // Explicitly cast props to narrow down the type for onChange
          const onChangeHandler = (props as MultipleAutocompleteProps).onChange;
          onChangeHandler?.(value as (OptionValue | Option)[] | null);
        } else {
          // Explicitly cast props to narrow down the type for onChange
          const onChangeHandler = (props as SingleAutocompleteProps).onChange;
          onChangeHandler?.(value as OptionValue | Option | null);
        }
        if (!props.multiple) setShowOptions(false);
      }}
      multiple={!!props.multiple}
      nullable
    >
      {() => (
        <Popover
          isOpen={showOptions}
          onOpenChange={setShowOptions}
          placement={props.placement}
          popoverClass="w-full"
          trigger="click"
          renderTarget={({ ref, props: popoverProps }) => (
            <div ref={ref} {...popoverProps}>
              <div className="w-full space-y-1.5">
                {props.label && (
                  <label className="block text-xs text-ink-gray-5">
                    {props.label}
                  </label>
                )}
                <Combobox.Button className="flex h-7 w-full items-center justify-between gap-2 rounded bg-surface-gray-2 px-2 py-1 transition-colors hover:bg-surface-gray-3 border border-transparent focus:border-outline-gray-4 focus:outline-none focus:ring-2 focus:ring-outline-gray-3">
                  <div className="flex items-center overflow-hidden">
                    <span className="truncate text-base leading-5 text-ink-gray-8">
                      {(() => {
                        if (!props.value) return props.placeholder || '';
                        if (props.multiple) {
                          return (props.value as (OptionValue | Option)[])
                            .map(v => typeof v === 'object' ? v.label : v)
                            .join(', ');
                        }
                        return typeof props.value === 'object' 
                          ? props.value.label 
                          : props.value;
                      })()}
                    </span>
                  </div>
                  <FeatherIcon 
                    name="chevron-down" 
                    className="h-4 w-4 text-ink-gray-5" 
                    aria-hidden="true" 
                  />
                </Combobox.Button>
              </div>
            </div>
          )}
        >
              {() => (
                <div className="w-fit select-none text-base text-ink-gray-9 divide-y divide-outline-gray-modals rounded-lg bg-surface-modal shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {!props.hideSearch && (
                    <div className="sticky top-0 z-10 flex items-stretch space-x-1.5 bg-surface-modal py-1.5 px-1.5">
                      <div className="relative w-full">
                        <Combobox.Input
                          ref={searchInputRef}
                          className="form-input w-full focus:bg-surface-gray-3 hover:bg-surface-gray-4 text-ink-gray-8"
                          type="text"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Search"
                        />
                        <div className="absolute right-0 inline-flex h-7 w-7 items-center justify-center">
                          {props.loading ? (
                            <LoadingIndicator className="h-4 w-4 text-ink-gray-5" />
                          ) : (
                            <button onClick={() => setQuery('')}>
                              <FeatherIcon name="x" className="w-4 text-ink-gray-8" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <Combobox.Options className="max-h-[15rem] overflow-y-auto px-1.5 pb-1.5">
                    {groups.map((group, groupIdx) => (
                      <div key={groupIdx}>
                        {group.group && !group.hideLabel && (
                          <div className="sticky top-10 truncate bg-surface-modal px-2.5 py-1.5 text-sm font-medium text-ink-gray-5">
                            {group.group}
                          </div>
                        )}
                        {group.items.map((option, optionIdx) => (
                          <Combobox.Option
                            key={optionIdx}
                            value={option}
                            disabled={typeof option === 'object' && option.disabled}
                            className={({ active }) => 
                              `flex cursor-pointer items-center justify-between rounded px-2.5 py-1.5 text-base ${
                                active ? 'bg-surface-gray-3' : ''
                              } ${
                                (typeof option === 'object' && option.disabled) ? 'opacity-50' : ''
                              }`
                            }
                          >
                            {() => (
                              <>
                                <div className="flex flex-1 gap-2 overflow-hidden items-center">
                                  <span className="flex-1 truncate text-ink-gray-7">
                                    {getLabel(option)}
                                  </span>
                                </div>
                                {typeof option === 'object' && option.description && (
                                  <div className="ml-2 flex-shrink-0 text-sm text-ink-gray-5">
                                    {option.description}
                                  </div>
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </div>
                    ))}
                    {groups.every(g => g.items.length === 0) && (
                      <div className="rounded-md px-2.5 py-1.5 text-base text-ink-gray-5">
                        No results found
                      </div>
                    )}
                  </Combobox.Options>

                  {(props.showFooter || props.multiple) && (
                    <div className="border-t p-1">
                      {props.multiple ? (
                        <div className="flex items-center justify-end">
                          <Button label="Clear All" onClick={() => props.onChange?.([])} />
                        </div>
                      ) : (
                        <div className="flex items-center justify-end">
                          <Button label="Clear" onClick={() => props.onChange?.(null)} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
        </Popover>
      )}
    </Combobox>
  )
}
