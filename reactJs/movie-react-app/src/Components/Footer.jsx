import React from 'react';
const Footer = ({currentPage,handleCounter,handlePagination}) => {
    return (
        <div>
            <nav className="mt-3 mb-4 d-flex justify-content-center">
                <ul className="pagination">
                    <li className="page-item">
                    <span className="page-link" aria-label="Previous" onClick={()=>{handleCounter('dec')}}>
                        <span aria-hidden="true">&laquo;</span>
                    </span>
                    </li>
                    <li className="page-item"><span className="page-link" onClick={(e)=>handlePagination(currentPage+1,e)}>{currentPage+1}</span></li>
                    <li className="page-item"><span className="page-link" onClick={(e)=>handlePagination(currentPage+2,e)}>{currentPage+2}</span></li>
                    <li className="page-item"><span className="page-link" onClick={(e)=>handlePagination(currentPage+3,e)}>{currentPage+3}</span></li>
                    <li className="page-item"><span className="page-link" onClick={(e)=>handlePagination(currentPage+4,e)}>{currentPage+4}</span></li>
                    <li className="page-item"><span className="page-link" onClick={(e)=>handlePagination(currentPage+5,e)}>{currentPage+5}</span></li>
                    <li className="page-item"><span className="page-link" onClick={(e)=>handlePagination(currentPage+6,e)}>{currentPage+6}</span></li>
                    <li className="page-item"><span className="page-link" onClick={(e)=>handlePagination(currentPage+7,e)}>{currentPage+7}</span></li>
                    <li className="page-item"><span className="page-link" onClick={(e)=>handlePagination(currentPage+8,e)}>{currentPage+8}</span></li>
                    <li className="page-item"><span className="page-link" onClick={(e)=>handlePagination(currentPage+9,e)}>{currentPage+9}</span></li>
                    <li className="page-item"><span className="page-link" onClick={(e)=>handlePagination(currentPage+10,e)}>{currentPage+10}</span></li>
                    <li className="page-item">
                    <span className="page-link" aria-label="Next" onClick={()=>{handleCounter('inc')}}>
                        <span aria-hidden="true">&raquo;</span>
                    </span>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Footer;
