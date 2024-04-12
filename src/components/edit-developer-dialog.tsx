import {
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

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

interface EditDeveloperProps {
  developer: Developer;
}

export function EditDeveloper({ developer }: EditDeveloperProps) {
  const [levels, setLevels] = useState<Level[]>([]);

  useEffect(() => {
    const url = new URL("http://localhost:3333/api/niveis");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLevels(data);
      });
  }, []);
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar desenvolvedor</DialogTitle>
        <DialogDescription>Edite as informações desejadas</DialogDescription>
      </DialogHeader>

      <form className="space-y-8" action="">
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="id">ID</Label>
          <Input className="col-span-3" id="id" value={developer.id} disabled />
        </div>
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="nome">Nome</Label>
          <Input className="col-span-3" id="nome" />
        </div>
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="level">Nível</Label>
          <Select>
            <SelectTrigger className="col-span-2">
              <SelectValue placeholder={developer.nivel} />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => {
                return (
                  <SelectItem key={level.id} value={level.nivel}>
                    {level.nivel}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label className="" htmlFor="dateOfBirth">
            Nascimento
          </Label>
          <Input className="col-span-2" id="dateOfBirth" />
        </div>
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label>Sexo</Label>
          <Select>
            <SelectTrigger className="col-span-2">
              <SelectValue
                placeholder={developer.sexo === "F" ? "Feminino" : "Masculino"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Masculino</SelectItem>
              <SelectItem value="F">Feminino</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="hobby">Hobby</Label>
          <Input className="col-span-3" id="hobby" />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Salvar</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
