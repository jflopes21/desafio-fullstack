import { ThemeProvider } from "@/components/theme-provider";
import { PlusCircle, Plus, Pencil } from "lucide-react";
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

interface Level {
  id: string;
  nivel: string;
}

export function App() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [tableState, setTableState] = useState<boolean>(true);
  useEffect(() => {
    if (tableState) {
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
          setTableState(false);
        });
    }
  }, [tableState]);

  const [levels, setLevels] = useState<Level[]>([]);
  const [shouldFetchLevels, setShouldFetchLevels] = useState(true);
    useEffect(() => {
      if (shouldFetchLevels) {
        const url = new URL("http://localhost:3333/api/niveis");
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setLevels(data);
            setShouldFetchLevels(false);
          });
      }
    }, [shouldFetchLevels]);

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
          {/* <SearchDevelopers /> */}
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Pencil className="w-4 h-4 mr-2" />
                  Alterar Nível
                </Button>
              </DialogTrigger>
              <EditLevelDialog setState={setTableState} setLevelState={setShouldFetchLevels} levels={levels} />
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Cadastrar Nível
                </Button>
              </DialogTrigger>
              <CreateLevelDialog  setLevelState={setShouldFetchLevels} />
            </Dialog>
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Cadastrar Desenvolvedor
                </Button>
              </DialogTrigger>
              <CreateDeveloperDialog setState={setTableState} setLevelState={setShouldFetchLevels} levels={levels} />
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
                      </TableRow>
                    </DialogTrigger>
                    <EditDeveloper developer={developer} setState={setTableState} setLevelState={setShouldFetchLevels} levels={levels} />
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
