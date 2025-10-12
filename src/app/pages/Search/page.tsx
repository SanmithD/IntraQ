"use client";

import { UseSearchStore } from "@/app/store/UseSearchStore";
import { ChevronDown, Clock, Loader2, Search as SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";

const History = lazy(() => import('../../../components/History'));

function Search() {

  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const isSearchLoading = UseSearchStore((state) => state.isSearchLoading);
  const search = UseSearchStore((state) => state.search);
  const searchResult = UseSearchStore((state) => state.searchResult);
  const saveHistory = UseSearchStore((state) => state.saveHistory);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); 

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      search(debouncedQuery, limit);
    }
  }, [debouncedQuery, search, limit]);

  useEffect(() => {
    setLimit(10);
  }, [debouncedQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery("");
    setDebouncedQuery("");
    setLimit(10);
  };

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      setLimit(10);
      search(query, 10);
    }
  }, [query, search]);

  const handleLoadMore = () => {
    const newLimit = limit + 10;
    setLimit(newLimit);
    if (debouncedQuery.trim()) {
      search(debouncedQuery, newLimit);
    }
  };

  const handleNavigate = async(id : string) =>{
    router.push(`/pages/Questions/${id}`);
    await saveHistory(id);
  }

  const safeSearchResult = Array.isArray(searchResult) ? searchResult : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg mb-6">
            <SearchIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Search Questions
          </h1>
          <p className="text-lg text-slate-800 max-w-2xl mx-auto">
            Find coding challenges by language, company, or keywords
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  name="search"
                  value={query}
                  onChange={handleChange}
                  placeholder="Search by language, company, or keywords (e.g., 'React Google interview')..."
                  className="w-full px-4 py-4 text-black pl-12 border border-slate-300 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 placeholder-slate-400 text-lg"
                />
                <SearchIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                {query && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearchLoading || !query.trim()}
                className="px-6 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSearchLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <SearchIcon className="w-5 h-5" />
                )}
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {isSearchLoading && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-slate-600">Searching questions...</p>
              </div>
            )}

            {!isSearchLoading && safeSearchResult.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <SearchIcon className="w-6 h-6 text-primary" />
                    Search Results
                  </h2>
                  <span className="text-slate-800 text-sm">
                    {safeSearchResult.length} results found
                  </span>
                </div>
                
                <div className="space-y-4">
                  {safeSearchResult.map((result) => (
                    <div
                      key={result._id}
                      onClick={()=> handleNavigate((result._id) as string)}
                      className="bg-white rounded-2xl cursor-pointer shadow-lg border hover:bg-gradient-to-br from-gray-400 via-sky-200/20 to-sky-600/30 border-slate-200 p-6 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-800 text-lg mb-1">
                            {result.company || 'Unknown Company'} - {result.role || 'No role specified'}
                          </h3>
                          <p className="text-slate-600 text-sm">
                            {result.language || 'Unknown'} • {result.createdAt
                              ? new Date(result.createdAt).toLocaleDateString()
                              : "Unknown date"}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                          {result.language || 'Unknown'}
                        </span>
                      </div>
                      
                      <p className="text-slate-700 line-clamp-2 mb-3">
                        {result.question && result.question.length > 100 
                          ? result.question.substring(0, 100) + '...' 
                          : result.question}
                      </p>
                      
                      {result.solution && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          Solution included
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {safeSearchResult.length >= limit && (
                  <div className="text-center pt-4">
                    <button
                      onClick={handleLoadMore}
                      disabled={isSearchLoading}
                      className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-300 hover:border-slate-400 px-6 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
                    >
                      {isSearchLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          Load More Questions
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* No Results */}
            {!isSearchLoading && debouncedQuery && safeSearchResult.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchIcon className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No results found</h3>
                <p className="text-slate-500 mb-4">
                  No questions found for &quot;<span className="font-medium">{debouncedQuery}</span>&quot;
                </p>
                <p className="text-slate-400 text-sm">
                  Try different keywords or check your spelling
                </p>
              </div>
            )}
          </div>

          {/* History Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sticky top-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Search History
              </h3>
              <Suspense fallback={
                <div className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">Loading history...</p>
                </div>
              }>
                <History />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;