import { MenuService } from './services/MenuService';
import { MvolaService } from './services/MvolaService';
import { MAIN_MENU, MVOLA_MENU, CREDIT_OPTIONS_MENU, RECHARGE_OPTIONS_MENU } from './constants/MenuConstants';
import { MenuOption } from './interfaces/MenuOptions';

async function main(): Promise<void> {
  const menuService = new MenuService();
  const mvolaService = new MvolaService(menuService);

  MAIN_MENU.options[0].action = (): Promise<void> => mvolaService.showMvolaMenu();
  MVOLA_MENU.options[0].action = (): Promise<void> => mvolaService.showCreditOptionsMenu();
  CREDIT_OPTIONS_MENU.options.forEach((option: MenuOption): void => {
    if (['1', '2', '3', '4'].includes(option.id)) {
      option.action = (): Promise<void> => mvolaService.showRechargeOptionsMenu();
    }
  });

  RECHARGE_OPTIONS_MENU.options[0].action = (): Promise<void> => mvolaService.handleDirectRecharge();

  MVOLA_MENU.options[1].action = (): Promise<void> => mvolaService.handleTransferArgent();

  await menuService.displayMenu();
}

main().catch((error: Error): void => {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});