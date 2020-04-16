import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    this.getBalance();
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const income = this.transactions.reduce((total, actual) => {
      if (actual.type === 'income') return total + actual.value;
      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, actual) => {
      if (actual.type === 'outcome') return total + actual.value;
      return total;
    }, 0);

    const balance = { income, outcome, total: income - outcome };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type });

    const balance = this.getBalance();

    if (type === 'outcome' && balance.total - value < 0) {
      throw Error('no cash available');
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
