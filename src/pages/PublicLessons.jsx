import { useEffect, useMemo, useState } from "react";
import FilterSortBar from "../components/Lessons/FilterSortBar.jsx";
import LessonCard from "../components/Lessons/LessonCard.jsx";
import LoadingSpinner from "../components/UI/LoadingSpinner.jsx";
import { useLessons } from "../hooks/useLessonsQuery";

const EMPTY_ARRAY = [];

function getLessonId(lesson) {
    return lesson?._id || lesson?.id;
}

export default function PublicLessons() {
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);
    const limit = 12;

    const params = useMemo(
        () => ({
            ...filters,
            sort,
            page,
            limit,
        }),
        [filters, sort, page]
    );

    const { data, isLoading, isError, error } = useLessons(params);

    const lessons = useMemo(() => {
        if (Array.isArray(data?.lessons)) return data.lessons;
        if (Array.isArray(data?.data)) return data.data;
        return Array.isArray(data) ? data : EMPTY_ARRAY;
    }, [data]);

    const totalPages = data?.totalPages || 1;
    const hasMore = page < totalPages;

    useEffect(() => {
        if (page === 1) {
            setItems(lessons);
        } else {
             setItems(prev => {
                const newItems = [...prev];
                const seen = new Set(newItems.map(l => getLessonId(l)));
                for (const l of lessons) {
                    const id = getLessonId(l);
                    if (!seen.has(id)) {
                        newItems.push(l);
                        seen.add(id);
                    }
                }
                return newItems;
             });
        }
    }, [lessons, page]); // lessons reference must be stable from useMemo

    const handleFilter = (type, value) => {
        setFilters((prev) => {
             // If value is exactly the same, do nothing to avoid re-render
             if (prev[type] === value) return prev;
             // If trying to clear already empty/undefined value, do nothing
             if (!value && !prev[type]) return prev;
             
             return ({ ...prev, [type]: value || undefined });
        });
        setPage(1);
    };

    const handleSort = (value) => {
         setSort(prev => {
             if (prev === value) return prev;
             return value;
         });
         setPage(1);
    };

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    if (isLoading && page === 1) return <LoadingSpinner />;
    if (isError) {
        const isNetworkError =
            error?.code === "ERR_NETWORK" ||
            error?.message?.includes("ERR_CONNECTION_REFUSED") ||
            error?.message?.includes("Network Error");

        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {isNetworkError ? "Backend server is not running" : "Error loading lessons"}
                </h2>
                <p className="text-gray-600">
                    {isNetworkError
                        ? "Start your backend (http://localhost:5000) or set VITE_API_URL in .env.local."
                        : "Please try again."}
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Public Lessons</h1>
                    <p className="text-gray-600 mt-1">
                        Search, filter, and discover life lessons from the community.
                    </p>
                </div>
            </div>

            <FilterSortBar
                onFilter={handleFilter}
                onSort={handleSort}
                onSearch={(term) => handleFilter("search", term)}
            />

            {items.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">No lessons found</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {items.map((lesson) => (
                            <LessonCard key={getLessonId(lesson) || JSON.stringify(lesson)} lesson={lesson} />
                        ))}
                    </div>

                    {hasMore ? (
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={handleLoadMore}
                                disabled={isLoading}
                                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Loading..." : "Load More"}
                            </button>
                        </div>
                    ) : null}
                </>
            )}
        </div>
    );
}