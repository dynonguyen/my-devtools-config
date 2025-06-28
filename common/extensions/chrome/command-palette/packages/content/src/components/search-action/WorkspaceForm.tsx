import { generateId, WorkspaceTab, WorkspaceWindow, type Workspace } from '@dcp/shared';
import clsx from 'clsx';
import { useState } from 'preact/hooks';
import { Controller, createFormControl, DefaultValues, useFieldArray, useForm } from 'react-hook-form';
import AutoFocus from '../AutoFocus';
import Flex from '../Flex';

export const WORKSPACE_FORM_ID = 'workspace-form';

const formControl = createFormControl<Workspace>({});
const requiredStringSchema = {
  validate: (value: string) => {
    return !!value?.trim();
  },
  setValueAs: (val: string) => val.trim()
};

const defaultNewFormValues: DefaultValues<Workspace> = {
  id: generateId(),
  windows: [{ isCurrent: true, tabs: [{ id: generateId(), url: '', pinned: false }], id: generateId() }]
};

type WorkspaceTabsProps = {
  index: number;
  canDeleteTab?: boolean;
  onAllTabsRemoved?(): void;
  onTabDeleted?(tabIndex: number): void;
  onTabAdded?(): void;
};

type WorkspaceFormProps = {
  initValues?: DefaultValues<Workspace>;
  onSubmit: (workspace: Workspace) => void;
};

const isDeleteTabAllowed = (windows: WorkspaceWindow[] = []) => {
  let tabCount = 0;
  for (const w of windows) {
    if (w.tabs.length) tabCount += w.tabs.length;
    if (tabCount > 1) return true;
  }
  return false;
};

const WorkspaceTabs = (props: WorkspaceTabsProps) => {
  const { index, canDeleteTab, onAllTabsRemoved, onTabDeleted, onTabAdded } = props;
  const { control, register } = useForm({ formControl });
  const tabs = useFieldArray({ control, name: `windows.${index}.tabs` });

  const handleAddTab = () => {
    tabs.append({ id: generateId(), url: '', pinned: false } as WorkspaceTab);
    onTabAdded?.();
  };

  const handleDeleteTab = (tabIndex: number) => {
    tabs.remove(tabIndex);
    if (tabs.fields.length === 1) onAllTabsRemoved?.();
  };

  const handleMoveTab = (index: number, up: boolean) => {
    const len = tabs.fields.length;
    let toIndex = 0;

    if (up) toIndex = index === 0 ? len - 1 : index - 1;
    else toIndex = index === len - 1 ? 0 : index + 1;

    tabs.move(index, toIndex);
  };

  return (
    <>
      {tabs.fields.map((tab, tabIndex) => {
        return (
          <Flex className="gap-2" key={tab.id}>
            <input
              type="text"
              className="input grow"
              placeholder="Enter URL"
              {...register(`windows.${index}.tabs.${tabIndex}.url`, requiredStringSchema)}
            />

            <Controller
              control={control}
              name={`windows.${index}.tabs.${tabIndex}.pinned`}
              render={({ field: { value: pinned, onChange } }) => (
                <Flex
                  stack
                  center
                  className={clsx('gap-0.5 cursor-pointer min-w-9 hover:text-blue-500', pinned && 'text-blue-500')}
                  onClick={() => onChange(!pinned)}
                >
                  <span className="i-fluent:pin-28-filled size-5"></span>
                  <span className="text-xs">{pinned ? 'Unpin' : 'Pin'}</span>
                </Flex>
              )}
            />

            {tabs.fields.length > 1 && (
              <Flex stack center className="gap-0.5 shrink-0">
                <Flex>
                  <span
                    className="i-material-symbols:arrow-upward-rounded size-5 cursor-pointer hover:text-primary"
                    onClick={() => handleMoveTab(tabIndex, true)}
                  ></span>
                  <span
                    className="i-material-symbols:arrow-downward-rounded size-5 cursor-pointer hover:text-primary"
                    onClick={() => handleMoveTab(tabIndex, false)}
                  ></span>
                </Flex>
                <span className="text-xs">Swap</span>
              </Flex>
            )}

            {canDeleteTab && (
              <Flex
                stack
                center
                className="gap-0.5 cursor-pointer text-red-500"
                onClick={(ev) => {
                  ev.stopPropagation();
                  handleDeleteTab(tabIndex);
                  onTabDeleted?.(tabIndex);
                }}
              >
                <span className="i-material-symbols:delete-rounded size-5"></span>
                <span className="text-xs">Delete</span>
              </Flex>
            )}
          </Flex>
        );
      })}

      <button
        className="btn btn-grey-500 bg-transparent !border !border-dashed !border-grey-500 self-start text-base-content"
        type="button"
        onClick={handleAddTab}
      >
        <span className="i-mdi:tab-plus"></span>
        Add Tab
      </button>
    </>
  );
};

export const WorkspaceForm = (props: WorkspaceFormProps) => {
  const { initValues, onSubmit } = props;
  const defaultValues = initValues ?? defaultNewFormValues;
  const { control, getValues, register, handleSubmit } = useForm<Workspace>({ formControl, defaultValues });
  const windows = useFieldArray({ control, name: 'windows' });
  const [canDeleteTab, setCanDeleteTab] = useState(isDeleteTabAllowed(defaultValues?.windows as WorkspaceWindow[]));

  const handleCheckDelete = () => {
    setCanDeleteTab(isDeleteTabAllowed(getValues('windows')));
  };

  const handleAddWindow = () => {
    windows.append({ isCurrent: false, id: generateId(), tabs: [{ id: generateId(), url: '', pinned: false }] });
    handleCheckDelete();
  };

  return (
    <Flex
      stack
      className="gap-4 max-h-120 overflow-auto"
      component="form"
      id={WORKSPACE_FORM_ID}
      onSubmit={handleSubmit(onSubmit)}
    >
      <AutoFocus>
        <input
          id="dcp-workspace-name"
          type="text"
          className="input"
          placeholder="Workspace name"
          {...register('name', requiredStringSchema)}
        />
      </AutoFocus>

      {windows.fields.map((w, index) => {
        const title = w.isCurrent ? 'Open tabs at current open window' : 'Open tabs at new window';

        return (
          <Flex key={w.id} className="border border-solid border-divider rounded-2 p-2 gap-3" stack>
            <div className="text-slate font-semibold">{title}</div>
            <WorkspaceTabs
              index={index}
              canDeleteTab={canDeleteTab}
              onTabDeleted={handleCheckDelete}
              onTabAdded={handleCheckDelete}
              onAllTabsRemoved={() => {
                !w.isCurrent && windows.remove(index);
              }}
            />
          </Flex>
        );
      })}

      <Flex className="gap-2" itemsFluid onClick={handleAddWindow}>
        <button
          className="btn btn-success bg-transparent !border !border-dashed !border-success text-base-content"
          type="button"
        >
          <span className="i-fluent:window-new-16-filled"></span>
          Add New Window
        </button>
      </Flex>
    </Flex>
  );
};

export default WorkspaceForm;
