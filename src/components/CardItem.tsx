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

const CardItem = ({
  user,
  qd,
  lt,
  date,
  timer,
  demarcador,
  status,
}: any): JSX.Element => {
  return (
    <div>
      <Card className="relative">
        <CardHeader className="flex ">
          <CardDescription className="flex items-center justify-start gap-1 leading-none">
            <User size={17} /> {user}
          </CardDescription>
          <p
            className={`p-1 absolute top-3 right-3 gap-2 text-xs 
                        font-semibold rounded-full ${
                          status === "Agendado"
                            ? "bg-orange-200"
                            : "bg-green-200"
                        }  w-min flex 
                        items-center  justify-center`}
          >
            <div
              className={`rounded-full ${
                status === "Agendado" ? "bg-orange-500" : "bg-green-500"
              }  w-3 h-3`}
            />
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <CardTitle>Quadra: {qd}</CardTitle>
          <CardTitle>Lote: {lt}</CardTitle>
        </CardContent>
        <CardFooter className="flex flex-col justify-start items-start">
          <CardDescription className="flex items-center justify-center gap-2">
            <Calendar size={17} />
            {date}
          </CardDescription>
          <CardDescription className="flex items-center justify-center gap-2">
            <TimerIcon size={17} />
            {timer}
          </CardDescription>
          <CardDescription>Demarcador: {demarcador}</CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardItem;
