import { FC, memo, useEffect, useRef } from "react";
import { renderGalaxy } from "@/lib/galaxy";
interface GalaxyProps {
  className?: string;
}

const Galaxy: FC<GalaxyProps> = memo(({ className }) => {
  const galaxyContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    renderGalaxy(galaxyContainerRef.current!);
  }, []);
  return <div ref={galaxyContainerRef} className={className}></div>;
});

export default Galaxy;
