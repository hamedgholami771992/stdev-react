import React from 'react';
import styles from './newPagination.module.scss';
import { Images } from '../../assets/images';

type PaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    const getPages = () => {
        const visiblePages = new Set<number>();

        // 1. Add current, previous, and next pages (if within bounds)
        if (currentPage > 1) visiblePages.add(currentPage - 1);
        visiblePages.add(currentPage);
        if (currentPage < totalPages) visiblePages.add(currentPage + 1);

        // 2. Add first 2 pages if not already in visiblePages
        visiblePages.add(1);
        visiblePages.add(2);

        // 3. Add last 2 pages if not already in visiblePages
        visiblePages.add(totalPages);
        if (totalPages > 1) visiblePages.add(totalPages - 1);

        // 5. Count the number of pages
        if (visiblePages.size < 7) {
            const middlePage = Math.floor(totalPages / 2);

            // 7. Add middle page if it doesn’t exist
            visiblePages.add(middlePage);

            // 8. Add the middlePage+1 or middlePage-1 based on the number of pages in the first and last half
            if (visiblePages.size < 7) {
                const lowerHalfCount = Array.from(visiblePages).filter(page => page < middlePage).length;
                const upperHalfCount = Array.from(visiblePages).filter(page => page > middlePage).length;

                if (upperHalfCount > lowerHalfCount) {
                    // Add middlePage + 1
                    if (middlePage + 1 < totalPages) {
                        visiblePages.add(middlePage + 1);
                    }
                }

                // 13. If still less than 7, add middlePage - 1
                if (visiblePages.size < 7 && middlePage - 1 > 0) {
                    visiblePages.add(middlePage - 1);
                }
            }
        }

        // 8. Sort the pages
        const sortedPages = Array.from(visiblePages).sort((a, b) => a - b);

        // 9. Handle ellipsis (...) for missing ranges
        const finalPages: Array<number | string> = [];
        for (let i = 0; i < sortedPages.length; i++) {
            finalPages.push(sortedPages[i]);

            // If there's a gap between two pages, add an ellipsis
            if (i < sortedPages.length - 1 && sortedPages[i + 1] - sortedPages[i] > 1) {
                finalPages.push('...');
            }
        }

        return finalPages;
    };

    const pages = getPages();

    return (
        <div className={styles.pagination}>
            <button
                  className={`${styles.arrow} ${styles.left}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <img src={Images.LeftArrow} />
            </button>

            {pages.map((page, index) =>
                typeof page === 'number' ? (
                    <button
                        key={index}
                        onClick={() => onPageChange(page)}
                        className={page === currentPage ? styles.active : ''}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className={styles.dots}>
                        {page}
                    </span>
                )
            )}

            <button
                className={`${styles.arrow} ${styles.right}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {/* &gt; */}
                <img src={Images.LeftArrow} />
            </button>
        </div>
    );
};

export default Pagination;
