export interface MenuOption {
  id: string;
  label: string;
  action?: () => Promise<void>;
}

export interface Menu {
  title: string;
  options: MenuOption[];
} 