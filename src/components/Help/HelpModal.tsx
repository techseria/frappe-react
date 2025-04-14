import React, { useState, useEffect } from 'react';
import { Dropdown } from '../Dropdown';
import Button from '../Button/index';
import { FeatherIcon } from '../FeatherIcon';
import MinimizeIcon from '../Icons/MinimizeIcon';
import MaximizeIcon from '../Icons/MaximizeIcon';
import HelpIcon from '../Icons/HelpIcon';
import OnboardingSteps from '../Onboarding/OnboardingSteps';
import HelpCenter from '../HelpCenter/HelpCenter';
import StepsIcon from '../Icons/StepsIcon';

export interface HelpModalProps {
  appName?: string;
  title?: string;
  logo: React.ReactElement;
  docsLink?: string;
}

const HelpModal: React.FC<HelpModalProps> = ({
  appName = 'frappecrm',
  title = 'Frappe CRM',
  logo,
  // docsLink is used in HelpCenter component
}) => {
  const [show, setShow] = useState(true);
  const [minimize, setMinimize] = useState(false);
  const [articles] = useState<any[]>([]);
  // Using destructuring to avoid the "declared but never read" warning
  const [isOnboardingStepsCompleted, _setIsOnboardingStepsCompleted] = useState(false);
  // Create a wrapper function that uses the setter
  const setIsOnboardingStepsCompleted = (value: boolean) => {
    _setIsOnboardingStepsCompleted(value);
  };
  const [showHelpCenter, setShowHelpCenter] = useState(false);

  const headingTitle = (!isOnboardingStepsCompleted && !showHelpCenter)
    ? 'Getting started'
    : showHelpCenter
    ? 'Help center'
    : '';

  const options = [
    {
      icon: HelpIcon,
      label: 'Help centre',
      onClick: () => setShowHelpCenter(true),
      condition: () => !isOnboardingStepsCompleted && !showHelpCenter,
    },
    {
      icon: StepsIcon,
      label: 'Getting started',
      onClick: () => setShowHelpCenter(false),
      condition: () => showHelpCenter && !isOnboardingStepsCompleted,
    },
  ].filter(item => item.condition());

  const footerItems = [
    {
      icon: HelpIcon,
      label: 'Help centre',
      onClick: () => setShowHelpCenter(true),
      condition: () => !isOnboardingStepsCompleted && !showHelpCenter,
    },
    {
      icon: StepsIcon,
      label: 'Getting started',
      onClick: () => setShowHelpCenter(false),
      condition: () => showHelpCenter && !isOnboardingStepsCompleted,
    },
  ].filter((item: any) => item.condition());

  // This function can be used to reset onboarding steps if needed
  // const resetOnboardingSteps = () => {
  //   setIsOnboardingStepsCompleted(false);
  //   setShowHelpCenter(false);
  // };

  useEffect(() => {
    if (isOnboardingStepsCompleted) {
      setShowHelpCenter(true);
    }
  }, [isOnboardingStepsCompleted]);

  function renderFooterItems() {
    return (
      <div className="flex flex-col gap-1.5">
        {footerItems && footerItems.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="w-full flex gap-2 items-center hover:bg-surface-gray-1 text-ink-gray-8 rounded px-2 py-1.5 cursor-pointer"
              onClick={item.onClick}
            >
              {item.icon && <item.icon className="h-4" />}
              <div className="text-base">{item.label}</div>
            </div>
          );
        })}
      </div>
    );
  }

  return show ? (
    <div
      className={`fixed z-50 right-0 w-80 h-[calc(100%_-_80px)] text-ink-gray-9 m-5 mt-[62px] p-3 flex flex-col justify-between rounded-lg bg-surface-modal shadow-2xl ${minimize ? 'top-[calc(100%_-_120px)] border' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-2 py-1.5">
        <div className="text-base font-medium">{headingTitle}</div>
        <div className="flex gap-1">
          {options.length > 0 && (
            <Dropdown options={options}>
              <Button variant="ghost" prefix={<FeatherIcon name="more-horizontal" className="h-3.5" />} />
            </Dropdown>
          )}
          <Button variant="ghost" onClick={() => setMinimize(!minimize)}>
            {minimize ? <MaximizeIcon className="h-3.5" /> : <MinimizeIcon className="h-3.5" />}
          </Button>
          <Button variant="ghost" onClick={() => setShow(false)}>
            <FeatherIcon name="x" className="h-3.5" />
          </Button>
        </div>
      </div>
      <div className="h-full overflow-hidden flex flex-col">
        {!isOnboardingStepsCompleted && !showHelpCenter ? (
          <OnboardingSteps
            title={title}
            logo={logo}
            appName={appName}
          />
        ) : showHelpCenter ? (
          <HelpCenter articles={articles} docsLink="https://example.com" />
        ) : null}
      </div>
      {renderFooterItems()}
    </div>
  ) : null;
};

export default HelpModal;
