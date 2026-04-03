import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import { type ScreenShellProps, ScreenShell } from '@/shared/components/ui/screen-shell';

export type ScreenProps = Omit<ScreenShellProps, 'contentStyle'> & {
  contentStyle?: StyleProp<ViewStyle>;
  padded?: boolean;
  children: ReactNode;
};

export function Screen({
  children,
  padded = true,
  contentStyle,
  ...shellRest
}: ScreenProps) {
  return (
    <ScreenShell
      {...shellRest}
      contentStyle={[padded === false ? { paddingHorizontal: 0 } : null, contentStyle]}
    >
      {children}
    </ScreenShell>
  );
}
