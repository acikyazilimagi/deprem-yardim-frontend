export class MaintenanceError extends Error {
  name = "Bakımdayız";

  constructor(message?: string) {
    super(message);
  }
}

export class DefaultError extends Error {
  name = "Hata";

  constructor() {
    super("Teknik hatayla karşılaşıldı, lütfen tekrar deneyin.");
  }
}
