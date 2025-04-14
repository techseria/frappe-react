import React from 'react';
import Button from '../Button/index'; // Adjust the import path if necessary
import LightningIcon from '../LightningIcon';
import { FeatherIcon } from '../FeatherIcon';

// Fallback translation function; replace with actual i18n if available.
const __ = (str: string): string => str;

interface SignupBannerProps {
  isSidebarCollapsed?: boolean;
  appName?: string;
  redirectURL?: string;
  afterSignup?: () => void;
  children?: React.ReactNode;
}

const SignupBanner: React.FC<SignupBannerProps> = ({
  isSidebarCollapsed = false,
  appName = 'Frappe CRM',
  redirectURL = 'https://frappecloud.com/crm/signup',
  afterSignup = () => {},
  children,
}) => {
  const signupNow = () => {
    window.open(redirectURL, '_blank');
    afterSignup();
  };

  if (!isSidebarCollapsed) {
    return (
      <div className="flex flex-col gap-3 shadow-sm rounded-lg py-2.5 px-3 bg-surface-white text-base">
        <div className="flex flex-col gap-1">
          {children ? (
            children
          ) : (
            <>
              <div className="inline-flex gap-2 items-center font-medium">
                <FeatherIcon className="h-4" name="info" />
                {__('Loved the demo?')}
              </div>
              <div className="text-ink-gray-7 text-p-sm">
                {`Try ${appName} for free with a 14-day trial.`}
              </div>
            </>
          )}
        </div>
        <Button
          label={__('Sign up now')}
          theme="blue"
          onClick={signupNow}
          prefix={<LightningIcon className="size-4" />}
        />
      </div>
    );
  } else {
    return (
      <Button onClick={signupNow}>
        <LightningIcon className="h-4 my-0.5 shrink-0" />
      </Button>
    );
  }
};

export default SignupBanner;
