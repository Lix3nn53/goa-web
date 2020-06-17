import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

function Pagination(props) {
  const {
    totalRecords,
    totalPages,
    currentPage,
    pageNeighbours,
    onPageChanged,
  } = props;

  const gotoPage = (page) => {
    onPageChanged(page);
  };

  const handleClick = (page) => (evt) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage - 1);
  };

  const handleMoveRight = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage + 1);
  };

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  const fetchPageNumbers = () => {
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);
      console.log("pages");
      console.log(pages);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  console.log("totalRecords");
  console.log(totalRecords);
  console.log("totalPages");
  console.log(totalPages);
  if (!totalRecords || totalPages === 1) return <div></div>;

  console.log("currentPage");
  console.log(currentPage);
  const pages = fetchPageNumbers();
  console.log("pages");
  console.log(pages);

  return (
    <div>
      <nav aria-label="Pagination">
        <ul className="pagination">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <li key={index} className="page-item disabled">
                  <Link
                    className="page-link"
                    to="#"
                    aria-label="Previous"
                    onClick={handleMoveLeft}
                  >
                    ...
                  </Link>
                </li>
              );

            if (page === RIGHT_PAGE)
              return (
                <li key={index} className="page-item disabled">
                  <Link
                    className="page-link"
                    to="#"
                    aria-label="Next"
                    onClick={handleMoveRight}
                  >
                    ...
                  </Link>
                </li>
              );

            return (
              <li
                key={index}
                className={`page-item${currentPage === page ? " active" : ""}`}
              >
                <Link className="page-link" to="#" onClick={handleClick(page)}>
                  {page}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageNeighbours: PropTypes.number.isRequired, // pageNeighbours can be: 0, 1 or 2
  onPageChanged: PropTypes.func,
};
