import { ReactNode, useState } from 'react';

type AvatarProps = {
  image?: string;
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  shape?: 'circle' | 'square';
  children?: ReactNode;
  indicator?: ReactNode;
};

export default function Avatar({
  image,
  label,
  size = 'md',
  shape = 'circle',
  children,
  indicator,
}: AvatarProps) {
  const [imgFetchError, setImgFetchError] = useState(false);

  const shapeClasses = {
    circle: 'rounded-full',
    square: {
      xs: 'rounded-[4px]',
      sm: 'rounded-[5px]',
      md: 'rounded-[5px]',
      lg: 'rounded-[6px]',
      xl: 'rounded-[6px]',
      '2xl': 'rounded-[8px]',
      '3xl': 'rounded-[10px]',
    }[size],
  }[shape];

  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10',
    '3xl': 'w-11.5 h-11.5',
  }[size];

  const labelClasses = {
    xs: 'text-2xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-base',
    xl: 'text-lg',
    '2xl': 'text-xl',
    '3xl': 'text-2xl',
  }[size];

  const indicatorContainerClasses = {
    xs: '-mr-[.1rem] -mb-[.1rem] h-2 w-2',
    sm: '-mr-[.1rem] -mb-[.1rem] h-[9px] w-[9px]',
    md: '-mr-[.1rem] -mb-[.1rem] h-2.5 w-2.5',
    lg: '-mr-[.1rem] -mb-[.1rem] h-3 w-3',
    xl: '-mr-[.1rem] -mb-[.1rem] h-3 w-3',
    '2xl': '-mr-[.1rem] -mb-[.1rem] h-3.5 w-3.5',
    '3xl': '-mr-[.2rem] -mb-[.2rem] h-4 w-4',
  }[size];

  const indicatorClasses = {
    xs: 'h-1 w-1',
    sm: 'h-[5px] w-[5px]',
    md: 'h-1.5 w-1.5',
    lg: 'h-2 w-2',
    xl: 'h-2 w-2',
    '2xl': 'h-2.5 w-2.5',
    '3xl': 'h-3 w-3',
  }[size];

  const iconClasses = {
    xs: 'h-2.5 w-2.5',
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-4 w-4',
    xl: 'h-4 w-4',
    '2xl': 'h-5 w-5',
    '3xl': 'h-5 w-5',
  }[size];

  const handleImageError = () => {
    setImgFetchError(true);
  };

  return (
    <div className={`relative inline-block shrink-0 ${sizeClasses} ${shapeClasses}`}>
      {image && !imgFetchError ? (
        <img
          src={image}
          alt={label}
          className={`${shapeClasses} h-full w-full object-cover`}
          onError={handleImageError}
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center bg-surface-gray-2 uppercase text-ink-gray-5 font-medium ${labelClasses} ${shapeClasses}`}
        >
          {children ? (
            <div className={iconClasses}>{children}</div>
          ) : (
            label?.[0]
          )}
        </div>
      )}
      {indicator && (
        <div
          className={`absolute bottom-0 right-0 grid place-items-center rounded-full bg-surface-white ${indicatorContainerClasses}`}
        >
          <div className={indicatorClasses}>{indicator}</div>
        </div>
      )}
    </div>
  );
}
