import { MenuService } from './MenuService';
import { MVOLA_MENU } from '../constants/MenuConstants';

export class MvolaService {
  public async showMvolaMenu(): Promise<void> {
    const menuService = new MenuService();
    menuService.setCurrentMenu(MVOLA_MENU);
    await menuService.displayMenu();
  }
} 