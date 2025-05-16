import { MenuService } from './services/MenuService';

async function main(): Promise<void> {
  const menuService = new MenuService();
  await menuService.displayMenu();
}

main().catch((error: Error): void => {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});