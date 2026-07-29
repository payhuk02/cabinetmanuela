// vite.config.ts
import { defineConfig } from "file:///C:/Site%20cabinet%20Emanuela/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Site%20cabinet%20Emanuela/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Site%20cabinet%20Emanuela/node_modules/lovable-tagger/dist/index.js";
import { imagetools } from "file:///C:/Site%20cabinet%20Emanuela/node_modules/vite-imagetools/dist/index.js";
import { tanstackRouter } from "file:///C:/Site%20cabinet%20Emanuela/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
var __vite_injected_original_dirname = "C:\\Site cabinet Emanuela";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false }
  },
  plugins: [
    // TanStack Router file-based routing (must run before react)
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts"
    }),
    react(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.has("responsive")) {
          return new URLSearchParams({
            format: "avif;webp;jpg",
            w: "640;960;1280;1600;1920;2560",
            quality: "82",
            as: "picture"
          });
        }
        return new URLSearchParams();
      }
    }),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      // Compatibility shim: every existing page/component imports from
      // "react-router-dom"; we redirect to a thin wrapper around TanStack Router
      // so we don't have to rewrite 20+ files.
      "react-router-dom": path.resolve(__vite_injected_original_dirname, "./src/shims/react-router-dom.tsx"),
      react: path.resolve(__vite_injected_original_dirname, "./node_modules/react"),
      "react-dom": path.resolve(__vite_injected_original_dirname, "./node_modules/react-dom")
    },
    dedupe: ["react", "react-dom"]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("/recharts/") || id.includes("/d3-")) return "charts";
          if (id.includes("/@tiptap/") || id.includes("/prosemirror-")) return "editor";
          if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/scheduler/") || id.includes("/@tanstack/react-router") || id.includes("/@tanstack/router-")) {
            return "react-vendor";
          }
          if (id.includes("/@supabase/")) return "supabase";
          if (id.includes("/@tanstack/react-query")) return "query";
          if (id.includes("/@radix-ui/")) return "radix";
          if (id.includes("/react-hook-form") || id.includes("/@hookform/") || id.includes("/zod/")) {
            return "forms";
          }
          if (id.includes("/date-fns/")) return "date";
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxTaXRlIGNhYmluZXQgRW1hbnVlbGFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFNpdGUgY2FiaW5ldCBFbWFudWVsYVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovU2l0ZSUyMGNhYmluZXQlMjBFbWFudWVsYS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGNvbXBvbmVudFRhZ2dlciB9IGZyb20gXCJsb3ZhYmxlLXRhZ2dlclwiO1xuaW1wb3J0IHsgaW1hZ2V0b29scyB9IGZyb20gXCJ2aXRlLWltYWdldG9vbHNcIjtcbmltcG9ydCB7IHRhbnN0YWNrUm91dGVyIH0gZnJvbSBcIkB0YW5zdGFjay9yb3V0ZXItcGx1Z2luL3ZpdGVcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIixcbiAgICBwb3J0OiA4MDgwLFxuICAgIGhtcjogeyBvdmVybGF5OiBmYWxzZSB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgLy8gVGFuU3RhY2sgUm91dGVyIGZpbGUtYmFzZWQgcm91dGluZyAobXVzdCBydW4gYmVmb3JlIHJlYWN0KVxuICAgIHRhbnN0YWNrUm91dGVyKHtcbiAgICAgIHRhcmdldDogXCJyZWFjdFwiLFxuICAgICAgYXV0b0NvZGVTcGxpdHRpbmc6IHRydWUsXG4gICAgICByb3V0ZXNEaXJlY3Rvcnk6IFwiLi9zcmMvcm91dGVzXCIsXG4gICAgICBnZW5lcmF0ZWRSb3V0ZVRyZWU6IFwiLi9zcmMvcm91dGVUcmVlLmdlbi50c1wiLFxuICAgIH0pLFxuICAgIHJlYWN0KCksXG4gICAgaW1hZ2V0b29scyh7XG4gICAgICBkZWZhdWx0RGlyZWN0aXZlczogKHVybCkgPT4ge1xuICAgICAgICBpZiAodXJsLnNlYXJjaFBhcmFtcy5oYXMoXCJyZXNwb25zaXZlXCIpKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgICAgICAgZm9ybWF0OiBcImF2aWY7d2VicDtqcGdcIixcbiAgICAgICAgICAgIHc6IFwiNjQwOzk2MDsxMjgwOzE2MDA7MTkyMDsyNTYwXCIsXG4gICAgICAgICAgICBxdWFsaXR5OiBcIjgyXCIsXG4gICAgICAgICAgICBhczogXCJwaWN0dXJlXCIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICAgIH0sXG4gICAgfSksXG4gICAgbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiICYmIGNvbXBvbmVudFRhZ2dlcigpLFxuICBdLmZpbHRlcihCb29sZWFuKSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICAgIC8vIENvbXBhdGliaWxpdHkgc2hpbTogZXZlcnkgZXhpc3RpbmcgcGFnZS9jb21wb25lbnQgaW1wb3J0cyBmcm9tXG4gICAgICAvLyBcInJlYWN0LXJvdXRlci1kb21cIjsgd2UgcmVkaXJlY3QgdG8gYSB0aGluIHdyYXBwZXIgYXJvdW5kIFRhblN0YWNrIFJvdXRlclxuICAgICAgLy8gc28gd2UgZG9uJ3QgaGF2ZSB0byByZXdyaXRlIDIwKyBmaWxlcy5cbiAgICAgIFwicmVhY3Qtcm91dGVyLWRvbVwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3NoaW1zL3JlYWN0LXJvdXRlci1kb20udHN4XCIpLFxuICAgICAgcmVhY3Q6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9ub2RlX21vZHVsZXMvcmVhY3RcIiksXG4gICAgICBcInJlYWN0LWRvbVwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbVwiKSxcbiAgICB9LFxuICAgIGRlZHVwZTogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xuICAgICAgICAgIGlmICghaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpIHJldHVybjtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCIvcmVjaGFydHMvXCIpIHx8IGlkLmluY2x1ZGVzKFwiL2QzLVwiKSkgcmV0dXJuIFwiY2hhcnRzXCI7XG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiL0B0aXB0YXAvXCIpIHx8IGlkLmluY2x1ZGVzKFwiL3Byb3NlbWlycm9yLVwiKSkgcmV0dXJuIFwiZWRpdG9yXCI7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgaWQuaW5jbHVkZXMoXCIvcmVhY3QvXCIpIHx8XG4gICAgICAgICAgICBpZC5pbmNsdWRlcyhcIi9yZWFjdC1kb20vXCIpIHx8XG4gICAgICAgICAgICBpZC5pbmNsdWRlcyhcIi9zY2hlZHVsZXIvXCIpIHx8XG4gICAgICAgICAgICBpZC5pbmNsdWRlcyhcIi9AdGFuc3RhY2svcmVhY3Qtcm91dGVyXCIpIHx8XG4gICAgICAgICAgICBpZC5pbmNsdWRlcyhcIi9AdGFuc3RhY2svcm91dGVyLVwiKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIFwicmVhY3QtdmVuZG9yXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIi9Ac3VwYWJhc2UvXCIpKSByZXR1cm4gXCJzdXBhYmFzZVwiO1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIi9AdGFuc3RhY2svcmVhY3QtcXVlcnlcIikpIHJldHVybiBcInF1ZXJ5XCI7XG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiL0ByYWRpeC11aS9cIikpIHJldHVybiBcInJhZGl4XCI7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgaWQuaW5jbHVkZXMoXCIvcmVhY3QtaG9vay1mb3JtXCIpIHx8XG4gICAgICAgICAgICBpZC5pbmNsdWRlcyhcIi9AaG9va2Zvcm0vXCIpIHx8XG4gICAgICAgICAgICBpZC5pbmNsdWRlcyhcIi96b2QvXCIpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJmb3Jtc1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCIvZGF0ZS1mbnMvXCIpKSByZXR1cm4gXCJkYXRlXCI7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA2MDAsXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtRLFNBQVMsb0JBQW9CO0FBQy9SLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyxzQkFBc0I7QUFML0IsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixLQUFLLEVBQUUsU0FBUyxNQUFNO0FBQUEsRUFDeEI7QUFBQSxFQUNBLFNBQVM7QUFBQTtBQUFBLElBRVAsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLE1BQ1IsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIsb0JBQW9CO0FBQUEsSUFDdEIsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLElBQ04sV0FBVztBQUFBLE1BQ1QsbUJBQW1CLENBQUMsUUFBUTtBQUMxQixZQUFJLElBQUksYUFBYSxJQUFJLFlBQVksR0FBRztBQUN0QyxpQkFBTyxJQUFJLGdCQUFnQjtBQUFBLFlBQ3pCLFFBQVE7QUFBQSxZQUNSLEdBQUc7QUFBQSxZQUNILFNBQVM7QUFBQSxZQUNULElBQUk7QUFBQSxVQUNOLENBQUM7QUFBQSxRQUNIO0FBQ0EsZUFBTyxJQUFJLGdCQUFnQjtBQUFBLE1BQzdCO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxTQUFTLGlCQUFpQixnQkFBZ0I7QUFBQSxFQUM1QyxFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUlwQyxvQkFBb0IsS0FBSyxRQUFRLGtDQUFXLGtDQUFrQztBQUFBLE1BQzlFLE9BQU8sS0FBSyxRQUFRLGtDQUFXLHNCQUFzQjtBQUFBLE1BQ3JELGFBQWEsS0FBSyxRQUFRLGtDQUFXLDBCQUEwQjtBQUFBLElBQ2pFO0FBQUEsSUFDQSxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQUEsRUFDL0I7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGFBQWEsSUFBSTtBQUNmLGNBQUksQ0FBQyxHQUFHLFNBQVMsY0FBYyxFQUFHO0FBQ2xDLGNBQUksR0FBRyxTQUFTLFlBQVksS0FBSyxHQUFHLFNBQVMsTUFBTSxFQUFHLFFBQU87QUFDN0QsY0FBSSxHQUFHLFNBQVMsV0FBVyxLQUFLLEdBQUcsU0FBUyxlQUFlLEVBQUcsUUFBTztBQUNyRSxjQUNFLEdBQUcsU0FBUyxTQUFTLEtBQ3JCLEdBQUcsU0FBUyxhQUFhLEtBQ3pCLEdBQUcsU0FBUyxhQUFhLEtBQ3pCLEdBQUcsU0FBUyx5QkFBeUIsS0FDckMsR0FBRyxTQUFTLG9CQUFvQixHQUNoQztBQUNBLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGNBQUksR0FBRyxTQUFTLGFBQWEsRUFBRyxRQUFPO0FBQ3ZDLGNBQUksR0FBRyxTQUFTLHdCQUF3QixFQUFHLFFBQU87QUFDbEQsY0FBSSxHQUFHLFNBQVMsYUFBYSxFQUFHLFFBQU87QUFDdkMsY0FDRSxHQUFHLFNBQVMsa0JBQWtCLEtBQzlCLEdBQUcsU0FBUyxhQUFhLEtBQ3pCLEdBQUcsU0FBUyxPQUFPLEdBQ25CO0FBQ0EsbUJBQU87QUFBQSxVQUNUO0FBQ0EsY0FBSSxHQUFHLFNBQVMsWUFBWSxFQUFHLFFBQU87QUFBQSxRQUN4QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxFQUN6QjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
