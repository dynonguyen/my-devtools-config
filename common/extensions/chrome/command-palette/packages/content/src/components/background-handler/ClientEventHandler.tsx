import { Cookie, LocalStorageItem, MessageEvent, Workspace } from '@dcp/shared';
import { useEffect, useState } from 'preact/hooks';
import { pushNotification } from '~/stores/notification';
import { sendMessage } from '~/utils/helper';
import Dialog from '../Dialog';
import { useActionDialog } from '../search-action/Actions';
import CookieForm, { COOKIE_FORM_ID } from '../search-action/CookieForm';
import LocalStorageForm, { LS_FORM_ID } from '../search-action/LocalStorageForm';
import WorkspaceForm, { WORKSPACE_FORM_ID } from '../search-action/WorkspaceForm';

type FormType = 'cookie' | 'ls' | 'workspace';

export const ClientEventHandler = () => {
  const [openingForm, setOpenForm] = useState<FormType | null>(null);

  const handleOpenForm = (type: FormType) => {
    setOpenForm(type);
    useActionDialog.setState({ openModal: true });
  };

  const handleCloseForm = () => {
    setOpenForm(null);
    useActionDialog.setState({ openModal: false });
  };

  const handleCreateNewCookie = async (cookie: Cookie) => {
    const isSuccess = await sendMessage<boolean>(MessageEvent.SetCookie, cookie);

    if (isSuccess) {
      pushNotification({ message: 'Added', variant: 'success' });
      handleCloseForm();
    } else {
      pushNotification({ message: 'Failed', variant: 'error' });
    }
  };

  const handleCreateNewLS = async (item: LocalStorageItem) => {
    localStorage.setItem(item.key, item.value);
    pushNotification({ message: 'Added', variant: 'success' });
    handleCloseForm();
  };

  const handleCreateNewWorkspace = async (workspace: Workspace) => {
    const isSuccess = await sendMessage<boolean>(MessageEvent.CreateWorkspace, workspace);

    if (isSuccess) {
      pushNotification({ message: 'Added', variant: 'success' });
      handleCloseForm();
    } else {
      pushNotification({ message: 'Failed', variant: 'error' });
    }
  };

  useEffect(() => {
    const handleNewCookieEvent = () => handleOpenForm('cookie');
    const handleNewLSEvent = () => handleOpenForm('ls');
    const handleNewWorkspaceEvent = () => handleOpenForm('workspace');

    window.addEventListener(MessageEvent.NewCookie, handleNewCookieEvent);
    window.addEventListener(MessageEvent.NewLocalStorageItem, handleNewLSEvent);
    window.addEventListener(MessageEvent.OpenNewWorkspace, handleNewWorkspaceEvent);

    return () => {
      window.removeEventListener(MessageEvent.NewCookie, handleNewCookieEvent);
      window.removeEventListener(MessageEvent.NewLocalStorageItem, handleNewLSEvent);
      window.removeEventListener(MessageEvent.OpenNewWorkspace, handleNewWorkspaceEvent);
    };
  }, []);

  const renderNewFormCTA = (formId: string) => {
    return (
      <div class="flex items-center justify-end gap-2">
        <button class="btn btn-grey-500" onClick={handleCloseForm}>
          Close
        </button>
        <button type="submit" form={formId} class="btn btn-primary">
          Save
        </button>
      </div>
    );
  };

  return (
    <>
      {openingForm === 'cookie' && (
        <Dialog
          open
          title="New Cookie"
          width={520}
          onClose={handleCloseForm}
          body={<CookieForm onSubmit={handleCreateNewCookie} />}
          actions={renderNewFormCTA(COOKIE_FORM_ID)}
        />
      )}

      {openingForm === 'ls' && (
        <Dialog
          open
          title="New Local Storage Item"
          width={520}
          onClose={handleCloseForm}
          body={<LocalStorageForm onSubmit={handleCreateNewLS} />}
          actions={renderNewFormCTA(LS_FORM_ID)}
        />
      )}

      {openingForm === 'workspace' && (
        <Dialog
          open
          title="New Workspace"
          width={520}
          onClose={handleCloseForm}
          body={<WorkspaceForm onSubmit={handleCreateNewWorkspace} />}
          actions={renderNewFormCTA(WORKSPACE_FORM_ID)}
        />
      )}
    </>
  );
};

export default ClientEventHandler;
