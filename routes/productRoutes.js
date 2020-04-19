const mongoose = require("mongoose");
const io = require("socket.io-client");
const authenticateAccessToken = require("../middlewares/authenticateAccessToken");
const requireCredits = require("../middlewares/requireCredits");
const keys = require("../config/keys");

const Product = mongoose.model("products");

module.exports = (app) => {
  app.post(
    "/api/products",
    authenticateAccessToken,
    requireCredits,
    async (req, res) => {
      const { minecraftUuid, productSelection } = req.body;

      const resultProduct = await Product.findOne({
        productId: productSelection.productId,
      });

      if (!resultProduct) {
        res.status(422).send("No such product");
        return;
      }

      if (req.user.credits < resultProduct.credits) {
        return res.status(403).send({ error: "Not enough credits!" });
      }

      const webPurchase = {
        productId: productSelection.productId,
        payment: productSelection.credits,
        minecraftUuid: minecraftUuid,
        password: keys.minecraftSocketPassword,
      };

      try {
        const mcResponse = await sendMessageToMinecraft(webPurchase);

        req.user.credits -= resultProduct.credits;
        const user = await req.user.save();

        const response = Object.assign({ user }, mcResponse);

        res.send(response);
      } catch (err) {
        console.log(err);
        if (err.errno === "ETIMEDOUT")
          res.status(599).send("Game-server is down");
        else {
          res.status(500).send(err);
        }
      }
    }
  );
};

const sendMessageToMinecraft = (webPurchase) => {
  return new Promise(function (resolve, reject) {
    const client = io.connect(keys.minecraftSocketAddress + ":9092");

    client.on("connect", function () {
      console.log("Connect");
    });

    client.on("disconnect", function () {
      console.log("Disconnect");
    });

    client.on("purchaseResult", function (data) {
      client.close(); // kill client after server's response
      if (data.success) {
        resolve(data);
      } else {
        reject(data.msg);
      }
    });

    client.emit("purchase", webPurchase);
  });
};
