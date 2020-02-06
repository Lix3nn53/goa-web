import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";
import Pagination from "../util/Pagination";

class SurveyList extends Component {
  state = {
    allSurveysReversed: [],
    currentSurveys: [],
    currentPage: null,
    totalPages: null
  };

  async componentDidMount() {
    await this.props.fetchSurveys(); //wait for async method to complete so this.props.surveys at next lines is not null

    const allSurveysReversed = this.props.surveys.reverse(); //reverse array so it is new to old
    this.setState({ allSurveysReversed });
  }

  onPageChanged = data => {
    const { allSurveysReversed } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentSurveys = allSurveysReversed.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentSurveys, totalPages });
  };

  render() {
    const {
      allSurveysReversed,
      currentSurveys,
      currentPage,
      totalPages
    } = this.state;

    const totalSurveys = allSurveysReversed.length;

    if (totalSurveys === 0) return null;

    const headerClass = [
      "py-2 pr-4 m-0",
      currentPage ? "border-light border-right" : ""
    ]
      .join(" ")
      .trim();

    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <h2 className={headerClass}>
                <strong>{totalSurveys}</strong> Surveys
              </h2>

              {currentPage && (
                <span className="current-page d-inline-block h-100 pl-4">
                  Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                  <span className="font-weight-bold">{totalPages}</span>
                </span>
              )}
            </div>

            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination
                totalRecords={totalSurveys}
                pageLimit={3}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
            </div>
          </div>

          <div className="card-deck">
            {currentSurveys.map(survey => (
              <div
                key={survey.dateSent}
                className="card border-light mb-3"
                style={{ width: "18rem", margin: "2rem" }}
              >
                <div className="card-header">
                  <h5 className="card-title">{survey.title}</h5>
                  <small className="card-subtitle mb-2 text-muted">
                    Sent on: {new Date(survey.dateSent).toDateString()}
                  </small>
                </div>
                <div className="card-body">
                  <p className="card-text">{survey.body}</p>
                </div>
                <div className="card-footer">
                  <small className="float-left">Yes: {survey.yes}</small>
                  <small className="float-right">No: {survey.no}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
