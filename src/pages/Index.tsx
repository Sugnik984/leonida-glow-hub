import SkylineBackground from "@/components/SkylineBackground";
import HeroHeader from "@/components/HeroHeader";
import CharacterSwitcher from "@/components/CharacterSwitcher";
import LeonidaFeed from "@/components/LeonidaFeed";
import Minimap from "@/components/Minimap";
import StatsBar from "@/components/StatsBar";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <SkylineBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <HeroHeader />

        {/* Stats bar */}
        <div className="px-4 md:px-8 mt-4">
          <StatsBar />
        </div>

        {/* Main content grid */}
        <div className="flex-1 px-4 md:px-8 mt-4 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Character Switcher - Left */}
          <div className="lg:col-span-4 xl:col-span-3">
            <CharacterSwitcher />
          </div>

          {/* Center - Map */}
          <div className="lg:col-span-4 xl:col-span-5 flex flex-col gap-4">
            <Minimap />
          </div>

          {/* Leonida Feed - Right */}
          <div className="lg:col-span-4 xl:col-span-4">
            <LeonidaFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
