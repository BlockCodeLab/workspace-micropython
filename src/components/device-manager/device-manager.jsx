import { useLocale, useEditor } from '@blockcode/core';
import { MicroPythonBoard } from '@blockcode/device-pyboard';

import filters from './filters.yaml';

import styles from './device-manager.module.css';
import iconNotReady from './status-not-ready.svg';
import iconReady from './status-ready.svg';

export default function DeviceManager() {
  const { getText } = useLocale();
  const { device, setDevice } = useEditor();

  const deviceMessage = device
    ? getText('micropython.deviceManager.ready', 'Ready')
    : getText('micropython.deviceManager.notReady', 'Not Ready');

  const handleConnect = async () => {
    if (device) {
      try {
        await device.disconnect();
      } catch (err) {
        console.error(err);
      }
      setDevice(null);
    } else {
      const board = new MicroPythonBoard();
      try {
        await board.requestPort(filters);
        await board.connect();
        await board.stop();
        setDevice(board);
      } catch (err) {
        console.error(err);
      }

      // Check if the board is connected
      const checkBoard = () =>
        setTimeout(async () => {
          if (board.connected) {
            checkBoard();
          } else {
            setDevice(null);
          }
        }, 1000);
      checkBoard();
    }
  };

  return (
    <img
      className={styles.statusIcon}
      src={device ? iconReady : iconNotReady}
      title={deviceMessage}
      onClick={handleConnect}
    />
  );
}
