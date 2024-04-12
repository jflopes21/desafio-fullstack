import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

interface Level {
  id: string;
  nivel: string;
}

export function EditLevelDialog() {
  const [levels, setLevels] = useState<Level[]>([]);

  //   useEffect(() => {
  //     if (shouldFetchLevels) {
  //       const url = new URL("http://localhost:3333/api/niveis");
  //       fetch(url)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           setLevels(data);
  //           setShouldFetchLevels(false);
  //         });
  //     }
  //   }, [shouldFetchLevels]);

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
        <DialogTitle>Editar/Excluir nível</DialogTitle>
        <DialogDescription>
          Edite ou exclua um nível existente
        </DialogDescription>
      </DialogHeader>
      <form className="space-y-8">
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="nivel">Nível</Label>
          <Select>
            <SelectTrigger className="col-span-2">
              <SelectValue placeholder="Selecione o nível" />
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
          <Label htmlFor="nivel">Novo valor</Label>
          <Input className="col-span-2" id="nivel" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Excluir
            </Button>
          </DialogClose>
          <DialogClose>
            <Button type="submit">Editar</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
