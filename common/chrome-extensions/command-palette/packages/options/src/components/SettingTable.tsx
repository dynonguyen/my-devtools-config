export const SettingTable = () => {
  return (
    <div className="p-4 bg-gray-700 rounded-2xl">
      <div className="flex gap-2 text-xs font-medium flex-nowrap text-slate-200">
        <span className="py-1 border-solid border-r-1 grow border-divider">Name</span>
        <span className="w-[20%] py-1 border-r-1 border-solid border-divider">Type</span>
        <span className="w-[15%] py-1 border-r-1 border-solid border-divider">Alias</span>
        <span className="w-[15%] py-1 border-r-1 border-solid border-divider">Hotkey</span>
        <span className="w-[15%] py-1 ">Enabled</span>
      </div>

      <div className="w-full h-[1px] my-2 bg-divider"></div>
    </div>
  );
};

export default SettingTable;
