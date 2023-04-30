import { Payment } from '@mui/icons-material';

class PaymentInfoRequest {
  amount:number;
  currency: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }
}

export default PaymentInfoRequest;
