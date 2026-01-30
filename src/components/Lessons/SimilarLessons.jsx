import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import LessonCard from "./LessonCard.jsx";

function normalizeLessons(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.lessons)) return data.lessons;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

function uniqById(items) {
  const seen = new Set();
  const out = [];

  for (const item of items) {
    const id = item?._id || item?.id;
    if (!id || seen.has(String(id))) continue;
    seen.add(String(id));
    out.push(item);
  }

  return out;
}

export default function SimilarLessons({
  currentLessonId,
  category,
  emotionalTone,
}) {
  const {
    data: similarByCategoryRaw,
    isLoading: loadingCategory,
  } = useQuery({
    queryKey: ["similar-category", category, currentLessonId],
    enabled: Boolean(category),
    queryFn: async () => {
      const res = await api.get("/lessons", {
        params: {
          category,
          exclude: currentLessonId,
          limit: 6,
        },
      });
      return res.data;
    },
    retry: 1,
  });

  const {
    data: similarByToneRaw,
    isLoading: loadingTone,
  } = useQuery({
    queryKey: ["similar-tone", emotionalTone, currentLessonId],
    enabled: Boolean(emotionalTone),
    queryFn: async () => {
      const res = await api.get("/lessons", {
        params: {
          emotionalTone,
          exclude: currentLessonId,
          limit: 6,
        },
      });
      return res.data;
    },
    retry: 1,
  });

  const combined = useMemo(() => {
    const byCategory = normalizeLessons(similarByCategoryRaw);
    const byTone = normalizeLessons(similarByToneRaw);
    return uniqById([...byCategory, ...byTone]).slice(0, 6);
  }, [similarByCategoryRaw, similarByToneRaw]);

  if (!loadingCategory && !loadingTone && combined.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h3 className="text-2xl font-bold">You might also like</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {combined.map((lesson) => {
          const id = lesson?._id || lesson?.id;
          return <LessonCard key={id} lesson={lesson} />;
        })}
      </div>
    </div>
  );
}
