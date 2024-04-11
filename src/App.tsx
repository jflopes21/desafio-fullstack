import { ThemeProvider } from "@/components/theme-provider"

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1>Hello world!</h1>
    </ThemeProvider>
  );
}

