export interface CurrentStatusInterface {
  orderStatus: {
    num: number;
    cancelNum: number;
    doneNum: number;
    amount: string;
  };
  productStatus: {
    num: number;
    soldOutNum: number;
  };
}