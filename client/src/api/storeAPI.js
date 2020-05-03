import tokenService from "./tokenService";

const startIyzipay3D = async (buyer, paymentCard, product) => {
  try {
    const token = {
      buyer,
      paymentCard,
      product,
    };

    const res = await tokenService.requestWithAccessToken(
      "/api/iyzipay",
      "post",
      token
    );

    return res.data; //iyzipay html
  } catch (error) {
    return false;
  }
};

const buyer = (
  id,
  username,
  identityNumber,
  email,
  registrationAddress,
  city,
  country,
  name,
  surname
) => {
  return {
    id,
    username,
    identityNumber,
    email,
    registrationAddress,
    city,
    country,
    name,
    surname,
  };
};

const paymentCard = (
  cardHolderName,
  cardNumber,
  cvc,
  expireMonth,
  expireYear,
  registerCard
) => {
  return {
    cardHolderName,
    cardNumber,
    cvc,
    expireMonth,
    expireYear,
    registerCard,
  };
};

const product = (category, description, icon, name, price, productId) => {
  return {
    category,
    description,
    icon,
    name,
    price,
    productId,
  };
};

export default { startIyzipay3D, buyer, paymentCard, product };
