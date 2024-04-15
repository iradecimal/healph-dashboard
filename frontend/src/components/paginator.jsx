import { Pagination } from "react-bootstrap";
import PropTypes from "prop-types";

const Paginator = ({currentPage, pageCount, onPageChange}) => {
    return(
        <>
            <Pagination>
                <Pagination.First
                    onClick={() => onPageChange(1)}
                    disabled = {currentPage === 1}
                />
                <Pagination.Prev
                    onClick={() => onPageChange(currentPage-1)}
                    disabled = {currentPage === 1}
                />
                <Pagination.Item>
                    {currentPage}
                </Pagination.Item>
                <Pagination.Next
                    onClick={() => onPageChange(currentPage+1)}
                    disabled = {currentPage === pageCount}
                />
            </Pagination>
        </>
    )
}

Paginator.propTypes = {
    currentPage : PropTypes.number,
    pageCount : PropTypes.number,
    onPageChange : PropTypes.func
}

export default Paginator;