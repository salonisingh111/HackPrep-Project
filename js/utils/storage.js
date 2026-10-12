/**
 * Safe local storage utility with consistent { data, error } response shape.
 */
export const storage = {
  get(key) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) {
        return { data: null, error: null };
      }
      return { data: JSON.parse(raw), error: null };
    } catch (err) {
      return { data: null, error: "Failed to read from local storage." };
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return { data: true, error: null };
    } catch (err) {
      return { data: false, error: "Failed to save to local storage." };
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return { data: true, error: null };
    } catch (err) {
      return { data: false, error: "Failed to delete item from local storage." };
    }
  }
};
