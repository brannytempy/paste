import * as React from 'react';
import type {StoryFn} from '@storybook/react';
import {Stack} from '@twilio-paste/stack';
import {Card} from '@twilio-paste/card';
import {Text} from '@twilio-paste/text';
import {CustomizationProvider} from '@twilio-paste/customization';
import type {PasteCustomCSS} from '@twilio-paste/customization';
import {useTheme} from '@twilio-paste/theme';

import type {ToastVariants} from '../src';
import {Toast} from '../src';

export const makeToast = (variant: ToastVariants, element?: string): React.ReactElement => {
  return (
    <Toast variant={variant} element={element} onDismiss={() => {}} data-testid={`toast_${variant}`}>
      <Text as="div">Hello I am a toast</Text>
    </Toast>
  );
};

export const getStyles = (element = 'TOAST'): {[key: string]: PasteCustomCSS} => ({
  [element]: {
    width: 'size30',
    borderTopWidth: 'borderWidth30',
    borderLeftWidth: 'borderWidth0',
    variants: {
      neutral: {borderTopColor: 'colorBorderNeutral', backgroundColor: 'colorBackgroundPrimaryWeakest'},
      success: {borderTopColor: 'colorBorderSuccess', backgroundColor: 'colorBackgroundTrial'},
      error: {borderTopColor: 'colorBorderError', backgroundColor: 'colorBackgroundDestructiveWeakest'},
      warning: {borderTopColor: 'colorBorderWarning', backgroundColor: 'colorBackgroundWarningWeakest'},
    },
  },
  [`${element}_ICON`]: {color: 'colorTextIcon'},
  [`${element}_CLOSE_BUTTON`]: {cursor: 'not-allowed'},
  [`${element}_CLOSE_ICON`]: {color: 'colorTextIconError'},
});

const ShowCustomization: React.FC<{variant: ToastVariants; isTestEnvironment: boolean}> = ({
  variant,
  isTestEnvironment,
}): React.ReactElement => {
  const theme = useTheme();
  return (
    <Stack orientation="vertical" spacing="space50">
      <Card>
        <Stack orientation="vertical" spacing="space30">
          <Text as="div">Default:</Text>
          {makeToast(variant)}
        </Stack>
      </Card>
      <Card>
        <CustomizationProvider disableAnimations={isTestEnvironment} theme={theme} elements={getStyles()}>
          <Stack orientation="vertical" spacing="space30">
            <Text as="div">Customized:</Text>
            {makeToast(variant)}
          </Stack>
        </CustomizationProvider>
      </Card>
      <Card>
        <CustomizationProvider disableAnimations={isTestEnvironment} theme={theme} elements={getStyles('FOO')}>
          <Stack orientation="vertical" spacing="space30">
            <Text as="div">Customized with custom `element` prop:</Text>
            {makeToast(variant, 'FOO')}
          </Stack>
        </CustomizationProvider>
      </Card>
    </Stack>
  );
};

export const NeutralCustomized: StoryFn = (_args, {parameters: {isTestEnvironment}}) => {
  return <ShowCustomization isTestEnvironment={isTestEnvironment} variant="neutral" />;
};

export const SuccessCustomized: StoryFn = (_args, {parameters: {isTestEnvironment}}) => {
  return <ShowCustomization isTestEnvironment={isTestEnvironment} variant="success" />;
};

export const ErrorCustomized: StoryFn = (_args, {parameters: {isTestEnvironment}}) => {
  return <ShowCustomization isTestEnvironment={isTestEnvironment} variant="error" />;
};

export const WarningCustomized: StoryFn = (_args, {parameters: {isTestEnvironment}}) => {
  return <ShowCustomization isTestEnvironment={isTestEnvironment} variant="warning" />;
};

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Components/Toast/Customization',
  excludeStories: ['makeToast', 'getStyles'],
  parameters: {
    a11y: {
      // no need to a11y check customization
      disable: true,
    },
  },
};
