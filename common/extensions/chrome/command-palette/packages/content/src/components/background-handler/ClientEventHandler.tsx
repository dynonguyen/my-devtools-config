import { Cookie, LocalStorageItem, MessageEvent } from '@dcp/shared';
import { useEffect, useState } from 'preact/hooks';
import { pushNotification } from '~/stores/notification';
import { sendMessage } from '~/utils/helper';
import Dialog from '../Dialog';
import { useActionDialog } from '../search-action/Actions';
import CookieForm, { COOKIE_FORM_ID } from '../search-action/CookieForm';
import LocalStorageForm, { LS_FORM_ID } from '../search-action/LocalStorageForm';

export const ClientEventHandler = () => {
  const [openNewCookie, setOpenNewCookie] = useState(false);
  const [openNewLS, setOpenNewLS] = useState(false);

  const handleToggleNewCookie = (open: boolean) => {
    useActionDialog.setState({ openModal: open });
    setOpenNewCookie(open);
  };

  const handleToggleNewLS = (open: boolean) => {
    useActionDialog.setState({ openModal: open });
    setOpenNewLS(open);
  };

  const handleCreateNewCookie = async (cookie: Cookie) => {
    const isSuccess = await sendMessage<boolean>(MessageEvent.SetCookie, cookie);

    if (isSuccess) {
      pushNotification({ message: 'Added', variant: 'success' });
      handleToggleNewCookie(false);
    } else {
      pushNotification({ message: 'Failed', variant: 'error' });
    }
  };

  const handleCreateNewLS = async (item: LocalStorageItem) => {
    localStorage.setItem(item.key, item.value);
    pushNotification({ message: 'Added', variant: 'success' });
    handleToggleNewLS(false);
  };

  useEffect(() => {
    const handleNewCookieEvent = () => handleToggleNewCookie(true);
    const handleNewLSEvent = () => handleToggleNewLS(true);

    window.addEventListener(MessageEvent.NewCookie, handleNewCookieEvent);
    window.addEventListener(MessageEvent.NewLocalStorageItem, handleNewLSEvent);

    return () => {
      window.removeEventListener(MessageEvent.NewCookie, handleNewCookieEvent);
      window.removeEventListener(MessageEvent.NewLocalStorageItem, handleNewLSEvent);
    };
  }, []);

  return (
    <>
      {openNewCookie && (
        <Dialog
          open
          title="New Cookie"
          width={520}
          onClose={() => handleToggleNewCookie(false)}
          body={<CookieForm onSubmit={handleCreateNewCookie} />}
          actions={
            <div class="flex items-center justify-end gap-2">
              <button class="btn btn-grey-500" onClick={() => handleToggleNewCookie(false)}>
                Close
              </button>
              <button type="submit" form={COOKIE_FORM_ID} class="btn btn-primary">
                Save
              </button>
            </div>
          }
        />
      )}

      {openNewLS && (
        <Dialog
          open
          title="New Local Storage Item"
          width={520}
          onClose={() => handleToggleNewLS(false)}
          body={<LocalStorageForm onSubmit={handleCreateNewLS} />}
          actions={
            <div class="flex items-center justify-end gap-2">
              <button class="btn btn-grey-500" onClick={() => handleToggleNewLS(false)}>
                Close
              </button>
              <button type="submit" form={LS_FORM_ID} class="btn btn-primary">
                Save
              </button>
            </div>
          }
        />
      )}
    </>
  );
};

export default ClientEventHandler;
