const keys = require("../config/keys");
const { Path } = require("path-parser");
const mongoose = require("mongoose");
const authenticateAccessToken = require("../middlewares/authenticateAccessToken");
const Iyzipay = require("iyzipay");
const uuidv4 = require("uuid/v4");
const atob = require("atob");

const Order = mongoose.model("orders");
const User = mongoose.model("users");
const CreditSelection = mongoose.model("creditselection");

var iyzipay = new Iyzipay({
  apiKey: keys.iyzipayPublishableKey,
  secretKey: keys.iyzipaySecretKey,
  uri: "https://sandbox-api.iyzipay.com",
});

module.exports = (app) => {
  app.post("/api/iyzipay", authenticateAccessToken, async (req, res) => {
    const { product, buyer, paymentCard } = req.body;

    const creditSelReq = product;

    const creditSelection = await CreditSelection.findOne({
      productId: creditSelReq.productId,
    });

    if (!creditSelection) {
      return res.status(406).send({ error: "Bad request" });
    }

    if (creditSelection.price != creditSelReq.price) {
      return res.status(406).send({ error: "Bad request" });
    }

    const iyzipayRequest = iyzipayStart3D(product, buyer, paymentCard);

    iyzipay.threedsInitialize.create(iyzipayRequest, function (err, result) {
      if (!result.threeDSHtmlContent) {
        res.send(result.errorMessage);
        return;
      }

      const htmlPage = atob(result.threeDSHtmlContent);
      res.send(htmlPage);
    });
  });

  app.post("/api/iyzipay/callback/:userId", async (req, res) => {
    const body = req.body;

    const p = new Path("/api/iyzipay/callback/:userId");
    const match = p.test(req.path);
    if (!match) {
      res.send(
        '<html><body><p>Redirecting...</p><script>window.top.location.href="/addcredit/callback/error-9"</script></body></html>'
      );
      return;
    }
    const userId = match.userId;

    if (body.status != "success") {
      res.send(
        '<html><body><p>Redirecting...</p><script>window.top.location.href="/addcredit/callback/error-' +
          body.mdStatus +
          '"</script></body></html>'
      );
      return;
    }

    if (!(body.paymentId && body.conversationId)) {
      res.send(
        '<html><body><p>Redirecting...</p><script>window.top.location.href="/addcredit/callback/error-10"</script></body></html>'
      );
      return;
    }

    const iyzipayRequest = {
      locale: "tr",
      conversationId: body.conversationId,
      paymentId: body.paymentId,
      conversationData: body.conversationData,
    };

    await iyzipay.threedsPayment.create(iyzipayRequest, async function (
      err,
      result
    ) {
      if (result.conversationId != body.conversationId) {
        res.send(
          '<html><body><p>Redirecting...</p><script>window.top.location.href="/addcredit/callback/error-11"</script></body></html>'
        );
        return;
      }

      if (!(result.paymentId && result.itemTransactions && result.status)) {
        res.send(
          '<html><body><p>Redirecting...</p><script>window.top.location.href="/addcredit/callback/error-12"</script></body></html>'
        );
        return;
      }

      const products = result.itemTransactions.map(
        (product) =>
          new Object({
            productId: product.itemId,
            paymentTransactionId: product.paymentTransactionId,
          })
      );

      if (!(products && products.length)) {
        res.send(
          '<html><body><p>Redirecting...</p><script>window.top.location.href="/payment/callback/error-13"</script></body></html>'
        );
        return;
      }

      const productsString = JSON.stringify(products);

      const order = new Order({
        conversationId: result.conversationId,
        paymentId: result.paymentId,
        products: productsString,
        status: result.status,
        _user: userId,
        dateSent: Date.now(),
      });

      if (result.status != "success") {
        res.send(
          '<html><body><p>Redirecting...</p><script>window.top.location.href="/addcredit/callback/error-14"</script></body></html>'
        );
      } else {
        //successful payment
        //redirect parent page from iframe example: res.send('<html><body><p>Redirecting...</p><script>window.top.location.href="/"</script></body></html>');

        await onSuccessfulPayment(userId, products);

        res.send(
          '<html><body><p>Redirecting...</p><script>window.top.location.href="/addcredit/callback/success"</script></body></html>'
        );
      }

      //call database call after res.send so user does not wait
      await order.save();
    });
  });
};

const onSuccessfulPayment = async (userId, requestProducts) => {
  const productIds = requestProducts.map((product) => product.productId);

  const creditSelections = await CreditSelection.find({
    productId: { $in: productIds },
  });

  const credits = creditSelections.map(
    (creditSelection) => creditSelection.credits
  );

  const totalCredits = credits.reduce((a, b) => a + b, 0);

  await User.findOneAndUpdate(
    { _id: userId },
    { $inc: { credits: totalCredits } }
  );
};

const iyzipayStart3D = (product, buyer, paymentCard) => {
  paymentCard.registerCard = 0;

  const orderId = uuidv4();

  const price = String(product.price);

  return {
    locale: "TR",
    conversationId: orderId,
    price: price,
    paidPrice: price,
    currency: "USD",
    installment: 1,
    paymentChannel: "WEB",
    basketId: orderId,
    paymentGroup: "OTHER",
    callbackUrl: keys.redirectDomain + "/api/iyzipay/callback/" + buyer.id,
    paymentCard: paymentCard,
    buyer: buyer,
    billingAddress: {
      address: "Ornek Mahallesi Semarkant Sokak No:28/A Atasehir",
      contactName: "Utku Akyıldız",
      city: "Istanbul",
      country: "Turkey",
    },
    basketItems: [
      {
        id: product.productId,
        price: price,
        name: product.name,
        category1: product.category,
        itemType: "VIRTUAL",
      },
    ],
  };
};
