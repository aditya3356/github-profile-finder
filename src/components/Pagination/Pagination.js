import { ChevronLeft, ChevronRight } from "../../Icons";

const Pagination = ({ totalPages, page, pageChangeHandler }) => {
  return (
    <div className="flex justify-center mt-10">
      <ChevronLeft page={page} pageChangeHandler={pageChangeHandler} />
      {`Page ${page}`}
      <ChevronRight
        page={page}
        totalPages={totalPages}
        pageChangeHandler={pageChangeHandler}
      />
    </div>
  );
};

export default Pagination;
