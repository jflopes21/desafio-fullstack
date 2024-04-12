import { ThemeProvider } from "@/components/theme-provider";
import { PlusCircle, Plus, X, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Button } from "./components/ui/button";
import { Dialog, DialogTrigger } from "./components/ui/dialog";
import { ModeToggle } from "./components/mode-toggle";
import { useEffect, useState } from "react";
import { EditLevelDialog } from "./components/edit-level-dialog";
import { CreateLevelDialog } from "./components/create-level-dialog";
import { SearchDevelopers } from "./components/search-developers";
import { CreateDeveloperDialog } from "./components/create-developer-dialog";
import { EditDeveloper } from "./components/edit-developer-dialog";

interface Developer {
  id: string;
  nome: string;
  nivel: string;
  datanascimento: string;
  idade: number;
  sexo: string;
  hobby: string;
}

export function App() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [shouldFetchDevelopers, setShouldFetchDevelopers] = useState(true);

  useEffect(() => {
    if (shouldFetchDevelopers) {
      const url = new URL("http://localhost:3333/api/desenvolvedores");
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setDevelopers(
            data.map((developer: Developer) => ({
              ...developer,
              idade: calculateAge(developer.datanascimento),
            }))
          );
          setShouldFetchDevelopers(false);
        });
    }
  }, [shouldFetchDevelopers]);

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="p-6 max-w-6xl mx-auto space-y-4">
        <div className="flex justify-end">
          <ModeToggle />
        </div>
        <h1 className="text-3xl font-bold">Desenvolvedores</h1>
        <div className="flex items-center justify-between">
          <SearchDevelopers />
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Pencil className="w-4 h-4 mr-2" />
                  Alterar Nível
                </Button>
              </DialogTrigger>
              <EditLevelDialog />
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Cadastrar Nível
                </Button>
              </DialogTrigger>
              <CreateLevelDialog />
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Cadastrar Desenvolvedor
                </Button>
              </DialogTrigger>
              <CreateDeveloperDialog />
            </Dialog>
          </div>
        </div>
        <div className="border rounded-lg p-2">
          <Table>
            <TableHeader>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Nível</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Sexo</TableHead>
              <TableHead>Hobby</TableHead>
              <TableHead></TableHead>
            </TableHeader>
            <TableBody>
              {developers.map((developer) => {
                return (
                  <Dialog>
                    <DialogTrigger asChild>
                      <TableRow
                        key={developer.id}
                        className="hover:cursor-pointer"
                      >
                        <TableCell>{developer.id}</TableCell>
                        <TableCell>{developer.nome}</TableCell>
                        <TableCell>{developer.nivel}</TableCell>
                        <TableCell>{developer.idade}</TableCell>
                        <TableCell>{developer.sexo}</TableCell>
                        <TableCell>{developer.hobby}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            className="hover:bg-transparent"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </DialogTrigger>
                    <EditDeveloper developer={developer} />
                  </Dialog>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </ThemeProvider>
  );
}
