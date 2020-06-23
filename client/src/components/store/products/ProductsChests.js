import React, { Component } from "react";
import ProductCard from "../ProductCard";
import chestGold from "assets/img/chest-gold.png";

class ProductsChests extends Component {
  render() {
    return (
      <div className="row card-deck">
        <ProductCard
          product={{
            productId: 18,
            credits: 100,
            name: "1x Skin Chest",
            description:
              "Skin Chests are chests you can open in game for a chance to get a random cosmetic object!",
            image: chestGold,
          }}
          onFormSubmit={(productSelection) =>
            this.props.onFormSubmit(productSelection)
          }
        />
        <ProductCard
          product={{
            productId: 19,
            credits: 200,
            name: "2x Skin Chest",
            description:
              "Skin Chests are chests you can open in game for a chance to get a random cosmetic object!",
            image: chestGold,
          }}
          onFormSubmit={(productSelection) =>
            this.props.onFormSubmit(productSelection)
          }
        />
        <ProductCard
          product={{
            productId: 20,
            credits: 400,
            name: "5x Skin Chest",
            description:
              "Skin Chests are chests you can open in game for a chance to get a random cosmetic object!",
            image: chestGold,
          }}
          onFormSubmit={(productSelection) =>
            this.props.onFormSubmit(productSelection)
          }
        />
      </div>
    );
  }
}

export default ProductsChests;
