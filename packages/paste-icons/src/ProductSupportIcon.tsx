/**
 * This file was automatically generated with @twilio-labs/svg-to-react
 */
import * as React from 'react';
import {UID} from 'react-uid';
import {IconWrapper, IconWrapperProps} from './helpers/IconWrapper';

export interface ProductSupportIconProps extends IconWrapperProps {
  title?: string;
  decorative: boolean;
}

const ProductSupportIcon: React.FC<ProductSupportIconProps> = ({as, display, size, iconColor, title, decorative}) => {
  if (!decorative && title == null) {
    throw new Error('[ProductSupportIcon]: Missing a title for non-decorative icon.');
  }

  return (
    <IconWrapper as={as} display={display} size={size} iconColor={iconColor}>
      <UID>
        {titleId => (
          <svg
            role="img"
            aria-hidden={decorative}
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            aria-labelledby={titleId}
          >
            {title ? <title id={titleId}>{title}</title> : null}
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M17.657 6.343A8 8 0 116.343 17.657 8 8 0 0117.657 6.343zm-9.34 4.095L6.102 8.226a7.01 7.01 0 000 7.55l2.214-2.213a4.013 4.013 0 010-3.125zm7.457 7.459l-2.212-2.213a4.013 4.013 0 01-3.124 0l-2.212 2.213a7.01 7.01 0 007.548 0zm-1.653-8.018A3 3 0 109.88 14.12 3 3 0 0014.12 9.88zM8.225 6.104l2.212 2.213a4.013 4.013 0 013.126 0l2.212-2.213a7.01 7.01 0 00-7.31-.147l-.24.147zm9.672 2.122l-2.213 2.212a4.013 4.013 0 010 3.125l2.212 2.212a7.01 7.01 0 00.001-7.55z"
            />
          </svg>
        )}
      </UID>
    </IconWrapper>
  );
};

ProductSupportIcon.displayName = 'ProductSupportIcon';
export {ProductSupportIcon};
