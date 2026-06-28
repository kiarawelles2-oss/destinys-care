export const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `#${timestamp}${random}`;
};

export const formatCurrency = (amount: number) => {
  return `SRD ${amount.toFixed(2)}`;
};

export const calculateDeliveryFee = (isParamaribo: boolean) => {
  return isParamaribo ? 0 : 150;
};
