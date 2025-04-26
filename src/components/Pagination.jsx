import './css/Pagination.css';

function Pagination({ handlePrev, handleNext, offset }) {
    return (
        <div className="pagination">
            <button onClick={handlePrev} disabled={offset === 0}>Forrige</button>
            <button onClick={handleNext}>Næste</button>
        </div>
    );
}

export default Pagination;
