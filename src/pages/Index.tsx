import SkylineBackground from "@/components/SkylineBackground";
import HeroHeader from "@/components/HeroHeader";
import CharacterSwitcher from "@/components/CharacterSwitcher";
import LeonidaFeed from "@/components/LeonidaFeed";
import Minimap from "@/components/Minimap";
import StatsBar from "@/components/StatsBar";
import WantedLevel from "@/components/WantedLevel";
import QuickAccessMenu from "@/components/QuickAccessMenu";
import DataHUD from "@/components/DataHUD";
import NeonCursor from "@/components/NeonCursor";
import { MouseProvider } from "@/hooks/useMousePosition";

const Index = () => {
  return (
    <MouseProvider>
      <div className="min-h-screen relative overflow-hidden">
        <NeonCursor />
        <SkylineBackground />
        <QuickAccessMenu />

        <div className="relative z-10 min-h-screen flex flex-col">
          <HeroHeader />

          {/* Stats bar */}
          <div className="px-4 md:px-8 mt-2">
            <StatsBar />
          </div>

          {/* Main content grid */}
          <div className="flex-1 px-4 md:px-8 mt-3 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Left column */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <CharacterSwitcher />
              <WantedLevel />
            </div>

            {/* Center column */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <Minimap />
              <DataHUD />
            </div>

            {/* Right column */}
            <div className="lg:col-span-4">
              <LeonidaFeed />
            </div>
          </div>
        </div>
      </div>
    </MouseProvider>
  );
};

export default Index;
