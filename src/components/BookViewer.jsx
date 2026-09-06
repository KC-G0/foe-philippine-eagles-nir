// src/components/BookViewer.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PDF_FILES = [
  { file: '/pdfs/1-50.pdf', startPage: 1 },
  { file: '/pdfs/51 - 100.pdf', startPage: 51 },
  { file: '/pdfs/101-150.pdf', startPage: 101 },
  { file: '/pdfs/151-200.pdf', startPage: 151 },
  { file: '/pdfs/201-250.pdf', startPage: 201 },
  { file: '/pdfs/251 - 300 - Cover Page.pdf', startPage: 251 },
  { file: '/pdfs/Cover Page - Appendices.pdf', startPage: 301 },
];

// Virtual window: only render pages within this range of visible pages
const VIRTUAL_WINDOW = 5;
const PAGE_GAP = 16; // px gap between pages

export default function BookViewer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfDocuments, setPdfDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jumpInput, setJumpInput] = useState('');
  const [visiblePages, setVisiblePages] = useState(new Set());
  const [searchParams] = useSearchParams();
  
  const scrollContainerRef = useRef(null);
  const pageRefs = useRef({});
  const canvasRefs = useRef({});
  const scrollTimeoutRef = useRef(null);
  const pageHeightsRef = useRef({});

  // Load all PDF documents on mount
  useEffect(() => {
    const loadPdfs = async () => {
      try {
        const docs = [];
        let pageCount = 0;

        for (const pdfFile of PDF_FILES) {
          const loadingTask = pdfjsLib.getDocument({
            url: pdfFile.file,
            useWorkerFetch: false,
            isEvalSupported: false,
            useSystemFonts: true,
          });
          const pdf = await loadingTask.promise;
          docs.push({ pdf, startPage: pdfFile.startPage, numPages: pdf.numPages });
          pageCount += pdf.numPages;
        }

        setPdfDocuments(docs);
        setTotalPages(pageCount);
        setLoading(false);
      } catch (err) {
        console.error('Error loading PDFs:', err);
        setError('Failed to load constitution document');
        setLoading(false);
      }
    };

    loadPdfs();
  }, []);

  // Get the PDF document and local page number for a given global page
  const getPdfForPage = useCallback((globalPage) => {
    for (const doc of pdfDocuments) {
      if (globalPage >= doc.startPage && globalPage < doc.startPage + doc.numPages) {
        return {
          pdf: doc.pdf,
          localPage: globalPage - doc.startPage + 1,
        };
      }
    }
    return null;
  }, [pdfDocuments]);

  // Render a specific page to a canvas
  const renderPageToCanvas = useCallback(async (pageNum) => {
    const canvas = canvasRefs.current[pageNum];
    if (!canvas || pdfDocuments.length === 0) return;

    const pdfInfo = getPdfForPage(pageNum);
    if (!pdfInfo) return;

    try {
      const page = await pdfInfo.pdf.getPage(pdfInfo.localPage);
      const viewport = page.getViewport({ scale: 1.5 });
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: canvas.getContext('2d'),
        viewport: viewport,
      }).promise;

      // Store page height for virtual scrolling
      pageHeightsRef.current[pageNum] = viewport.height;
    } catch (err) {
      if (err.name !== 'RenderingCancelledException') {
        console.error('Error rendering page:', err);
      }
    }
  }, [pdfDocuments, getPdfForPage]);

  // Update visible pages based on scroll position
  const updateVisiblePages = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;

    // Calculate which pages are visible based on accumulated heights
    let accumulatedHeight = 0;
    const newVisible = new Set();

    for (let i = 1; i <= totalPages; i++) {
      const pageHeight = pageHeightsRef.current[i] || 600; // default estimate
      const pageTop = accumulatedHeight;
      const pageBottom = accumulatedHeight + pageHeight;

      // Check if page is within viewport (with buffer)
      const buffer = containerHeight * 2;
      if (pageBottom >= scrollTop - buffer && pageTop <= scrollTop + containerHeight + buffer) {
        newVisible.add(i);
      }

      accumulatedHeight += pageHeight + PAGE_GAP;
    }

    setVisiblePages(newVisible);
  }, [totalPages]);

  // Render pages when visible pages change
  useEffect(() => {
    if (loading) return;
    
    visiblePages.forEach(pageNum => {
      if (!pageRefs.current[pageNum]) {
        // Mark as rendered
        pageRefs.current[pageNum] = true;
        // Render the canvas
        setTimeout(() => renderPageToCanvas(pageNum), 0);
      }
    });
  }, [visiblePages, loading, renderPageToCanvas]);

  // Calculate total scroll height based on page heights
  const getTotalHeight = useCallback(() => {
    let total = 0;
    for (let i = 1; i <= totalPages; i++) {
      total += (pageHeightsRef.current[i] || 600) + PAGE_GAP;
    }
    return total;
  }, [totalPages]);

  // Calculate offset for a specific page
  const getPageOffset = useCallback((pageNum) => {
    let offset = 0;
    for (let i = 1; i < pageNum; i++) {
      offset += (pageHeightsRef.current[i] || 600) + PAGE_GAP;
    }
    return offset;
  }, [totalPages]);

  // Jump to a specific page — INSTANT, no animation
  const jumpToPage = useCallback((page) => {
    const num = parseInt(page);
    if (isNaN(num) || num < 1 || num > totalPages) return;
    
    const pageOffset = getPageOffset(num);
    const container = scrollContainerRef.current;
    
    if (container) {
      // INSTANT jump — no smooth scroll
      container.scrollTo({
        top: pageOffset,
        behavior: 'auto'  // 'auto' = instant jump, no animation
      });
      setCurrentPage(num);
      setJumpInput('');
    }
  }, [totalPages, getPageOffset]);

  // Handle scroll to update current page
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || loading) return;

    const handleScroll = () => {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        const containerRect = container.getBoundingClientRect();
        const scrollTop = container.scrollTop;
        
        // Find which page is at the top of the viewport
        let accumulatedHeight = 0;
        let currentPageNum = 1;

        for (let i = 1; i <= totalPages; i++) {
          const pageHeight = pageHeightsRef.current[i] || 600;
          if (accumulatedHeight + pageHeight > scrollTop) {
            currentPageNum = i;
            break;
          }
          accumulatedHeight += pageHeight + PAGE_GAP;
        }

        setCurrentPage(currentPageNum);
        updateVisiblePages();
      }, 50);
    };

    container.addEventListener('scroll', handleScroll);
    updateVisiblePages(); // Initial calculation
    return () => container.removeEventListener('scroll', handleScroll);
  }, [loading, totalPages, updateVisiblePages]);

  // Jump to page from URL query param when documents are loaded
  useEffect(() => {
    if (!loading && totalPages > 0) {
      const pageParam = searchParams.get('page');
      if (pageParam) {
        const pageNum = parseInt(pageParam);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
          setCurrentPage(pageNum);
          // Jump to page instantly after a short delay to allow rendering
          setTimeout(() => {
            jumpToPage(pageNum);
          }, 50);
        }
      }
    }
  }, [loading, totalPages, searchParams, jumpToPage]);

  // Handle jump input
  const handleJumpSubmit = (e) => {
    e.preventDefault();
    jumpToPage(jumpInput);
  };

  const handleJumpInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setJumpInput(value);
    }
  };

  // Previous/Next
  const goToPrevPage = () => {
    if (currentPage > 1) {
      jumpToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      jumpToPage(currentPage + 1);
    }
  };

  // Render placeholder or actual page
  const renderPage = (pageNum) => {
    const isVisible = visiblePages.has(pageNum);
    const height = pageHeightsRef.current[pageNum];

    return (
      <div
        key={pageNum}
        className="relative"
        style={{
          height: height ? `${height}px` : '600px',
          marginBottom: `${PAGE_GAP}px`,
        }}
      >
        {isVisible ? (
          <>
            <canvas
              ref={el => {
                if (el && !pageRefs.current[pageNum]) {
                  pageRefs.current[pageNum] = true;
                  canvasRefs.current[pageNum] = el;
                  renderPageToCanvas(pageNum);
                }
              }}
              className="bg-white shadow-lg rounded mx-auto block"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              p. {pageNum}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-700 rounded">
            <span className="text-white/40 text-sm">Page {pageNum}</span>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4"></div>
          <p className="text-white/60">Loading constitution document...</p>
        </div>
      </div>
    );
  }

  if (error && !pdfDocuments.length) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center text-red-400">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Navigation Header */}
      <div className="sticky top-0 z-10 bg-navy-600/95 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Page Indicator */}
          <div className="text-white font-medium">
            Page {currentPage} of {totalPages}
          </div>

          {/* Previous/Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage <= 1}
              className="px-3 py-1.5 rounded bg-white/10 text-white text-sm disabled:opacity-30 hover:bg-white/20 transition-colors"
            >
              ← Prev
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
              className="px-3 py-1.5 rounded bg-white/10 text-white text-sm disabled:opacity-30 hover:bg-white/20 transition-colors"
            >
              Next →
            </button>
          </div>

          {/* Jump to Page Input */}
          <form onSubmit={handleJumpSubmit} className="flex items-center gap-2">
            <span className="text-white/50 text-sm">Go to:</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={jumpInput}
              onChange={handleJumpInputChange}
              onKeyDown={(e) => { if (e.key === 'Enter') jumpToPage(jumpInput); }}
              placeholder="Page #"
              className="w-20 px-2 py-1.5 rounded bg-white/10 border border-white/20 text-white text-sm text-center focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-gold-500 text-navy-500 text-sm font-medium hover:bg-gold-400 transition-colors"
            >
              Go
            </button>
          </form>
        </div>
      </div>

      {/* Scrollable Page Container */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto bg-gray-800"
        style={{ maxHeight: '70vh' }}
      >
        <div className="flex flex-col items-center p-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => renderPage(pageNum))}
        </div>
      </div>

      {/* Quick Navigation Footer */}
      <div className="sticky bottom-0 z-10 bg-navy-600/95 backdrop-blur-sm border-t border-white/10 p-4">
        <div className="flex flex-wrap items-center gap-2 justify-center">
          {/* First page */}
          <button
            onClick={() => jumpToPage(1)}
            className={`w-9 h-9 rounded text-xs font-medium transition-colors ${
              currentPage === 1
                ? 'bg-gold-500 text-navy-500'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            1
          </button>
          
          {/* Show pages around current page */}
          {Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
            const start = Math.max(2, Math.min(currentPage - 4, totalPages - 9));
            const page = start + i;
            if (page <= 1 || page >= totalPages) return null;
            
            return (
              <button
                key={page}
                onClick={() => jumpToPage(page)}
                className={`w-9 h-9 rounded text-xs font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-gold-500 text-navy-500'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {page}
              </button>
            );
          })}
          
          {/* Last page */}
          {totalPages > 1 && (
            <button
              onClick={() => jumpToPage(totalPages)}
              className={`w-9 h-9 rounded text-xs font-medium transition-colors ${
                currentPage === totalPages
                  ? 'bg-gold-500 text-navy-500'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {totalPages}
            </button>
          )}
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="p-4 text-red-400 text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
}
