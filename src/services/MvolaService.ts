import { MenuService } from './MenuService';
import { MVOLA_MENU, CREDIT_OPTIONS_MENU, RECHARGE_OPTIONS_MENU } from '../constants/MenuConstants';
import { terminal } from 'terminal-kit';

export class MvolaService {
  private menuService: MenuService;

  constructor(menuService: MenuService) {
    this.menuService = menuService;
  }

  public async showMvolaMenu(): Promise<void> {
    this.menuService.setCurrentMenu(MVOLA_MENU);
    await this.menuService.displayMenu();
  }

  public async showCreditOptionsMenu(): Promise<void> {
    this.menuService.setCurrentMenu(CREDIT_OPTIONS_MENU);
    await this.menuService.displayMenu();
  }

  public async showRechargeOptionsMenu(): Promise<void> {
    this.menuService.setCurrentMenu(RECHARGE_OPTIONS_MENU);
    await this.menuService.displayMenu();
  }

  public async handleDirectRecharge(): Promise<void> {
    try {
      terminal.clear();
      terminal.bold('\nEntrez le montant à recharger : ');
      const amount = await terminal.inputField().promise;

      if (!amount || isNaN(Number(amount))) {
        terminal.red('\nMontant invalide\n');
        await new Promise(resolve => setTimeout(resolve, 1500));
        await this.showRechargeOptionsMenu();
        return;
      }

      terminal.bold('\nEntrez votre mot de passe MVOLA : ');
      const password = await terminal.inputField({ echo: false }).promise;

      if (!password) {
        terminal.red('\nMot de passe invalide\n');
        await new Promise(resolve => setTimeout(resolve, 1500));
        await this.showRechargeOptionsMenu();
        return;
      }

      terminal.clear();
      terminal.green('\nRecharge effectuée avec succès!\n');
      terminal(`\nVotre compte a été rechargé de ${amount} Ar\n`);
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      await this.showMvolaMenu();
    } catch (error) {
      terminal.red('\nUne erreur est survenue\n');
      await new Promise(resolve => setTimeout(resolve, 1500));
      await this.showRechargeOptionsMenu();
    }
  }
} 