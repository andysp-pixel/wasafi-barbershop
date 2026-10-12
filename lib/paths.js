// GitHub Pages may host this project below /repository-name.
// The Pages workflow supplies this value at build time; root-domain hosts use an empty path.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
export function sitePath(path) {
  return `${basePath}${path}`;
}
