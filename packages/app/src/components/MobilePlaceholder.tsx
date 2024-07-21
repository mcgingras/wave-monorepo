"use client";

import WaveIcon from "@/components/icons/Wave";
import useWindowSize from "@/hooks/useWindowSize";

const MobilePlaceholder = ({ children }: { children: React.ReactNode }) => {
  const { width } = useWindowSize();

  if (!width) return null;

  if (width && width > 1024) {
    return children;
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row">
          <WaveIcon className="h-24 w-24" />
          <WaveIcon className="h-24 w-24" />
          <WaveIcon className="h-24 w-24" />
          <WaveIcon className="h-24 w-24" />
        </div>
        <h1 className="text-6xl font-bold polymath-disp text-neutral-800">
          Wave Protocol
        </h1>
        <div className="text-sm inline-block rounded-full px-4 py-2 mt-12 bg-blue-100 text-blue-500">
          Now available on desktop
        </div>
      </div>
    </div>
  );
};

export default MobilePlaceholder;
