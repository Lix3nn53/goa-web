import React, { Component } from "react";
import CreditSelectionCard from "./CreditSelectionCard";

class CreditSelection extends Component {
  rendercreditSelections() {
    return (
      <div className="row card-deck">
        <CreditSelectionCard
          creditSelection={{
            productId: 1,
            price: 5,
            name: "50 credits",
            description: "No bonus credits",
            category: "credit",
            icon: "https://i.ibb.co/hF9ZFm4/03-foam.png"
          }}
          onFormSubmit={creditSelection =>
            this.props.onFormSubmit(creditSelection)
          }
        />
        <CreditSelectionCard
          creditSelection={{
            productId: 2,
            price: 10,
            name: "100 credits",
            description: "+20 bonus credits",
            category: "credit",
            icon: "https://i.ibb.co/nrxZXLm/02-foam.png"
          }}
          onFormSubmit={creditSelection =>
            this.props.onFormSubmit(creditSelection)
          }
        />
        <CreditSelectionCard
          creditSelection={{
            productId: 3,
            price: 25,
            name: "250 credits",
            description: "+80 bonus credits",
            category: "credit",
            icon: "https://i.ibb.co/T85KcTd/06-foam.png"
          }}
          onFormSubmit={creditSelection =>
            this.props.onFormSubmit(creditSelection)
          }
        />
        <CreditSelectionCard
          creditSelection={{
            productId: 4,
            price: 50,
            name: "500 credits",
            description: "+200 bonus credits",
            category: "credit",
            icon: "https://i.ibb.co/XYRvncP/04-foam.png"
          }}
          onFormSubmit={creditSelection =>
            this.props.onFormSubmit(creditSelection)
          }
        />
        <CreditSelectionCard
          creditSelection={{
            productId: 5,
            price: 75,
            name: "750 credits",
            description: "+350 bonus credits",
            category: "credit",
            icon: "https://i.ibb.co/n8pL0st/08-foam.png"
          }}
          onFormSubmit={creditSelection =>
            this.props.onFormSubmit(creditSelection)
          }
        />
        <CreditSelectionCard
          creditSelection={{
            productId: 6,
            price: 100,
            name: "1000 credits",
            description: "+700 bonus credits",
            category: "credit",
            icon: "https://i.ibb.co/fFjP4QQ/10-foam.png"
          }}
          onFormSubmit={creditSelection =>
            this.props.onFormSubmit(creditSelection)
          }
        />
      </div>
    );
  }

  render() {
    return (
      <section className="py-5">
        <div className="container">{this.rendercreditSelections()}</div>
      </section>
    );
  }
}

export default CreditSelection;
