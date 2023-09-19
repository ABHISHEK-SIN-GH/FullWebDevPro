import React from 'react';
const Footer = ({currentPage,handleCounter,handlePagination}) => {
    return (
        <div>
            <nav className="mt-3 mb-4">
                <ul className="pagination flex-column position-fixed z-5" style={{right:"5px",top:"40%"}}>
                    <li className="page-item"><span className="page-link rounded rounded-3" onClick={(e)=>{handleCounter('dec')}}>&laquo;</span></li>
                    <li className="page-item"><span className="page-link rounded rounded-3" onClick={(e)=>handlePagination(currentPage+1)}>{currentPage+1}</span></li>
                    <li className="page-item"><span className="page-link rounded rounded-3" onClick={(e)=>handlePagination(currentPage+2)}>{currentPage+2}</span></li>
                    <li className="page-item"><span className="page-link rounded rounded-3" onClick={(e)=>handlePagination(currentPage+3)}>{currentPage+3}</span></li>
                    <li className="page-item"><span className="page-link rounded rounded-3" onClick={(e)=>handlePagination(currentPage+4)}>{currentPage+4}</span></li>
                    <li className="page-item"><span className="page-link rounded rounded-3" onClick={(e)=>handlePagination(currentPage+5)}>{currentPage+5}</span></li>
                    <li className="page-item"><span className="page-link rounded rounded-3" onClick={(e)=>{handleCounter('inc')}}>&raquo;</span></li>
                </ul>
            </nav>
        </div>
    );
}

export default Footer;
