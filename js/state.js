import { storage } from "./utils/storage.js";
import { INITIAL_BLUEPRINTS } from "./data/blueprints.js";

const AUTH_STORAGE_KEY = "hackprep_user_session";
const BLUEPRINTS_STORAGE_KEY = "hackprep_saved_blueprints";

const storedAuth = storage.get(AUTH_STORAGE_KEY).data;
const storedBlueprints = storage.get(BLUEPRINTS_STORAGE_KEY).data;

export const state = {
  currentUser: storedAuth ? storedAuth.user : null,
  isAuthenticated: storedAuth ? Boolean(storedAuth.isAuthenticated) : false,
  blueprints: Array.isArray(storedBlueprints) ? storedBlueprints : [...INITIAL_BLUEPRINTS],
  listeners: [],

  subscribe(listener) {
    if (typeof listener === "function") {
      this.listeners.push(listener);
    }
  },

  notify() {
    this.listeners.forEach(fn => fn(this));
  },

  login(username) {
    if (!username || typeof username !== "string" || username.trim().length === 0) {
      return { data: null, error: "Username cannot be empty." };
    }
    const user = { username: username.trim(), joinedAt: new Date().toISOString() };
    this.currentUser = user;
    this.isAuthenticated = true;
    storage.set(AUTH_STORAGE_KEY, { user, isAuthenticated: true });
    this.notify();
    return { data: user, error: null };
  },

  logout() {
    this.currentUser = null;
    this.isAuthenticated = false;
    storage.remove(AUTH_STORAGE_KEY);
    this.notify();
    return { data: true, error: null };
  },

  addBlueprint(blueprint) {
    if (!blueprint || !blueprint.id) {
      return { data: null, error: "Invalid blueprint data." };
    }
    this.blueprints.unshift(blueprint);
    storage.set(BLUEPRINTS_STORAGE_KEY, this.blueprints);
    this.notify();
    return { data: blueprint, error: null };
  }
};
