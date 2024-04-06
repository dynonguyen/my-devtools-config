import { getAssets } from '@dcp/shared';

export const Logo = () => {
  return (
    <div className="flex gap-2 py-4">
      <img src={getAssets('logo.svg')} width={48} height={48} />
      <h1 className="text-xl font-600">Dyno Command Palette Settings</h1>
    </div>
  );
};

export default Logo;
