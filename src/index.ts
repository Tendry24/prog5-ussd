import { MenuService } from './services/MenuService';

async function main() {
  const menuService = new MenuService();
  await menuService.displayMenu();
}

main().catch(console.error);