import React from 'react';

export interface OnboardingStepsProps {
  title: string;
  logo: React.ReactElement;
  afterSkip?: () => void;
  afterSkipAll?: () => void;
  afterReset?: () => void;
  afterResetAll?: () => void;
  appName: string;
}

const OnboardingSteps: React.FC<OnboardingStepsProps> = ({
  title,
  logo,
  appName,
}) => {
  return (
    <div>
      <h2>Welcome to {appName}</h2>
      {logo}
      <p>{title}</p>
      {/* Add onboarding UI steps here */}
    </div>
  );
};

export default OnboardingSteps;
