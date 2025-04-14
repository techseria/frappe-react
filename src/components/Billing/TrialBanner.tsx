import React, { useState, useEffect } from 'react';
import Button from '../Button/index';
import LightningIcon from '../LightningIcon';
import { FeatherIcon } from '../FeatherIcon';

interface TrialBannerProps {
  isSidebarCollapsed?: boolean;
  afterUpgrade?: () => void;
}

const TrialBanner: React.FC<TrialBannerProps> = ({
  isSidebarCollapsed = false,
  afterUpgrade = () => {},
}) => {
  const [trialEndDays, setTrialEndDays] = useState(0);
  const [showBanner, setShowBanner] = useState(false);
  const [baseEndpoint, setBaseEndpoint] = useState('https://frappecloud.com');
  const [siteName, setSiteName] = useState('');

  const trialTitle = trialEndDays > 1 ? `Trial ends in ${trialEndDays} days` : 'Trial ends tomorrow';
  const trialMessage = 'Upgrade to a paid plan for uninterrupted services';

  const calculateTrialEndDays = (trialEndDate: string): number => {
    if (!trialEndDate) return 0;
    const endDate = new Date(trialEndDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const upgradePlan = () => {
    window.open(`${baseEndpoint}/dashboard/sites/${siteName}`, '_blank');
    afterUpgrade();
  };

  useEffect(() => {
    // Replace the following simulated fetch with frappe-react-sdk resource fetching as needed
    async function fetchSiteInfo() {
      // Simulated API response:
      const data = {
        trial_end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // trial ends in 3 days
        base_url: 'https://frappecloud.com',
        site_name: 'example-site',
        setup_complete: true,
        plan: {
          is_trial_plan: true,
        },
      };

      const days = calculateTrialEndDays(data.trial_end_date);
      setTrialEndDays(days);
      setBaseEndpoint(data.base_url);
      setSiteName(data.site_name);
      setShowBanner(data.setup_complete && data.plan.is_trial_plan && days > 0);
    }
    fetchSiteInfo();
  }, []);

  if (!showBanner) return null;

  if (!isSidebarCollapsed) {
    return (
      <div className="flex flex-col gap-3 shadow-sm rounded-lg py-2.5 px-3 bg-surface-modal text-base">
        <div className="flex flex-col gap-1">
          <div className="inline-flex text-ink-gray-9 gap-2 items-center font-medium">
            <FeatherIcon className="h-4" name="info" />
            {trialTitle}
          </div>
          <div className="text-ink-gray-7 text-p-sm">
            {trialMessage}
          </div>
        </div>
        <Button
          label="Upgrade plan"
          theme="blue"
          onClick={upgradePlan}
          prefix={<LightningIcon className="size-4" />}
        />
      </div>
    );
  } else {
    return (
      <Button onClick={upgradePlan}>
        <LightningIcon className="h-4 my-0.5 shrink-0" />
      </Button>
    );
  }
};

export default TrialBanner;
