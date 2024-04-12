import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function SearchDevelopers() {
  return (
    <form className="flex items-center gap-2">
      <Input
        name="name"
        placeholder="Nome do desenvolvedor"
        className="w-auto"
      />
      {/* <Input name="level" placeholder="Nível" className="w-auto" /> */}
      <Button type="submit" variant="secondary">
        <Search className="w-4 h-4 mr-2" />
        Filtrar
      </Button>
    </form>
  );
}
