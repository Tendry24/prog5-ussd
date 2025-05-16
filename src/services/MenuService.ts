import { terminal } from 'terminal-kit';
import { Menu } from '../interfaces/MenuOptions';
import { MAIN_MENU } from '../constants/MenuConstants';

export class MenuService {
  private currentMenu: Menu = MAIN_MENU;
  private previousMenu: Menu | null = null;

  public setCurrentMenu(menu: Menu): void {
    this.previousMenu = this.currentMenu;
    this.currentMenu = menu;
  }

  public goToMainMenu(): void {
    this.previousMenu = null;
    this.currentMenu = MAIN_MENU;
  }

  public goToPreviousMenu(): boolean {
    if (this.previousMenu) {
      this.currentMenu = this.previousMenu;
      this.previousMenu = null;
      return true;
    }
    return false;
  }

  public async displayMenu(): Promise<void> {
    terminal.clear();
    terminal.bold(`\n${this.currentMenu.title}\n\n`);

    this.currentMenu.options.forEach(option => {
      terminal(`${option.id}. ${option.label}\n`);
    });

    await this.handleUserInput();
  }

  private async handleUserInput(): Promise<void> {
    terminal('\nChoisissez une option (0 pour quitter) : ');
    
    try {
      const inputPromise = terminal.inputField().promise;
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('TIMEOUT'));
        }, 10000);
      });

      const input = await Promise.race([inputPromise, timeoutPromise]);

      if (input === '0') {
        terminal.green('\n\nAu revoir !\n');
        process.exit(0);
      }

      if (input === '**') {
        this.goToMainMenu();
        await this.displayMenu();
        return;
      }

      if (input === '*') {
        if (this.goToPreviousMenu()) {
          await this.displayMenu();
        } else {
          terminal.red('\nPas de page précédente\n');
          await new Promise(resolve => setTimeout(resolve, 1500));
          await this.displayMenu();
        }
        return;
      }
      
      const selectedOption = this.currentMenu.options.find(
        option => option.id === input
      );

      if (selectedOption?.action) {
        await selectedOption.action();
      } else {
        terminal.red('\nOption non disponible\n');
        await new Promise(resolve => setTimeout(resolve, 1500));
        await this.displayMenu();
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'TIMEOUT') {
        terminal.red('\n\nsession expiré\n');
        process.exit(0);
      }
      throw error;
    }
  }
} 