import { MenuService } from './MenuService';
import { MVOLA_MENU, CREDIT_OPTIONS_MENU, RECHARGE_OPTIONS_MENU } from '../constants/MenuConstants';
import { terminal } from 'terminal-kit';
import { MvolaTransaction } from '../interfaces/Transaction';

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
    } catch {
      terminal.red('\nUne erreur est survenue\n');
      await new Promise(resolve => setTimeout(resolve, 1500));
      await this.showRechargeOptionsMenu();
    }
  }

  private generateReference(): string {
    return `MVL${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }

  private async collectTransactionData(): Promise<MvolaTransaction | null> {
    try {
      terminal.clear();
      terminal.bold('\nEntrez le numéro du destinataire : ');
      const numero = await terminal.inputField().promise;

      if (!numero || !/^03[2-4|8]\d{7}$/.test(numero)) {
        terminal.red('\nNuméro invalide. Format: 03X XX XXX XX\n');
        await new Promise(resolve => setTimeout(resolve, 1500));
        return null;
      }

      terminal.bold('\nEntrez le montant à transférer : ');
      const montantStr = await terminal.inputField().promise;
      const montant = Number(montantStr);

      if (isNaN(montant) || montant <= 0) {
        terminal.red('\nMontant invalide\n');
        await new Promise(resolve => setTimeout(resolve, 1500));
        return null;
      }

      terminal.bold('\nEntrez la raison du transfert (12 caractères max) : ');
      const raisonInput = await terminal.inputField().promise;
      const raison = (raisonInput || '').slice(0, 12);

      terminal.bold('\nPrise en charge des frais de retrait ?\n');
      terminal('1. Oui\n');
      terminal('2. Non\n');
      const fraisChoice = await terminal.inputField().promise;
      const fraisRetrait = fraisChoice === '1';

      return {
        destinataire: numero,
        montant,
        raison,
        fraisRetrait,
        reference: this.generateReference()
      };
    } catch {
      return null;
    }
  }

  public async handleTransferArgent(): Promise<void> {
    try {
      const transaction = await this.collectTransactionData();
      
      if (!transaction) {
        await this.showMvolaMenu();
        return;
      }

      terminal.clear();
      terminal.bold('\nRécapitulatif de la transaction :\n');
      terminal(`\nDestinataire : ${transaction.destinataire}`);
      terminal(`\nMontant : ${transaction.montant} Ar`);
      terminal(`\nRaison : ${transaction.raison}`);
      terminal(`\nFrais de retrait : ${transaction.fraisRetrait ? 'Pris en charge' : 'Non pris en charge'}`);
      terminal(`\nRéférence : ${transaction.reference}\n`);

      terminal.bold('\nConfirmer la transaction avec votre code secret : ');
      const codeSecret = await terminal.inputField({ echo: false }).promise;

      if (!codeSecret) {
        terminal.red('\nCode secret invalide\n');
        await new Promise(resolve => setTimeout(resolve, 1500));
        await this.showMvolaMenu();
        return;
      }

      terminal.bold('\nTraitement en cours...\n');
      await new Promise(resolve => setTimeout(resolve, 2000));

      terminal.clear();
      terminal.green('\nTransfert effectué avec succès!\n');
      terminal(`\nRéférence de la transaction : ${transaction.reference}`);
      terminal(`\nMontant transféré : ${transaction.montant} Ar`);
      terminal(`\nVers le numéro : ${transaction.destinataire}\n`);
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      await this.showMvolaMenu();

    } catch {
      terminal.red('\nUne erreur est survenue lors de la transaction\n');
      await new Promise(resolve => setTimeout(resolve, 1500));
      await this.showMvolaMenu();
    }
  }
} 