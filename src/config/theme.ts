/**
 * Light theme tokens. Structure mirrors a future dark palette (e.g. colors.dark.*).
 */
export const theme = {
  colors: {
    background: '#F4F4F5',
    surface: '#FFFFFF',
    border: '#E4E4E7',
    text: '#18181B',
    textSecondary: '#52525B',
    textMuted: '#A1A1AA',
    primary: '#2563EB',
    primaryPressed: '#1D4ED8',
    onPrimary: '#FFFFFF',
    danger: '#DC2626',
    dangerSurface: '#FEF2F2',
    success: '#16A34A',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    screenHorizontal: 16,
    sectionGap: 20,
    screenBottom: 28,
    dense: 10,
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 14,
  },
  typography: {
    title: { fontSize: 22, fontWeight: '600' as const, lineHeight: 28 },
    heading: { fontSize: 17, fontWeight: '600' as const, lineHeight: 22 },
    body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22 },
    bodySmall: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
    caption: { fontSize: 12, fontWeight: '500' as const, lineHeight: 16 },
    label: { fontSize: 13, fontWeight: '500' as const, lineHeight: 18 },
    metric: { fontSize: 20, fontWeight: '600' as const, lineHeight: 26 },
  },
} as const;

export type Theme = typeof theme;
