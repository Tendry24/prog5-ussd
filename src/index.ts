import { MenuService } from './services/MenuService';
import { MvolaService } from './services/MvolaService';
import { MAIN_MENU, MVOLA_MENU, CREDIT_OPTIONS_MENU, RECHARGE_OPTIONS_MENU } from './constants/MenuConstants';

async function main(): Promise<void> {
  const menuService = new MenuService();
  const mvolaService = new MvolaService(menuService);

  MAIN_MENU.options[0].action = () => mvolaService.showMvolaMenu();
  MVOLA_MENU.options[0].action = () => mvolaService.showCreditOptionsMenu();
  CREDIT_OPTIONS_MENU.options.forEach(option => {
    if (['1', '2', '3', '4'].includes(option.id)) {
      option.action = () => mvolaService.showRechargeOptionsMenu();
    }
  });

  RECHARGE_OPTIONS_MENU.options[0].action = () => mvolaService.handleDirectRecharge();

  await menuService.displayMenu();
}

main().catch((error: Error): void => {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});