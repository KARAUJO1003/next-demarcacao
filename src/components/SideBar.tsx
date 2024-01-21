import { CalendarDemo } from "./Calendar-Date";
import { ModeToggle } from "./ModeToggle";


const SideBar= (): JSX.Element => {
  return (
    <div className="prose dark:prose-invert border-r w-[300px] py-10 px-5 flex flex-col justify-between  h-screen fixed">
      <h2>Agenda de demarcações</h2>
      <div className="flex items-center justify-center">
        <ModeToggle />
      </div>
    </div>
  );
}

export default SideBar;