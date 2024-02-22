import { Calendar, TimerIcon, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AgendaItem } from "@/app/ag";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CardItem = ({
  user,
  qd,
  lt,
  date,
  timer,
  demarcador,
  status,
  empresa,
}: any): JSX.Element => {
  return (
    <div>
      <Card className="relative max-w-96 max-h-[250px] text-ellipsis shadow-md dark:bg-zinc-900">
        <CardHeader className="flex text-ellipsis">
          <div className="flex items-center justify-start text-zinc-500 gap-1 max-w-[90%] h-min">
            <User size={17} />
            <CardDescription className=" text-nowrap text-ellipsis overflow-hidden leading-none  uppercase">
              {user}
            </CardDescription>
          </div>
          <TooltipProvider delayDuration={100}>
            <Tooltip >
              <TooltipTrigger >
                <p
                  className={`p-1 absolute top-3 right-3 gap-2 text-xs 
                        font-semibold rounded-full ${
                          status === "Agendado"
                            ? "bg-orange-200 dark:bg-amber-500"
                            : "bg-green-200 dark:bg-emerald-500"
                        }  w-min flex 
                        items-center  justify-center`}
                >
                  <span
                    className={`rounded-full ${
                      status === "Agendado" ? "bg-amber-500 dark:bg-orange-200" : "bg-green-500 dark:bg-emerald-200"
                    }  w-3 h-3`}
                  />
                </p>
              </TooltipTrigger>
              <TooltipContent align="end" side="top">
                <p>{status == "Agendado" ? "Agendado" : "Demarcado"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CardTitle className="font-bold text-foreground mb-3">
            QUADRA: {qd}
          </CardTitle>
          <CardTitle className="font-bold text-foreground">LOTE: {lt}</CardTitle>
        </CardContent>
        <CardFooter className="flex  justify-between items-end gap-2">
          <div className="flex flex-col justify-start items-start gap-2">

          <CardDescription className="flex items-center justify-center gap-2">
            <Calendar size={17} />
            {date}
          </CardDescription>
          <CardDescription className="flex items-center justify-center gap-2">
            <TimerIcon size={19} />
            {timer}
          </CardDescription>
          </div>
          <CardDescription className="font-semibold text-xs  px-2 rounded bg-zinc-200 dark:bg-zinc-800">
            {empresa}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardItem;
