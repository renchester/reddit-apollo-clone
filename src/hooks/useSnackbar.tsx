import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AnimatePresence } from 'framer-motion';
import Snackbar from '@/components/snackbar/Snackbar';
import type { Alert } from '@/types/types';

type ContextType = {
  addAlert: (content: Alert) => void;
};

type SnackbarProviderProps = {
  children: ReactNode;
};

const SnackbarContext = createContext<ContextType | null>(null);

export const SnackbarProvider = (props: SnackbarProviderProps) => {
  const { children } = props;
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const AUTO_DISMISS = 5000;
  const activeAlertIds = alerts.join(',');

  useEffect(() => {
    if (activeAlertIds.length > 0) {
      const snackbarTimer = setTimeout(
        () => setAlerts((alerts) => alerts.slice(0, alerts.length - 1)),
        AUTO_DISMISS,
      );
      return () => clearTimeout(snackbarTimer);
    }
  }, [activeAlertIds]);

  const addAlert = useCallback(
    (content: Alert) => setAlerts((alerts) => [content, ...alerts]),
    [],
  );

  const value = useMemo(() => ({ addAlert }), [addAlert]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {alerts.map((alert) => (
          <Snackbar key={alert.message} alert={alert} />
        ))}
      </AnimatePresence>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (context === null || context === undefined) {
    throw new Error('useSnackbar must be used within the SnackbarProvider');
  }

  return context;
};
