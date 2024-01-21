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
      <Card className="relative max-w-96 max-h-[250px] text-ellipsis">
        <CardHeader className="flex text-ellipsis">
          <div className="flex items-center justify-start text-zinc-500 gap-1 max-w-[90%] h-min">
            <User size={17} />
            <CardDescription className=" text-nowrap text-ellipsis overflow-hidden leading-none  uppercase">
              {user}
            </CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip >
              <TooltipTrigger>
                <p
                  className={`p-1 absolute top-3 right-3 gap-2 text-xs 
                        font-semibold rounded-full ${
                          status === "Agendado"
                            ? "bg-orange-200"
                            : "bg-green-200"
                        }  w-min flex 
                        items-center  justify-center`}
                >
                  <span
                    className={`rounded-full ${
                      status === "Agendado" ? "bg-orange-500" : "bg-green-500"
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
          <CardTitle className="font-bold text-zinc-800 mb-3">
            QUADRA: {qd}
          </CardTitle>
          <CardTitle className="font-bold text-zinc-800">LOTE: {lt}</CardTitle>
        </CardContent>
        <CardFooter className="flex flex-col justify-start items-start gap-2">
          <CardDescription className="font-semibold text-xs  px-2 rounded bg-zinc-200">
            {empresa}
          </CardDescription>
          <CardDescription className="flex items-center justify-center gap-2">
            <Calendar size={17} />
            {date}
          </CardDescription>
          <CardDescription className="flex items-center justify-center gap-2">
            <TimerIcon size={17} />
            {timer}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardItem;
