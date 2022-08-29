import * as React from 'react';
import type {Story, Meta} from '@storybook/react';
import {ChevronDownIcon} from '@twilio-paste/icons/esm/ChevronDownIcon';
import {Box} from '@twilio-paste/box';
import {Label} from '@twilio-paste/label';
import {FormPillGroup, FormPill, useFormPillState} from '@twilio-paste/form-pill-group';
import {CheckboxCheckIcon} from '@twilio-paste/icons/esm/CheckboxCheckIcon';
import {useCombobox, useMultipleSelection} from '@twilio-paste/dropdown-library';
import {InputBox, InputChevronWrapper, getInputChevronIconColor} from '@twilio-paste/input-box';
import {GrowingInput} from '../src/multiselect/GrowingInput';
import includes from 'lodash/includes';
import type {
  UseComboboxPrimitiveGetItemPropsOptions,
  UseComboboxPrimitiveGetMenuPropsOptions,
  GetComboboxPrimitivePropsCommonOptions,
} from '@twilio-paste/combobox-primitive';

type Book = {
  author: string;
  title: string;
};

const books: Book[] = [
  {author: 'Harper Lee', title: 'To Kill a Mockingbird'},
  {author: 'Lev Tolstoy', title: 'War and Peace'},
  {author: 'Fyodor Dostoyevsy', title: 'The Idiot'},
  {author: 'Oscar Wilde', title: 'A Picture of Dorian Gray'},
  {author: 'George Orwell', title: '1984'},
  {author: 'Jane Austen', title: 'Pride and Prejudice'},
  {author: 'Marcus Aurelius', title: 'Meditations'},
  {author: 'Fyodor Dostoevsky', title: 'The Brothers Karamazov'},
  {author: 'Lev Tolstoy', title: 'Anna Karenina'},
  {author: 'Fyodor Dostoevsky', title: 'Crime and Punishment'},
];

function getFilteredBooks(inputValue: string): Book[] {
  const lowerCasedInputValue = inputValue.toLowerCase();

  return books.filter(function filterBook(book) {
    return (
      book.title.toLowerCase().includes(lowerCasedInputValue) ||
      book.author.toLowerCase().includes(lowerCasedInputValue)
    );
  });
}

interface ItemProps {
  getItemProps: (options: UseComboboxPrimitiveGetItemPropsOptions<Book>) => any;
  item: Book;
  index: number;
  isHighlighted: boolean;
  isSelected: boolean;
  isLast: boolean;
}

// eslint-disable-next-line react/display-name
const Item = React.memo(({item, index, getItemProps, isHighlighted, isSelected, isLast, ...rest}: ItemProps) => {
  //   console.log('render book item:', item, index, getItemProps, isHighlighted);
  return (
    <Box
      {...getItemProps({item, index, ...rest})}
      as="li"
      position="relative"
      cursor="pointer"
      display="flex"
      alignItems="center"
      height="auto"
      textAlign="left"
      borderTop="none"
      lineHeight="lineHeight10"
      fontSize="fontSize40"
      textTransform="none"
      fontWeight="fontWeightNormal"
      paddingX="space60"
      paddingY="space40"
      whiteSpace="normal"
      wordWrap="normal"
      border="none"
      margin="space0"
      width="100%"
      marginBottom={isLast ? 'space0' : 'space10'}
      borderLeftWidth="borderWidth30"
      borderLeftColor={isHighlighted ? 'colorBorderPrimary' : 'transparent'}
      borderLeftStyle="solid"
      transition="all 200ms ease-in"
      boxShadow={isLast ? 'none' : 'shadowBorderBottomDecorative10Weaker'}
      /*
      borderBottomWidth="borderWidth10"
      borderBottomColor="colorBorderDecorative10Weaker"
      borderBottomStyle="solid"
      */
      color={isHighlighted ? 'colorTextLinkStronger' : 'textColor'}
      backgroundColor={isHighlighted ? 'colorBackgroundDecorative20Weakest' : 'colorBackgroundBody'}
    >
      <Box as="span" minHeight="1.25rem">
        {item.title}
      </Box>
      <Box as="span" minHeight="1.25rem">
        {' '}
        - {item.author}
      </Box>
      <Box as="span" minHeight="1.25rem" marginLeft="auto" hidden={isSelected ? false : true}>
        <CheckboxCheckIcon decorative={false} title="TODO: INJECT AS PROP FOR I18N" />
      </Box>
    </Box>
  );
});

interface MenuProps {
  items: Book[];
  selectedItems: Book[];
  getMenuProps: (
    options?: UseComboboxPrimitiveGetMenuPropsOptions | undefined,
    otherOptions?: GetComboboxPrimitivePropsCommonOptions | undefined
  ) => any;
  getItemProps: (options: UseComboboxPrimitiveGetItemPropsOptions<Book>) => any;
  highlightedIndex: number;
  children?: never;
  isOpen: boolean;
}

// eslint-disable-next-line react/display-name
const Menu = React.memo(({isOpen, items, selectedItems, getMenuProps, getItemProps, highlightedIndex}: MenuProps) => {
  if (!isOpen) return null;
  return (
    <Box
      {...getMenuProps()}
      as="ul"
      marginTop="space0"
      padding="space0"
      position="absolute"
      top="108%" // TODO can we remove this magic number for layout to get the menu positioned corrrectly against focus ring?
      backgroundColor="white"
      width="100%"
      maxHeight="20rem"
      overflowY="auto"
      overflowX="hidden"
      outline="none"
      transition="opacity .1s ease"
      borderRadius="borderRadius20"
      boxShadow="shadow"
      borderColor="colorBorderDecorative10Weaker"
      borderStyle="solid"
      borderWidth="borderWidth10"
    >
      {items.map((item, index, arr) => (
        <Item
          key={index}
          getItemProps={getItemProps}
          index={index}
          item={item}
          isHighlighted={highlightedIndex === index}
          isSelected={selectedItems.includes(item)}
          isLast={arr[arr.length - 1] === item}
        />
      ))}
    </Box>
  );
});

export const MultiselectComboBox: Story = ({element = 'Multiselect'}) => {
  const [inputValue, setInputValue] = React.useState('');
  const filteredItems = React.useMemo(() => getFilteredBooks(inputValue), [inputValue]);
  // const [selectedItems, setSelectedItems] = React.useState<Book[]>([]);
  const pillState = useFormPillState();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const {
    // Call and destructure its returned object on the selected item element.
    // getSelectedItemProps,
    // Call optionally with preventKeyAction and destructure its returned object on the toggle button (select) or input (combobox) element.
    getDropdownProps,
    // Action prop that removes the item from the selection. Used in the X icon/button onClick handler.
    removeSelectedItem,
    addSelectedItem,
    // initialSelectedItems i.e.: [items[0], items[1]]
    // TODO make a prop
    selectedItems,
  } = useMultipleSelection<Book>();

  const {
    // State value with the open state of the menu. Used below for conditionally showing the items.
    isOpen,
    // Call and destructure its returned object on the toggle button (if any).
    getToggleButtonProps,
    // Call and destructure its returned object on the label element.
    getLabelProps,
    // Call and destructure its returned object on the menu element.
    getMenuProps,
    // Call and destructure its returned object on the input element.
    getInputProps,
    // Call and destructure its returned object on the input and toggle button parent.
    getComboboxProps,
    // Call with index or item and destructure its returned object on each menu item element.
    getItemProps,
    // State value with the index of thehighlighted menu item. Used below for styling.
    highlightedIndex,
    // State value with the item that is selected. Used below for styling.
    // selectedItem,
    // State value with the search query. Used below for filtering the items.
    // inputValue,
  } = useCombobox({
    // The controlled state of currently available items to select
    // TODO this should always persist but render a checkmark
    items: filteredItems,
    /* Items are objects and not strings.
     * As a result, the itemToString prop is passed to useCombobox. It will return
     * the string equivalent of the item which will be used for displaying the item
     * in the input once selected and for the a11y aria-live message that will occur
     * on every item selection: ${itemToString(item)} has been selected.
     *
     * item.title is chosen to be the string equialent of each item object,
     * so our prop will be passed as itemToString: item => item ? item.title : ''.
     *
     * Since clearing the input by Escape key is also considered an element change,
     * we will return an empty string in this case.
     */
    itemToString(item) {
      return item ? `${item.title} - ${item.author}` : '';
    },
    // For multiselect, we need `selectedItem` to always be null.
    // We keep our selected items in a state variable, selectedItems.
    // TODO ? We use onSelectedItemChange prop to retrieve the selectedItem from useCombobox, which is added to / removed from the selectedItems array. We also use stateReducer to keep the menu open on selection by Enter key or by click, and also to keep the highlightedIndex to be the most recent selected item.
    selectedItem: null,
    // https://www.downshift-js.com/use-combobox#state-reducer
    // Handles how state in Downshift should change as a result of user action
    stateReducer(_state, actionAndChanges) {
      const {changes, type} = actionAndChanges;

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            // If an item was selected, keep the menu open and reset the highlightedIndex to the first item.
            ...(changes.selectedItem && {isOpen: true, highlightedIndex: filteredItems.indexOf(changes.selectedItem)}),
          };
      }
      return changes;
    },
    // https://www.downshift-js.com/use-combobox#controlling-state
    onStateChange({inputValue: newInputValue = '', type, selectedItem: newSelectedItem}) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (newSelectedItem) {
            if (includes(selectedItems, newSelectedItem)) {
              removeSelectedItem(newSelectedItem);
            } else {
              addSelectedItem(newSelectedItem);
            }
          }
          break;
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue);
          break;
        default:
          break;
      }
    },
  });

  return (
    <Box position="relative" element={`${element}_WRAPPER`}>
      <Label {...getLabelProps()}>Choose an element:</Label>

      <InputBox disabled={false} hasError={false} element={'test-multiselect'} variant={'default'}>
        <Box
          {...getToggleButtonProps({
            onClick: () => {
              // Clicking anywhere on the combobox wrapper will focus the GrowingInput
              if (inputRef && inputRef.current) {
                inputRef.current.focus();
              }
            },
          })}
          {...getComboboxProps({
            role: 'combobox',
          })}
          position="relative"
          width="100%"
          paddingY="space30"
          paddingX="space40"
        >
          <FormPillGroup {...pillState} aria-label="Products:">
            {selectedItems.map(function renderSelectedItems(selectedItem) {
              return (
                <FormPill
                  key={`${selectedItem.title}-${selectedItem.author}`}
                  onDismiss={() => {
                    removeSelectedItem(selectedItem);
                  }}
                  onSelect={(event) => event.stopPropagation()} // prevent losing focus on pill to focus input
                  {...pillState}
                >
                  {selectedItem.title}
                </FormPill>
              );
            })}
          </FormPillGroup>
          <GrowingInput
            ref={inputRef}
            // we spread props into `getInputProps` so that Downshift handles events correctly
            {...getInputProps(getDropdownProps({ref: inputRef, preventKeyAction: isOpen}))}
            element={`multi-input-element`}
          />

          <InputChevronWrapper element={`multi_CHEVRON_WRAPPER`}>
            <ChevronDownIcon
              aria-hidden="true"
              decorative
              color={getInputChevronIconColor('default', false, false)}
              size="sizeIcon30"
            />
          </InputChevronWrapper>
        </Box>
      </InputBox>

      <Menu
        isOpen={isOpen}
        highlightedIndex={highlightedIndex}
        getMenuProps={getMenuProps}
        getItemProps={getItemProps}
        items={filteredItems}
        selectedItems={selectedItems}
      />
    </Box>
  );
};

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Components/Combobox/Multiselect',
  parameters: {},
  component: MultiselectComboBox,
} as Meta;
