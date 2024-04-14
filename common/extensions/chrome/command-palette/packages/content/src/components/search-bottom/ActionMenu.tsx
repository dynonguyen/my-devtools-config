import { ComponentChild } from 'preact';

export type ActionMenuItem = {
  label: string;
  icon: ComponentChild;
  isDanger?: boolean;
  actionFn?: () => void;
};

type ActionMenuProps = {
  items: ActionMenuItem[];
};

export const ActionMenu = (props: ActionMenuProps) => {
  const { items = [] } = props;

  return (
    <>
      {items.map((item) => (
        <div
          key={item.label}
          className="dcp-action-item flex items-center gap-2 px-4 py-2 text-base-content hover:(bg-primary/10 dark:bg-primary/5) data-[focused=true]:(!bg-primary/25 !dark:bg-primary/20)"
          {...(item.isDanger && { style: { color: 'rgb(var(--error))' } })}
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            item.actionFn?.();
          }}
        >
          <div className="size-4 shrink-0 flex-center [&>span]:size-full">{item.icon}</div>
          <div className="text-base font-500 text-sm line-clamp-1">{item.label}</div>
        </div>
      ))}
    </>
  );
};

export default ActionMenu;
