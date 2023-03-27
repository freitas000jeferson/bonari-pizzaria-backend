export const DELIVERY_FEE = {
  ARACATI: 3,
  PEDREGAL: 6,
  MONALISA: 7,
  RETIRADA: 0,
};
export const PAYMENT_RATE = {
  CREDITO: 4.99,
  DEBITO: 0,
  DINHEIRO: 0,
  PIX: 0,
};

export enum PaymentRateType {
  CREDITO = 'CREDITO',
  DEBITO = 'DEBITO',
  DINHEIRO = 'DINHEIRO',
  PIX = 'PIX',
}
// value+(value*CREDITO/100)
