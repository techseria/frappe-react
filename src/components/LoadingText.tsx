import { LoadingIndicator } from './LoadingIndicator';

type LoadingTextProps = {
  text?: string;
};

export default function LoadingText({ text = 'Loading...' }: LoadingTextProps) {
  return (
    <div className="flex items-center text-base text-ink-gray-4">
      <LoadingIndicator className="-ml-1 mr-2 h-3 w-3" /> {text}
    </div>
  );
}
