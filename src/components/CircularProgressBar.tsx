import { useState, useEffect } from 'react';
import './CircularProgressBar.css';
import FeatherIcon from './FeatherIcon';

type Variant = 'solid' | 'outline';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Theme = 'black' | 'red' | 'green' | 'blue' | 'orange';

interface SizeProps {
  ringSize: string;
  ringBarWidth: string;
  innerTextFontSize: string;
  checkIconSize: string;
}

interface ThemeProps {
  primary: string;
  secondary: string;
}

interface CircularProgressBarProps {
  step: number;
  totalSteps: number;
  showPercentage?: boolean;
  variant?: Variant;
  theme?: string | ThemeProps;
  size?: Size;
  themeComplete?: string;
}

const sizeMap: Record<Size, SizeProps> = {
  xs: {
    ringSize: '30px',
    ringBarWidth: '6px',
    innerTextFontSize: '8px',
    checkIconSize: '16px',
  },
  sm: {
    ringSize: '42px',
    ringBarWidth: '10px',
    innerTextFontSize: '12px',
    checkIconSize: '20px',
  },
  md: {
    ringSize: '60px',
    ringBarWidth: '14px',
    innerTextFontSize: '16px',
    checkIconSize: '24px',
  },
  lg: {
    ringSize: '84px',
    ringBarWidth: '18px',
    innerTextFontSize: '20px',
    checkIconSize: '40px',
  },
  xl: {
    ringSize: '108px',
    ringBarWidth: '22px',
    innerTextFontSize: '24px',
    checkIconSize: '48px',
  },
};

const themeMap: Record<Theme, ThemeProps> = {
  black: {
    primary: '#333',
    secondary: '#888',
  },
  red: {
    primary: '#FF0000',
    secondary: '#FFD7D7',
  },
  green: {
    primary: '#22C55E',
    secondary: '#b1ffda',
  },
  blue: {
    primary: '#2376f5',
    secondary: '#D7D7FF',
  },
  orange: {
    primary: '#FFA500',
    secondary: '#FFE5CC',
  },
};

export default function CircularProgressBar({
  step = 1,
  totalSteps = 4,
  showPercentage = false,
  theme = 'black',
  size = 'md',
  themeComplete = 'lightgreen',
  variant = 'solid',
}: CircularProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const newProgress = (step / totalSteps) * 100;
    setProgress(newProgress);
    setIsCompleted(step === totalSteps);
  }, [step, totalSteps]);

  const currentSize = sizeMap[size] || sizeMap['md'];
  const currentTheme = typeof theme === 'string' ? themeMap[theme as Theme] || themeMap['black'] : theme;

  return (
    <div
      className={`progressbar ${isCompleted ? 'completed' : ''} ${variant === 'outline' ? 'fillOuter' : ''}`}
      role="progressbar"
      style={{
        '--size': currentSize.ringSize,
        '--bar-width': currentSize.ringBarWidth,
        '--font-size': showPercentage ? currentSize.innerTextFontSize : currentSize.innerTextFontSize,
        '--check-icon-size': currentSize.checkIconSize,
        '--color-progress': currentTheme.primary,
        '--color-remaining-circle': currentTheme.secondary,
        '--color-complete': themeComplete,
        '--progress': `${progress}%`,
      } as React.CSSProperties}
    >
      {!isCompleted ? (
        <div>
          {showPercentage ? (
            <p>{progress.toFixed(0)}%</p>
          ) : (
            <p>{step}</p>
          )}
        </div>
      ) : (
        <FeatherIcon name="check" className="check-icon" />
      )}
    </div>
  );
}