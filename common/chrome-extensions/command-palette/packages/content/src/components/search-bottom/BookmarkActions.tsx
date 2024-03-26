import ActionMenu, { ActionMenuItem } from './ActionMenu';

export const BookmarkActions = () => {
  const items: ActionMenuItem[] = [{ icon: <span class="size-full i-ph:trash-fill" />, label: 'Delete' }];

  return <ActionMenu items={items} />;
};

export default BookmarkActions;
