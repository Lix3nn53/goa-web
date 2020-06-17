import React, { Component } from "react";
import ProductCard from "../ProductCard";
import hero from "assets/img/hero.png";
import legend from "assets/img/legend.png";
import titan from "assets/img/titan.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

class ProductsRanks extends Component {
  render() {
    return (
      <div className="row card-deck">
        <ProductCard
          product={{
            productId: 1,
            credits: 200,
            name: "Hero Rank",
            description: (
              <ul className="list-group">
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "transparent" }}
                >
                  Chat Tag: Hero
                </li>
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "transparent" }}
                >
                  Character Slots: +2 (4 total)
                </li>
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "transparent" }}
                >
                  Notify When Login:
                  <FontAwesomeIcon className="ml-2" icon={faCheck} />
                </li>
              </ul>
            ),
            image: hero,
          }}
          onFormSubmit={(productSelection) =>
            this.props.onFormSubmit(productSelection)
          }
        />
        <ProductCard
          product={{
            productId: 2,
            credits: 400,
            name: "Legend Rank",
            description: (
              <ul className="list-group">
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "transparent" }}
                >
                  Chat Tag: Legend
                </li>
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "transparent" }}
                >
                  Character Slots: +4 (6 total)
                </li>
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "transparent" }}
                >
                  Notify When Login:
                  <FontAwesomeIcon className="ml-2" icon={faCheck} />
                </li>
              </ul>
            ),
            image: legend,
          }}
          onFormSubmit={(productSelection) =>
            this.props.onFormSubmit(productSelection)
          }
        />
        <ProductCard
          product={{
            productId: 3,
            credits: 600,
            name: "Titan Rank",
            description: (
              <ul className="list-group">
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "transparent" }}
                >
                  Chat Tag: Titan
                </li>
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "transparent" }}
                >
                  Character Slots: +6 (8 total)
                </li>
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "transparent" }}
                >
                  Notify When Login:
                  <FontAwesomeIcon className="ml-2" icon={faCheck} />
                </li>
              </ul>
            ),
            image: titan,
          }}
          onFormSubmit={(productSelection) =>
            this.props.onFormSubmit(productSelection)
          }
        />
      </div>
    );
  }
}

export default ProductsRanks;
