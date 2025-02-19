import * as React from 'react';
import PropTypes from 'prop-types';
import {useDisclosurePrimitiveState} from '@twilio-paste/disclosure-primitive';
import {Box, safelySpreadBoxProps} from '@twilio-paste/box';
import type {BoxProps} from '@twilio-paste/box';
import type {DisclosurePrimitiveInitialState} from '@twilio-paste/disclosure-primitive';

import {DisclosureContext} from './DisclosureContext';
import type {DisclosureVariants, DisclosureStateReturn} from './types';

export interface DisclosureProps extends DisclosurePrimitiveInitialState, Pick<BoxProps, 'element'> {
  children: NonNullable<React.ReactNode>;
  state?: DisclosureStateReturn;
  variant?: DisclosureVariants;
}

const Disclosure = React.forwardRef<HTMLDivElement, DisclosureProps>(
  ({children, element = 'DISCLOSURE', variant = 'default', state, ...props}, ref) => {
    const disclosure = state || useDisclosurePrimitiveState({animated: true, ...props});
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [isHeadingHovered, setIsHeadingHovered] = React.useState(false);

    const disclosureContext = {
      disclosure,
      variant,
      isHeadingHovered,
      setIsHeadingHovered,
      isDisabled,
      setIsDisabled,
    };

    return (
      <DisclosureContext.Provider value={disclosureContext}>
        <Box {...safelySpreadBoxProps(props)} variant={variant} element={element} ref={ref}>
          {children}
        </Box>
      </DisclosureContext.Provider>
    );
  }
);
Disclosure.displayName = 'Disclosure';
Disclosure.propTypes = {
  children: PropTypes.node.isRequired,
  element: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'contained'] as DisclosureVariants[]),
};

export {Disclosure};

export {useDisclosurePrimitiveState as useDisclosureState};
