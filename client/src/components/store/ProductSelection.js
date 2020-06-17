import React, { Component } from "react";
import ProductsRanks from "./products/ProductsRanks";
import ProductsSkins from "./products/ProductsSkins";
import ProductsChests from "./products/ProductsChests";
import ProductsBoosts from "./products/ProductsBoosts";

class ProductSelection extends Component {
  render() {
    return (
      <section className="container py-5">
        <ul class="nav nav-pills mb-3" id="pills-tab-shop" role="tablist">
          <li class="nav-item mx-auto">
            <a
              class="nav-link active"
              id="pills-ranks-tab"
              data-toggle="pill"
              href="#pills-ranks"
              role="tab"
              aria-controls="pills-ranks"
              aria-selected="true"
            >
              Ranks
            </a>
          </li>
          <li class="nav-item mx-auto">
            <a
              class="nav-link"
              id="pills-skins-tab"
              data-toggle="pill"
              href="#pills-skins"
              role="tab"
              aria-controls="pills-skins"
              aria-selected="false"
            >
              Skins
            </a>
          </li>
          <li class="nav-item mx-auto">
            <a
              class="nav-link"
              id="pills-chests-tab"
              data-toggle="pill"
              href="#pills-chests"
              role="tab"
              aria-controls="pills-chests"
              aria-selected="false"
            >
              Chests
            </a>
          </li>
          <li class="nav-item mx-auto">
            <a
              class="nav-link"
              id="pills-boosts-tab"
              data-toggle="pill"
              href="#pills-boosts"
              role="tab"
              aria-controls="pills-boosts"
              aria-selected="false"
            >
              Boosts
            </a>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-ranks"
            role="tabpanel"
            aria-labelledby="pills-ranks-tab"
          >
            <ProductsRanks
              onFormSubmit={(productSelection) =>
                this.props.onFormSubmit(productSelection)
              }
            />
          </div>
          <div
            class="tab-pane fade"
            id="pills-skins"
            role="tabpanel"
            aria-labelledby="pills-skins-tab"
          >
            <ProductsSkins
              onFormSubmit={(productSelection) =>
                this.props.onFormSubmit(productSelection)
              }
            />
          </div>
          <div
            class="tab-pane fade"
            id="pills-chests"
            role="tabpanel"
            aria-labelledby="pills-chests-tab"
          >
            <ProductsChests
              onFormSubmit={(productSelection) =>
                this.props.onFormSubmit(productSelection)
              }
            />
          </div>
          <div
            class="tab-pane fade"
            id="pills-boosts"
            role="tabpanel"
            aria-labelledby="pills-boosts-tab"
          >
            <ProductsBoosts
              onFormSubmit={(productSelection) =>
                this.props.onFormSubmit(productSelection)
              }
            />
          </div>
        </div>
      </section>
    );
  }
}

export default ProductSelection;
