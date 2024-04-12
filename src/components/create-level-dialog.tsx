import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export function CreateLevelDialog() {
  const [nivel, setNivel] = useState("");

  //  const handleSubmitLevel = async () => {
  //   const formLevelData = {
  //     nivel: nivel,
  //   };

  //   const response = await fetch("http://localhost:3333/api/niveis", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formLevelData),
  //   });

  //   if (response.ok) {
  //     console.log("Nível cadastrado com sucesso!");
  //     toast("Event has been created.");
  //     setShouldFetchLevels(true);
  //   } else {
  //     const errorData = await response.json();
  //     setError(errorData.message);
  //   }
  // };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo nível</DialogTitle>
        <DialogDescription>Criar novo nível</DialogDescription>
      </DialogHeader>

      <form className="space-y-8">
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="nivel">Nível</Label>
          <Input
            className="col-span-3"
            id="nivel"
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
          />
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
