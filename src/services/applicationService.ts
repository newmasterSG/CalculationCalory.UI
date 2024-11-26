import ThemeService from "./themeService";

export default class ApplicationService {
  private themeService: ThemeService = new ThemeService();

  getTheme() {
    return this.themeService.getTheme();
  }

  setTheme(theme: string) {
    this.themeService.setTheme(theme);
  }
}
