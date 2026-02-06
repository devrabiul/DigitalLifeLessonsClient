export const getLessonId = (lesson) => {
  return lesson?._id || lesson?.id;
};

export const EMPTY_ARRAY = [];
