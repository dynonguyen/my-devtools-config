import { hasSearchKeyword, setUserOptions, Workspace } from '@dcp/shared';
import { userOptions } from './user-options';

export const createWorkspace = async (workspace: Workspace): Promise<boolean> => {
  await setUserOptions((prev) => {
    workspace.timestamp = Date.now();
    const workspaces = [...(prev.workspaces || []), workspace];
    return { workspaces };
  });

  return true;
};

export const searchWorkspace = (keyword: string) => {
  const { workspaces } = userOptions;
  return workspaces.filter((w) => hasSearchKeyword(w.name.toLowerCase(), keyword));
};

export const executeWorkspace = async (id: Workspace['id']) => {
  const workspace = userOptions.workspaces.find((w) => w.id === id);
  if (!workspace) return;

  for (const w of workspace.windows) {
    if (!w.tabs.length) continue;

    if (w.isCurrent) {
      const windowId = (await chrome.windows.getCurrent()).id;

      w.tabs.forEach((tab) => {
        chrome.tabs.create({ pinned: tab.pinned, url: tab.url, windowId });
      });

      continue;
    }

    const newWindow = await chrome.windows.create({ url: w.tabs.map((t) => t.url) });

    w.tabs.forEach((tab, index) => {
      const tabId = newWindow.tabs?.[index]?.id;
      tabId !== undefined && chrome.tabs.update(tabId, { pinned: tab.pinned });
    });
  }
};

export const updateWorkspace = async (workspace: Workspace): Promise<boolean> => {
  await setUserOptions((prev) => {
    const workspaces = prev.workspaces.map((w) => (w.id === workspace.id ? workspace : w));
    return { workspaces };
  });

  return true;
};

export const deleteWorkspace = async (id: Workspace['id']): Promise<boolean> => {
  await setUserOptions((prev) => {
    const workspaces = prev.workspaces.filter((w) => w.id !== id);
    return { workspaces };
  });

  return true;
};
