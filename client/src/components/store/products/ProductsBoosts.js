import React, { Component } from "react";
import ProductCard from "../ProductCard";
import boostExp from "assets/img/boost-exp.png";
import boostLoot from "assets/img/boost-loot.png";
import boostEnchant from "assets/img/boost-enchant.png";
import boostGather from "assets/img/boost-gather.png";

class ProductsBoosts extends Component {
  render() {
    return (
      <div>
        <div className="row card-deck">
          <ProductCard
            product={{
              productId: 21,
              credits: 50,
              name: "1x Combat-EXP Boost",
              description:
                "2x exp gained from slaying monsters for 40 minutes on the whole server.",
              image: boostExp,
            }}
            onFormSubmit={(productSelection) =>
              this.props.onFormSubmit(productSelection)
            }
          />
          <ProductCard
            product={{
              productId: 22,
              credits: 100,
              name: "2x Combat-EXP Boost",
              description:
                "2x exp gained from slaying monsters for 40 minutes on the whole server.",
              image: boostExp,
            }}
            onFormSubmit={(productSelection) =>
              this.props.onFormSubmit(productSelection)
            }
          />
          <ProductCard
            product={{
              productId: 23,
              credits: 200,
              name: "5x Combat-EXP Boost",
              description:
                "2x exp gained from slaying monsters for 40 minutes on the whole server.",
              image: boostExp,
            }}
            onFormSubmit={(productSelection) =>
              this.props.onFormSubmit(productSelection)
            }
          />
        </div>
        <div className="row card-deck">
          <ProductCard
            product={{
              productId: 24,
              credits: 50,
              name: "1x Item-Drop-Rate Boost",
              description:
                "2x chance of monsters droping item when they die for 40 minutes on the whole server.",
              image: boostLoot,
            }}
            onFormSubmit={(productSelection) =>
              this.props.onFormSubmit(productSelection)
            }
          />
          <ProductCard
            product={{
              productId: 25,
              credits: 100,
              name: "2x Item-Drop-Rate Boost",
              description:
                "2x chance of monsters droping item when they die for 40 minutes on the whole server.",
              image: boostLoot,
            }}
            onFormSubmit={(productSelection) =>
              this.props.onFormSubmit(productSelection)
            }
          />
          <ProductCard
            product={{
              productId: 26,
              credits: 200,
              name: "5x Item-Drop-Rate Boost",
              description:
                "2x chance of monsters droping item when they die for 40 minutes on the whole server.",
              image: boostLoot,
            }}
            onFormSubmit={(productSelection) =>
              this.props.onFormSubmit(productSelection)
            }
          />
        </div>
        <div className="row card-deck">
          <ProductCard
            product={{
              productId: 27,
              credits: 50,
              name: "1x Enchant-Rate Boost",
              description:
                "Increases success rate of item enchanting by 15% for 40 minutes on the whole server.",
              image: boostEnchant,
            }}
            onFormSubmit={(productSelection) =>
              this.props.onFormSubmit(productSelection)
            }
          />
          <ProductCard
            product={{
              productId: 28,
              credits: 100,
              name: "2x Enchant-Rate Boost",
              description:
                "Increases success rate of item enchanting by 15% for 40 minutes on the whole server.",
              image: boostEnchant,
            }}
            onFormSubmit={(productSelection) =>
              this.props.onFormSubmit(productSelection)
            }
          />
          <ProductCard
            product={{
              productId: 29,
              credits: 200,
              name: "5x Enchant-Rate Boost",
              description:
                "Increases success rate of item enchanting by 15% for 40 minutes on the whole server.",
              image: boostEnchant,
            }}
            onFormSubmit={(productSelection) =>
              this.props.onFormSubmit(productSelection)
            }
          />
        </div>
        <div className="row card-deck">
          <ProductCard
            product={{
              productId: 30,
              credits: 50,
              name: "1x Gathering Boost",
              description:
                "2x gathering speed for 40 minutes on the whole server.",
              image: boostGather,
            }}
            onFormSubmit={(productSelection) =>
              this.props.onFormSubmit(productSelection)
            }
          />
          <ProductCard
            product={{
              productId: 31,
              credits: 100,
              name: "2x Gathering Boost",
              description:
                "2x gathering speed for 40 minutes on the whole server.",
              image: boostGather,
            }}
            onFormSubmit={(productSelection) =>
              this.props.onFormSubmit(productSelection)
            }
          />
          <ProductCard
            product={{
              productId: 32,
              credits: 200,
              name: "5x Gathering Boost",
              description:
                "2x gathering speed for 40 minutes on the whole server.",
              image: boostGather,
            }}
            onFormSubmit={(productSelection) =>
              this.props.onFormSubmit(productSelection)
            }
          />
        </div>
      </div>
    );
  }
}

export default ProductsBoosts;
