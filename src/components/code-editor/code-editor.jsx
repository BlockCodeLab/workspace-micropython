import { useLayout } from '@blockcode/core';
import { ContextMenu } from '@blockcode/ui';
import { CodeEditor as Editor } from '@blockcode/code-editor';
import PackageList from '../package-list/package-list';
import styles from './code-editor.module.css';

export default function CodeEditor() {
  const { setSplash } = useLayout();

  const handleSetup = () => {
    setSplash(false);
  };

  return (
    <div className={styles.codeEditorWrapper}>
      <PackageList />

      <ContextMenu>
        <Editor onSetup={handleSetup} />
      </ContextMenu>
    </div>
  );
}
