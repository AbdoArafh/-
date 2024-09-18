import { createMemo, createSignal, type Component } from "solid-js";
import { Button } from "./components/ui/button";
import { TextField, TextFieldRoot } from "./components/ui/textfield";
import { generateCombinations } from "./libs/general";
import { Rawi } from "./libs/types";
import { Icons } from "./components/icons";

const App: Component = () => {
  const [rawiName, setRawiName] = createSignal("");

  const [list, setList] = createSignal<Rawi[]>([]);

  const handleAddRawi = (event: Event) => {
    event.preventDefault();

    if (!rawiName()) return;

    setList([...list(), { name: rawiName() }]);

    setRawiName("");
  };

  const combinations = createMemo(() => generateCombinations(list()));

  return (
    <div
      class="container w-full max-w-md mx-auto p-4 flex flex-col gap-4"
      dir="rtl"
    >
      <form class="flex items-center gap-2" onsubmit={handleAddRawi}>
        <TextFieldRoot class="w-full">
          <TextField
            placeholder="الراوي"
            value={rawiName()}
            onchange={(event) => setRawiName(event.target.value)}
          />
        </TextFieldRoot>
        <Button type="submit">أضف</Button>
      </form>
      <ul class="flex flex-col gap-2">
        {list().map((item, index) => (
          <li class="flex items-center justify-between p-2 rounded-lg shadow border border-input">
            <span>{item.name}</span>
            <div class="flex gap-2">
              <Button
                size="icon"
                onClick={() =>
                  setList(
                    list().map((item, i) =>
                      i === index ? { ...item, alone: !item.alone } : item
                    )
                  )
                }
              >
                {item.alone ? <Icons.Person /> : <Icons.Group />}
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => setList(list().filter((_, i) => i !== index))}
              >
                <Icons.Trash />
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {list().length > 1 && (
        <>
          <hr />
          <ul class="flex flex-col gap-2">
            {combinations().map(([one, two]) => (
              <li class="flex items-center justify-between p-2 rounded-lg shadow border border-input">
                <span>{one}</span>
                <span>{two}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
