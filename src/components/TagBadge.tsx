import React from "react";
import { Badge } from "./ui/badge";
import { CheckCircle, MinusCircle } from "lucide-react";

interface TagBadgeProps {
  filtertag: string | null,
  nometag: string | null
}

export function TagBadge({filtertag, nometag}:TagBadgeProps) {
  return (
    <div>
      <Badge variant={"outline"} className={`${filtertag === 'Agendado' ? ' dark:bg-orange-950/60 dark:text-amber-500 ' :'dark:bg-green-950/60 dark:text-emerald-500'  }`}>
        {filtertag === "Agendado" ? (
          <MinusCircle className="mr-2 text-amber-600" size={11} />
        ) : (
          <CheckCircle className="mr-2 text-emerald-600" size={11} />
        )}{" "}
        {nometag}
      </Badge>
    </div>
  );
}
