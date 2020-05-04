import React, { Component } from "react";
import Spinner from "../util/Spinner";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import allCountries from "assets/country";
import Select from "react-select";

const countryNames = allCountries.map((country) => {
  return {
    value: country.countryName,
    label: country.countryName,
  };
});

var cityNames;

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "black",
  }),
};

class BillingForm extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!

    this.state = {
      selectedCountry: null,
      selectedCity: null,
    };

    var initialCountry;
    var initialCity;

    if (this.props.formValues && this.props.auth.billing) {
      initialCity =
        this.props.formValues.city || this.props.auth.billing.city || "";
      initialCountry =
        this.props.formValues.country || this.props.auth.billing.country || "";
    } else if (this.props.formValues) {
      initialCity = this.props.formValues.city || "";
      initialCountry = this.props.formValues.country || "";
    } else if (this.props.auth.billing) {
      initialCity = this.props.auth.billing.city || "";
      initialCountry = this.props.auth.billing.country || "";
    }

    this.state = {
      selectedCountry: {
        value: initialCountry,
        label: initialCountry,
      },
      selectedCity: {
        value: initialCity,
        label: initialCity,
      },
    };
  }

  handleCountryChange = (selectedCountry) => {
    if (selectedCountry) {
      const regions = allCountries.find(
        (element) => element.countryName === selectedCountry.value
      ).regions;

      cityNames = regions.map((region) => {
        return {
          value: region.name,
          label: region.name,
        };
      });
    }

    this.setState({ selectedCountry, selectedCity: cityNames[0] });
  };

  handleCityChange = (selectedCity) => {
    this.setState({ selectedCity });
  };

  renderBackButton() {
    if (this.props.onCancel) {
      return (
        <button
          className="btn btn-secondary"
          variant="secondary"
          onClick={this.props.onCancel}
        >
          Back
        </button>
      );
    }
  }

  onFormSubmit() {
    const { selectedCountry, selectedCity } = this.state;

    if (selectedCountry && selectedCity) {
      this.props.onFormSubmit({
        country: selectedCountry.value,
        city: selectedCity.value,
      });
    }
  }

  render() {
    if (!this.props.auth) {
      return <Spinner />;
    }

    const { selectedCountry, selectedCity } = this.state;

    return (
      <div className="container">
        <div className="row m-4">
          <Select
            styles={customStyles}
            className="col"
            name="country"
            value={selectedCountry}
            onChange={this.handleCountryChange}
            options={countryNames}
            isSearchable={true}
          />

          <Select
            isDisabled={this.state.country}
            styles={customStyles}
            className="col"
            name="city"
            value={selectedCity}
            onChange={this.handleCityChange}
            options={cityNames}
            isSearchable={true}
          />
        </div>
        <div className="row w-50 mx-auto">
          <div className="col m=4" key="buttons">
            <button
              className="btn btn-primary float-right"
              variant="primary"
              type="submit"
              onClick={this.onFormSubmit.bind(this)}
            >
              Submit
            </button>

            {this.renderBackButton()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(withRouter(BillingForm));
